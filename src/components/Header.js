import React from "react";
import styled from "styled-components";
import logo from "../assets/Twitch_White_RGB.png";

const headerSizePx = 80;
const headerSize = `${headerSizePx}px`;
const spacing = "20px";

const Header = styled.div`
  background: #6441A4;
  color: #ecf0f1;
  width: 100%;
  height: ${headerSize};
`;

const Title = styled.h1`
  line-height: ${headerSize};
  font-size: 3.5em;
  margin-top: 0;
  margin-bottom: 0;
  float: left;
  margin-left: ${spacing};
  font-style: italic;
`;

const Subtitle = Title.extend`
  color: rgba(189, 195, 199, 0.7);
  font-style: normal;
`;

const Logo = styled.img`
  height: ${headerSizePx - 30}px;
  margin: 15px 0 15px ${spacing};
  float: left;
`;

export default () => (
  <Header>
    <Title>
      Streamflow
    </Title>
    <Subtitle>
      with
    </Subtitle>
    <Logo src={logo} />
  </Header>
);
