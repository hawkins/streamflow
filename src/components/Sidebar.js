import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import Controls from "./Controls";
import FavoriteStreamers from "./FavoriteStremers";

const Side = styled.div`
  float:left;
  width: 260px;
  display: flex;
  flex-direction: column;
  background-color: #4d4d4d;
  height: calc(100vh - 80px);
  color: #ecf0f1;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
    background-color: rgba(0,0,0,0);
    -webkit-border-radius: 100px;
  }

  ::-webkit-scrollbar-thumb:vertical {
    background: rgba(0,0,0,0.5);
    -webkit-border-radius: 100px;
  }
  ::-webkit-scrollbar-thumb:vertical:active {
    background: rgba(0,0,0,0.61);
    -webkit-border-radius: 100px;
  }
`;

@observer class Sidebar extends Component {
  render() {
    const { store } = this.props;
    return (
      <Side>
        <Controls store={store} />
        <FavoriteStreamers store={store} />
      </Side>
    );
  }
}

export default Sidebar;
