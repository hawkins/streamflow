import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ThemeProvider from "react-toolbox/lib/ThemeProvider";
import theme from "../toolbox/theme";
import "../toolbox/theme.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Player from "./Player";

const Container = styled.div`
  text-align: center;
  height: 100%;
`;

class App extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  };

  getChildContext() {
    return { store: this.props.store };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Header />
          <Sidebar />
          <Player />
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
