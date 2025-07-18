import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'path';
import clipboardy from 'clipboardy';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileOperations } from './fileOperations.js';
import Tesseract from 'tesseract.js';
import sharp from 'sharp';
import { desktopCapturer } from 'electron';
import os from 'os';
import fs from 'fs/promises';

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

async function processScreenContent(imageDataUrl) {
  const tempDir = os.tmpdir();
  const tempImagePath = path.join(tempDir, `screen-${Date.now()}.png`);
  
  try {
      const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, '');
      const imageBuffer = Buffer.from(base64Data, 'base64');

      await sharp(imageBuffer)
          .png()
          .toFile(tempImagePath);

      const { data: { text } } = await Tesseract.recognize(
          tempImagePath,
          'eng',
          {
              logger: m => console.log(m) 
          }
      );

      const metadata = await sharp(tempImagePath).metadata();

      await fs.unlink(tempImagePath);
      
      return {
          text,
          imageMetadata: metadata
      };
  } catch (error) {
      try {
          await fs.unlink(tempImagePath);
      } catch (cleanupError) {
          console.error('Failed to clean up temporary file:', cleanupError);
      }
      
      console.error('Error processing screen content:', error);
      throw error;
  }
}

async function captureScreen() {
  try {
      const sources = await desktopCapturer.getSources({
          types: ['screen'],
          thumbnailSize: {
              width: 1920,
              height: 1080
          }
      });

      if (!sources || sources.length === 0) {
          throw new Error('No screen sources found');
      }

      const mainScreen = sources[0];
      const imageDataUrl = mainScreen.thumbnail.toDataURL();

      return {
          success: true,
          data: {
              image: imageDataUrl,
              screenName: mainScreen.name,
              timestamp: new Date().toISOString()
          }
      };
  } catch (error) {
      console.error('Screen capture error:', error);
      return {
          success: false,
          error: `Screen capture failed: ${error.message}`
      };
  }
}

let monitoringInterval = null;

ipcMain.handle('toggle-screen-monitor', async (event, shouldStart) => {
  try {
      if (shouldStart) {
          if (monitoringInterval) {
              clearInterval(monitoringInterval);
          }

          const initialCapture = await captureScreen();
          if (!initialCapture.success) {
              throw new Error(initialCapture.error);
          }

          monitoringInterval = setInterval(async () => {
              try {
                  const newCapture = await captureScreen();
                  if (newCapture.success) {
                      event.sender.send('screen-update', newCapture.data);
                  }
              } catch (err) {
                  console.error('Interval capture error:', err);
              }
          }, 5000);

          return initialCapture;
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
      console.error('Toggle monitor error:', error);
      return {
          success: false,
          error: error.message
      };
  }
});

ipcMain.handle('analyze-screen', async (event, question) => {
  try {
      const capture = await captureScreen();
      if (!capture.success) {
          throw new Error(capture.error);
      }

      const screenContent = await processScreenContent(capture.data.image);


      
      return {
          success: true,
          response: `Extracted text from screen: ${screenContent.text}`,
          metadata: screenContent.imageMetadata
      };
  } catch (error) {
      console.error('Screen analysis error:', error);
      return {
          success: false,
          error: error.message
      };
  }
});