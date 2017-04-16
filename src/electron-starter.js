const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const os = require('os');

const CONFIG_FILE_PATH = `${os.homedir()}/.twitch-flow.json`;
let config = undefined;

function loadConfig() {
  // Load in config or create it if it does not exist
  fs.exists(CONFIG_FILE_PATH, exists => {
    if (exists) {
      // Load the file
      fs.readFile(CONFIG_FILE_PATH, (err, data) => {
        if (err) {
          throw err;
        } else {
          config = JSON.parse(data);
          console.log('Loaded config', config);
          mainWindow.webContents.send('config', config);
        }
      });
    } else {
      // Write the file
      config = {
        favorites: ['cohhcarnage', 'loserfruit', 'koalibears', 'aimbotcalvin']
      };
      fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(config), (err, data) => {
        if (err) {
          throw err;
        } else {
          console.log('Wrote config', config);
          mainWindow.webContents.send('config', config);
        }
      });
    }
  });
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600
  });

  // and load the index.html of the app.
  const startUrl = process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  mainWindow.loadURL(startUrl);

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  // Handle client requesting user config
  ipcMain.on('config request', loadConfig);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
