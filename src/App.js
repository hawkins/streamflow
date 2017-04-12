import React, { Component } from 'react';
import styled from 'styled-components';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from './toolbox/theme';
import './toolbox/theme.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Main from './components/Main';

const Container = styled.div`
  text-align: center;
  height: calc(100% - 80px);
`;

class App extends Component {
  render() {
    const { store } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header />
          <Sidebar store={store} />
          <Main store={store} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
