import React, { Component } from 'react';
import { observer } from 'mobx-react';
import 'twitch-embed';

@observer
export default class TwitchVideoEmbed extends Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.state = {
      id: null
    };
  }

  static propTypes = {
    channel: React.PropTypes.string
  };

  componentWillMount() {
    this.setId();
  }

  componentDidMount() {
    this.setPlayer();
  }

  componentDidUpdate() {
    this.setPlayer();
  }

  componentWillReceiveProps(nextProps) {
    this.setId();
    this.setPlayer();
  }

  setId() {
    if (!this.state.id) {
      this.setState({
        id: `twitch`
      });
    }
  }

  setPlayer() {
    if (!this.player) {
      if (typeof window !== 'undefined' && window.Twitch) {
        this.player = new window.Twitch.Player(this.state.id, {
          channel: this.props.channel,
          width: this.props.width,
          height: this.props.height
        });
      }
    } else {
      if (this.props.width !== this.state.width || this.props.height !== this.state.height) {
        // Recreate element
        this.setState({
          height: this.props.height,
          width: this.props.width
        });
        document.getElementById(this.state.id).innerHTML = '';
        this.player = new window.Twitch.Player(this.state.id, {
          channel: this.props.channel,
          width: this.props.width,
          height: this.props.height
        });
      } else {
        // Otherwise, just set channel
        this.player.setChannel(this.props.channel);
      }
    }
  }

  render() {
    return <div id={this.state.id || ''} className="twitch-video-embed" />;
  }
}
