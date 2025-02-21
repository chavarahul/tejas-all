import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import os from 'os';

const execAsync = promisify(exec);

class FileOperationsHandler {
  constructor() {
    this.supportedApps = {
      'vscode': 'code',
      'vs code': 'code',
      'visual studio code': 'code',
      'notepad': 'notepad',
      'explorer': 'explorer'
    };
    
    this.homeDir = os.homedir();
    this.searchPaths = [
      this.homeDir,
      path.join(this.homeDir, 'OneDrive/Desktop'),
      path.join(this.homeDir, 'OneDrive/Downloads'),
      path.join(this.homeDir, 'OneDrive/Documents'),
      path.join(this.homeDir, 'OneDrive/Projects'),
      'C:\\',
      'D:\\',
    ];
  }

  findFolder(folderName) {
    for (const basePath of this.searchPaths) {
      try {
        if (!fs.existsSync(basePath)) continue;
        
        // Check if folder exists directly in the base path
        const directPath = path.join(basePath, folderName);
        if (fs.existsSync(directPath)) {
          return directPath;
        }

        // Search one level deep in directories
        const items = fs.readdirSync(basePath);
        for (const item of items) {
          const itemPath = path.join(basePath, item);
          try {
            const stats = fs.statSync(itemPath);
            if (stats.isDirectory()) {
              const nestedPath = path.join(itemPath, folderName);
              if (fs.existsSync(nestedPath)) {
                return nestedPath;
              }
            }
          } catch (error) {
            console.log(`Skipping inaccessible path: ${itemPath}`);
          }
        }
      } catch (error) {
        console.log(`Skipping search path: ${basePath}`);
      }
    }
    return null;
  }

  async processCommand(command) {
    console.log('Processing command:', command);
    const normalizedCommand = command.toLowerCase();
    
    if (normalizedCommand.includes('open folder') || normalizedCommand.includes('open directory')) {
      return this.handleOpenFolder(command);
    } else if (normalizedCommand.includes('create folder') || normalizedCommand.includes('create directory')) {
      return this.handleCreateFolder(command);
    } else if (normalizedCommand.includes('delete folder') || normalizedCommand.includes('remove folder')) {
      return this.handleDeleteFolder(command);
    } else if (normalizedCommand.includes('list files')) {
      return this.handleListFiles(command);
    } else {
      return { success: false, message: "Command not recognized. Try commands like 'open folder [name] in VS Code' or 'create folder [name]'" };
    }
  }

  async handleOpenFolder(command) {
    try {
      console.log('Handling open folder command:', command);
      const folderMatch = command.match(/folder\s+([^\s]+)/i);
      const appMatch = command.match(/in\s+([^,\s]+(?:\s+[^,\s]+)*$)/i);

      if (!folderMatch) {
        return { success: false, message: "Folder name not specified" };
      }

      const folderName = folderMatch[1];
      const app = appMatch ? appMatch[1].toLowerCase() : 'explorer';
      
      // Search for the folder
      const folderPath = this.findFolder(folderName);
      if (!folderPath) {
        return { 
          success: false, 
          message: `Folder ${folderName} not found in any of the common locations. Searched in:\n${this.searchPaths.join('\n')}`
        };
      }

      console.log('Found folder at:', folderPath);
      const appCommand = this.supportedApps[app] || 'explorer';
      
      if (appCommand === 'code') {
        try {
          await execAsync(`code "${folderPath}"`);
          return { success: true, message: `Opening ${folderName} (${folderPath}) in VS Code` };
        } catch (error) {
          console.error('Error executing VS Code command:', error);
          return { success: false, message: `Error opening VS Code: ${error.message}` };
        }
      } else {
        const startCommand = process.platform === 'win32' ? 'start' : 'open';
        try {
          await execAsync(`${startCommand} "${folderPath}"`);
          return { success: true, message: `Opening ${folderName} (${folderPath}) in ${app}` };
        } catch (error) {
          console.error('Error opening folder:', error);
          return { success: false, message: `Error opening folder: ${error.message}` };
        }
      }
    } catch (error) {
      console.error('Error in handleOpenFolder:', error);
      return { success: false, message: `Error processing command: ${error.message}` };
    }
  }

  async handleCreateFolder(command) {
    try {
      const folderMatch = command.match(/folder\s+([^\s]+)/i);
      if (!folderMatch) {
        return { success: false, message: "Folder name not specified" };
      }

      const folderName = folderMatch[1];
      // Create in Desktop by default
      const folderPath = path.join(this.homeDir, 'Desktop', folderName);

      if (fs.existsSync(folderPath)) {
        return { success: false, message: `Folder ${folderName} already exists at ${folderPath}` };
      }

      fs.mkdirSync(folderPath);
      return { success: true, message: `Created folder ${folderName} at ${folderPath}` };
    } catch (error) {
      console.error('Error in handleCreateFolder:', error);
      return { success: false, message: `Error creating folder: ${error.message}` };
    }
  }

  async handleDeleteFolder(command) {
    try {
      const folderMatch = command.match(/folder\s+([^\s]+)/i);
      if (!folderMatch) {
        return { success: false, message: "Folder name not specified" };
      }

      const folderName = folderMatch[1];
      const folderPath = this.findFolder(folderName);

      if (!folderPath) {
        return { success: false, message: `Folder ${folderName} not found in any common locations` };
      }

      fs.rmdirSync(folderPath);
      return { success: true, message: `Deleted folder ${folderName} from ${folderPath}` };
    } catch (error) {
      console.error('Error in handleDeleteFolder:', error);
      return { success: false, message: `Error deleting folder: ${error.message}` };
    }
  }

  async handleListFiles(command) {
    try {
      const folderMatch = command.match(/in\s+([^\s]+)/i);
      const folderName = folderMatch ? folderMatch[1] : '.';
      const folderPath = folderMatch ? this.findFolder(folderName) : this.homeDir;

      if (!folderPath) {
        return { success: false, message: `Folder ${folderName} not found in any common locations` };
      }

      const files = fs.readdirSync(folderPath);
      return { 
        success: true, 
        message: `Files in ${folderName} (${folderPath}):`, 
        data: files 
      };
    } catch (error) {
      console.error('Error in handleListFiles:', error);
      return { success: false, message: `Error listing files: ${error.message}` };
    }
  }
}

export const fileOperations = new FileOperationsHandler();