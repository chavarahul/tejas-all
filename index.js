import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'path';
import clipboardy from 'clipboardy';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileOperations } from './fileOperations.js';
import screenshot from 'screenshot-desktop';
import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import { desktopCapturer } from 'electron';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let mainWindow;

const API_KEY = 'AIzaSyDuswSRCgK839QnCc7lV_fFL-H_mfeoTd0';
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const appServer = express();
const PORT = 5000;

appServer.use(express.json());

appServer.post('/generate', async (req, res) => {
  const { input } = req.body;
  if (!input) {
    return res.status(400).json({ error: 'Input text is required' });
  }

  try {
    const result = await model.generateContent(input);
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate response from Gemini AI' });
  }
});

appServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

function createWindow() {
  const primaryDisplay = screen.getPrimaryDisplay();
  const { width, height } = primaryDisplay.workAreaSize;

  mainWindow = new BrowserWindow({
    width: 600,
    height: (height + 220) / 2,
    x: width - 800,
    y: height / 2,
    frame: true,
    alwaysOnTop: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
  });

  ipcMain.handle('send-to-gemini', async (event, userInput) => {
    try {
      const response = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userInput }),
      });

      if (response.ok) {
        const result = await response.json();
        return result.response || "No response received.";
      } else {
        return 'Sorry, an error occurred while fetching the response.';
      }
    } catch (error) {
      console.error('Error fetching response from the server:', error);
      return 'Sorry, an error occurred while processing your request.';
    }
  });

  mainWindow.loadFile('index.html');
  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function monitorClipboard() {
  let lastText = '';

  setInterval(() => {
    const currentText = clipboardy.readSync();
    if (currentText !== lastText) {
      lastText = currentText;
      if (mainWindow) {
        mainWindow.webContents.send('clipboard-text', currentText);
      }
    }
  }, 2000);
}

app.whenReady().then(() => {
  createWindow();
  monitorClipboard();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle('execute-command', async (event, command) => {
  try {
      const result = await fileOperations.processCommand(command);
      return result;
  } catch (error) {
      console.error('Command execution error:', error);
      return {
          success: false,
          message: `Error executing command: ${error.message}`
      };
  }
});

ipcMain.handle('start-voice-recognition', async () => {
  return { success: true };
});


async function captureScreen() {
  try {
    const sources = await desktopCapturer.getSources({
      types: ['screen'],
      thumbnailSize: { width: 1920, height: 1080 }
    });
    
    const mainScreen = sources[0];
    const imageData = mainScreen.thumbnail.toDataURL();
    
    return {
      image: imageData,
      screenName: mainScreen.name,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error capturing screen:', error);
    throw error;
  }
}

async function processScreenContent(imagePath) {
  try {
    const { data: { text } } = await Tesseract.recognize(imagePath);
    
    const metadata = await sharp(imagePath).metadata();
    
    return {
      text,
      imageMetadata: metadata
    };
  } catch (error) {
    console.error('Error processing screen content:', error);
    throw error;
  }
}


ipcMain.handle('start-screen-monitor', async () => {
  try {
    const imagePath = await captureScreen();
    const screenContent = await processScreenContent(imagePath);
    return {
      success: true,
      data: screenContent
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});


let monitoringInterval = null;

ipcMain.handle('toggle-screen-monitor', async (event, shouldStart) => {
  try {
    if (shouldStart) {
      const screenData = await captureScreen();
      return {
        success: true,
        isActive: true,
        data: screenData
      };
    } else {
      if (monitoringInterval) {
        clearInterval(monitoringInterval);
        monitoringInterval = null;
      }
      return {
        success: true,
        isActive: false
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
});

ipcMain.handle('analyze-screen', async (event, question) => {
  try {
    const screenData = await captureScreen();
    
    if (!screenData.success) {
      throw new Error('Failed to capture screen');
    }

    const prompt = `Analyzing screen content from ${screenData.data.screenName} captured at ${screenData.data.timestamp}.
    Extracted text content: ${screenData.data.text}
    
    User question: "${question}"
    
    Please analyze the content and provide a detailed response.`;

    const result = await model.generateContent(prompt);
    const response = result.response.text();
    
    return {
      success: true,
      response: response
    };
  } catch (error) {
    console.error('Screen analysis error:', error);
    return {
      success: false,
      error: error.message
    };
  }
});