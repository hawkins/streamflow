import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import {
  Card,
  CardTitle,
  CardActions
} from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';

const Side = styled.div`
  position: absolute;
  left: 0;
  top: 80px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

const StreamerCard = ({ streamer, callback }) => (
  <Card>
    <CardTitle title={streamer} />
    <CardActions>
      <Button raised label="Watch" value={streamer} onClick={callback} />
    </CardActions>
  </Card>
);

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
        <h3>Favorites</h3>
        {this.props.store.favorites.map(item => (
          <StreamerCard key={item} streamer={item} callback={this.handleFavoriteClick} />
        ))}
      </Side>
    );
  }
}

export default Sidebar;
