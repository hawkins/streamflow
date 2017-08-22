import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import Store from "./store";
const { ipcRenderer } = window.require("electron");
import "./assets/index.css";

var store = new Store(ipcRenderer);

ipcRenderer.send("config request");
ipcRenderer.on("config", (e, config) => {
  store.loadConfig(config);
});

ipcRenderer.on("update-downloaded", () => {
  store.promptUserToUpdate();
});

ReactDOM.render(<App store={store} />, document.getElementById("root"));
