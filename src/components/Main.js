import React, { Component } from 'react';
import styled from 'styled-components';
import Player from './Player';

const Content = styled.div`
  position: absolute;
  right: 0;
  top: 80px;
  width: calc(100% - 260px);
  height: calc(100% - 80px);
`;

export default class Main extends Component {
  render() {
    const { store } = this.props;
    return (
      <Content id="content">
        <Player store={store} />
      </Content>
    );
  }
}
