import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Store from './store';
import './index.css';

var store = new Store();

ReactDOM.render(<App store={store} />, document.getElementById('root'));
