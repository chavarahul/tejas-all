// electron.d.ts
import { IpcRenderer } from 'electron';

declare global {
  interface Window {
    electron: {
      sendClipboardText: (callback: (event: Electron.IpcRendererEvent, text: string) => void) => void;
    };
  }
}

export {};
