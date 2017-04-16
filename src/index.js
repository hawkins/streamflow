import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './store';
const { ipcRenderer } = window.require('electron');
import './index.css';

var store = new Store(ipcRenderer);

ipcRenderer.send('config request');
ipcRenderer.on('config', (e, config) => {
  store.loadConfig(config);
});

ReactDOM.render(<App store={store} />, document.getElementById('root'));
