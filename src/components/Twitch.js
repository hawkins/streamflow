import React from 'react';
import { observer } from 'mobx-react';
import 'twitch-embed';

@observer
class TwitchVideoEmbed extends React.Component {
  constructor(props) {
    super(props);
    this.player = null;
    this.state = {
      id: null
    };
  }

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
      if (this.props.channel) {
        this.channel = true;
        this.setState({
          id: `twitch-${this.props.channel}`
        });
      }
      if (this.props.video) {
        this.channel = false;
        this.setState({
          id: `twitch-${this.props.video}`
        });
      }
    }
  }

  setPlayer() {
    if (!this.player) {
      const options = {};
      if (this.channel) {
        options.channel = this.props.channel;
      } else {
        options.video = this.props.video;
      }

      if (window.Twitch)
        this.player = new window.Twitch.Player(this.state.id, options);
    }
  }

  render() {
    return <div id={this.state.id || ''} className="twitch-video-embed" />;
  }
}

TwitchVideoEmbed.propTypes = {
  channel: React.PropTypes.string,
  video: React.PropTypes.string,
  play: React.PropTypes.bool
};

export default TwitchVideoEmbed;
