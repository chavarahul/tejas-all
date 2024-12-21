const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  receiveClipboardText: (callback) => ipcRenderer.on('clipboard-text', callback),
});
