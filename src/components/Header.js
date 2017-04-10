import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
  background: #6441A4;
  color: #ecf0f1;
  width: 100%;
  height: 80px;
`;

const Title = styled.h1`
  /* TODO: Vertically center this */
  position: absolute;
  left: 40px;
  font-size: 3.5em;
  margin-top: 0;
  margin-bottom: 0;
`;

export default () => {
  return (
    <Header>
      <Title>Twitch Flow</Title>
    </Header>
  );
}
