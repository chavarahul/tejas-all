import { app, BrowserWindow, ipcMain, screen } from 'electron';
import path from 'path';
import clipboardy from 'clipboardy';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

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
