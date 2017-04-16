import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import StreamerCard from './StreamerCard';

const Side = styled.div`
  float:left;
  width: 260px;
  display: flex;
  flex-direction: column;
  background-color: #4d4d4d;
  height: 100vh
  color: #ecf0f1;
  overflow-y: auto;
`;

@observer class Sidebar extends Component {
  constructor() {
    super();
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  handleFavoriteClick(e) {
    this.props.store.setChannel(e.target.value);
  }

  render() {
    return (
      <Side>
        <h2>Favorites</h2>
        {this.props.store.favorites.map(item => (
          <StreamerCard key={item} streamer={item} store={this.props.store} />
        ))}
      </Side>
    );
  }
}

export default Sidebar;
