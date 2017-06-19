const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const fs = require("fs");
const os = require("os");

const CONFIG_FILE_PATH = `${os.homedir()}/.streamflow.json`;
const DEFAULT_CONFIG = {
  favorites: ["cohhcarnage", "loserfruit", "koalibears", "aimbotcalvin"],
  alwaysOnTop: true
};

let config;

function loadConfig() {
  return new Promise((resolve, reject) => {
    // Load in config or create it if it does not exist
    fs.exists(CONFIG_FILE_PATH, exists => {
      if (exists) {
        // Load the file
        fs.readFile(CONFIG_FILE_PATH, (err, data) => {
          if (err) return reject(err);

          // Add any new keys that did not exist the last time they saved config
          config = Object.assign({}, DEFAULT_CONFIG, JSON.parse(data));

          console.log("Loaded config", config);
          resolve(config);
        });
      } else {
        // Write the file
        config = Object.assign({}, DEFAULT_CONFIG);

        saveConfig(config);
        resolve(config);
      }
    });
  });
}

function saveConfig(data, callback) {
  fs.writeFile(CONFIG_FILE_PATH, JSON.stringify(data), err => {
    if (err) {
      throw err;
    } else {
      console.log("Wrote config", config);
      if (callback) callback(data);
    }
  });
}

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    autoHideMenuBar: true,
    alwaysOnTop: config.alwaysOnTop
  });

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    });
  mainWindow.loadURL(startUrl);

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// Handle client requesting user config
ipcMain.on("config request", () =>
  mainWindow.webContents.send("config", config)
);

// Handle client requesting to save config
ipcMain.on("config save", (e, data) => {
  // Update config and add any missing keys
  config = Object.assign({}, DEFAULT_CONFIG, config, data);
  saveConfig(config);
});

loadConfig()
  .then(() => {
    if (!mainWindow) createWindow();

    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    app.on("ready", createWindow);

    // Quit when all windows are closed.
    app.on("window-all-closed", function() {
      // On OS X it is common for applications and their menu bar
      // to stay active until the user quits explicitly with Cmd + Q
      if (process.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", function() {
      // On OS X it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) {
        createWindow();
      }
    });
  })
  .catch(console.error);
