import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';

const Side = styled.div`
  position: absolute;
  left: 0;
  top: 80px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const Item = styled.div`

`;

@observer
class Sidebar extends Component {
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
        <h3>Favorites</h3>
        {this.props.store.favorites.map(item => (<button value={item} onClick={this.handleFavoriteClick}>{item}</button>))}
      </Side>
    );
  }
}

export default Sidebar;
