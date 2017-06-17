import React from "react";
import styled from "styled-components";
import twitchLogo from "../assets/Twitch_White_RGB.png";
import streamflowLogo from "../assets/Streamflow-no-outline.png";
import ViewerInfo from "./ViewerInfo";

const BREAKPOINT_NARROW = "830px";

const headerSizePx = 80;
const headerSize = `${headerSizePx}px`;
const spacing = "20px";

const Header = styled.div`
  background: #6441A4;
  color: #ecf0f1;
  width: 100%;
  height: ${headerSize};
  box-shadow: inset 0 -4px 8px -4px black
`;

const Title = styled.h1`
  line-height: ${headerSize};
  font-size: 3.5em;
  margin-top: 0;
  margin-bottom: 0;
  float: left;
  margin-left: ${spacing};
  text-shadow: 0 2px rgba(189, 195, 199, 0.4);
  font-style: italic;
`;

const DesktopView = styled.div`
  @media (max-width: ${BREAKPOINT_NARROW}) {
    & {
      display: none;
    }
  }
`;

const Subtitle = Title.extend`
  color: rgba(189, 195, 199, 0.7);
  font-style: normal;
`;

const StreamflowLogo = styled.img`
  height: ${headerSizePx - 20}px;
  margin: 0;
  margin: 10px 0 10px ${spacing};
  float: left;
`;

const TwitchLogo = StreamflowLogo.extend`
  height: ${headerSizePx - 30}px;
  margin: 15px 0 15px ${spacing};
`;

export default ({ store }) => (
  <Header>
    <StreamflowLogo src={streamflowLogo} />
    <Title>
      Streamflow
    </Title>
    <DesktopView>
      <Subtitle>
        with
      </Subtitle>
      <TwitchLogo src={twitchLogo} />
    </DesktopView>
    <ViewerInfo store={store} />
  </Header>
);
