import React, { Component } from 'react';
import { observer } from 'mobx-react';
import TwitchVideoEmbed from './Twitch';

@observer class Player extends Component {
  render() {
    return <TwitchVideoEmbed channel={this.props.store.channel} />;
  }
}

export default Player;
