const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
    receiveClipboardText: (callback) => ipcRenderer.on('clipboard-text', callback),
    enableMouseEvents: () => ipcRenderer.send('enable-mouse-events'),
    disableMouseEvents: () => ipcRenderer.send('disable-mouse-events'),
    executeCommand: (command) => ipcRenderer.invoke('execute-command', command),
    startVoiceRecognition: () => ipcRenderer.invoke('start-voice-recognition'),
    handleFileOperation: (operation, path) => ipcRenderer.invoke('file-operation', operation, path),
    startScreenMonitor: () => ipcRenderer.invoke('start-screen-monitor')
});