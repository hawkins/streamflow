import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ThemeProvider from "react-toolbox/lib/ThemeProvider";
import DevTools from "mobx-react-devtools";
import theme from "../toolbox/theme";
import "../toolbox/theme.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Player from "./Player";
import Updater from "./Updater";

let MaybeDevTools = () => null;
if (process.env.NODE_ENV !== "production") MaybeDevTools = DevTools;

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
          <MaybeDevTools />
          <Header />
          <Sidebar />
          <Player />
          <Updater />
        </Container>
      </ThemeProvider>
    );
  }
}

export default App;
