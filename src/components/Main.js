import React from "react";
import styled from "styled-components";
import Player from "./Player";

const Content = styled.div`
  float: right;
  height: calc(100vh - 80px);
  width: calc(100% - 260px);
`;

export default () => <Content><Player /></Content>;
