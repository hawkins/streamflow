import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Card, CardTitle, CardActions, CardText } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';
import Request from 'react-http-request';

const Side = styled.div`
  position: absolute;
  left: 0;
  top: 80px;
  width: 260px;
  display: flex;
  flex-direction: column;
  background-color: #4d4d4d;
  height: calc(100% - 80px);
  color: #ecf0f1;
  overflow-y: auto;
`;

const StyledCard = styled(Card)`
  background: #555555;
  color: #ecf0f1;
  margin: 10px;
  width: calc(100% - 20px);
  flex-shrink: 0;
`;

const StreamerCard = ({ streamer, callback, picture, status }) => (
  <StyledCard raised>
    {picture
      ? <CardTitle title={streamer} avatar={picture} />
      : <CardTitle title={streamer} />}
    <CardText>
      {status}
    </CardText>
    <CardActions>
      <Button raised label="Watch" value={streamer} onClick={callback} />
    </CardActions>
  </StyledCard>
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
          <Request
            url={`https://api.twitch.tv/kraken/channels/${item}`}
            method="get"
            accept="application/json"
            headers={{ 'Client-ID': 'gc6rul66vivvwv6qwj98v529l9mpyo' }}
            verbose={false}
          >
            {({ error, result, loading }) => {
              if (loading) {
                return (
                  <StreamerCard
                    key={item}
                    streamer={item}
                    callback={this.handleFavoriteClick}
                    status="Loading..."
                  />
                );
              } else {
                return (
                  <StreamerCard
                    key={item}
                    streamer={item}
                    callback={this.handleFavoriteClick}
                    picture={result.body.logo}
                    status={result.body.status}
                  />
                );
              }
            }}
          </Request>
        ))}
      </Side>
    );
  }
}

export default Sidebar;
