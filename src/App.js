import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import logo from './logo.svg';

const rotate360 = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Container = styled.div`
  text-align: center;
`;

const Spinner = styled.div`
  animation: ${rotate360} infinite 20s linear;;
`;

const Logo = styled.img`
  height: 80px;
`;

const Title = styled.div`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const Greeting = styled.p`
  font-size: large;
`;

const Content = styled.div`
  position: absolute;
  right: 0;
  top: 80px;
  width: calc(100% - 200px);
`;

class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <Container>
        <Header />
        <Sidebar store={store} />
        <Content>
          <Title>
            <Spinner>
              <Logo src={logo} alt="logo" />
            </Spinner>
            <h2>Welcome to Twitch Flow</h2>
          </Title>
          <Greeting>
            Hello Electron!
          </Greeting>
          <Player store={store} />
        </Content>
      </Container>
    );
  }
}

export default App;
