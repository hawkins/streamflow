import React, { Component } from 'react';
import styled from 'styled-components';
import Player from './Player';

const Content = styled.div`
  float: right;
  height: 100vh;
  width: calc(100% - 260px);
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
