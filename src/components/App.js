import React, { Component } from 'react';
import styled from 'styled-components';
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';
import theme from '../toolbox/theme';
import '../toolbox/theme.css';
import Header from './Header';
import Sidebar from './Sidebar';
import Main from './Main';

const Container = styled.div`
  text-align: center;
  height: 100%;
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
