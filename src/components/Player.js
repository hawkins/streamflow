import React, { Component } from 'react';
import { observer } from 'mobx-react';
import TwitchVideoEmbed from './Twitch';

@observer class Player extends Component {
  constructor() {
    super();
    this.state = {
      height: 0,
      width: 0
    };
  }
  componentDidMount() {
    const height = document.getElementById('content').clientHeight;
    const width = document.getElementById('content').clientWidth;
    this.setState({
      height,
      width
    });
  }
  render() {
    const { width, height } = this.state;
    return (
      <TwitchVideoEmbed
        channel={this.props.store.channel}
        height={height}
        width={width}
      />
    );
  }
}

export default Player;
