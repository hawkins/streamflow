import React from 'react';
import styled from 'styled-components';
import logo from '../assets/Glitch_Black_RGB.svg';

const headerSize = '80px';

const Header = styled.div`
  background: #6441A4;
  color: #ecf0f1;
  width: 100%;
  height: ${headerSize};
`;

const Title = styled.h1`
  line-height: ${headerSize};
  font-size: 3.5em;
  margin: 0;
  float: left;
`;

const Logo = styled.img`
  width: ${headerSize};
  height: ${headerSize};
  float: left;
`;

export default () => {
  return (
    <Header>
      <Logo src={logo} />
      <Title>
        Twitch Flow
      </Title>
    </Header>
  );
};
