import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { observer } from "mobx-react";

const Main = styled.div`
  float: right;
  height: calc(100vh - 80px);
  width: calc(100% - 260px);
`;

@observer
export default class Player extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  render() {
    const { channel } = this.context.store;
    return (
      <Main>
        <iframe
          src={`http://player.twitch.tv/?channel=${channel}`}
          width="100%"
          height="100%"
          allowFullScreen="true"
          frameBorder="0"
          style={{ display: "block" }}
        />
      </Main>
    );
  }
}
