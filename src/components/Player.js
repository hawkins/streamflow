import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer class Player extends Component {
  render() {
    const { channel } = this.props.store;
    return (
      <iframe
        src={`http://player.twitch.tv/?channel=${channel}`}
        width="100%"
        height="100%"
        allowFullScreen="true"
        frameBorder="0"
      />
    );
  }
}

export default Player;
