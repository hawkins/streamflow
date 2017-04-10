import React, { Component } from 'react';
import TwitchVideoEmbed from './components/Twitch';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Twitch Flow</h2>
        </div>
        <p className="App-intro">
          Hello Electron!
        </p>
        <TwitchVideoEmbed channel="cohhcarnage"/>
        <TwitchVideoEmbed channel="loserfruit"/>
        <TwitchVideoEmbed channel="koalibears"/>
        <TwitchVideoEmbed channel="aimbotcalvin"/>
      </div>
    );
  }
}

export default App;
