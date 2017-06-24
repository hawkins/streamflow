import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";

@observer class Player extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  render() {
    const { channel } = this.context.store;
    return (
      <iframe
        src={`http://player.twitch.tv/?channel=${channel}`}
        width="100%"
        height="100%"
        allowFullScreen="true"
        frameBorder="0"
        style={{ display: "block" }}
      />
    );
  }
}

export default Player;
