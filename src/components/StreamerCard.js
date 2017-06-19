import React, { Component } from "react";
import { observer } from "mobx-react";
import styled from "styled-components";
import { Card, CardTitle, CardActions, CardText } from "react-toolbox/lib/card";
import { Avatar } from "react-toolbox/lib/avatar";
import Button from "react-toolbox/lib/button/Button";

const OnlineCard = styled(Card)`
  background: #555555;
  color: #ecf0f1;
  margin: 10px;
  width: calc(100% - 20px);
  flex: 0 0 auto;
`;

const OfflineCard = styled(Card)`
  background: #444;
  color: #c3c8c9;
  margin: 10px;
  width: calc(100% - 20px);
  flex: 0 0 auto;
`;

const StyledCardTitle = styled(CardTitle)`
  & * {
    text-align: left;
  }
  & p {
    color: #b9c0c0 !important;
  }
`;

const StyledAvatar = styled(Avatar)`
  flex-shrink: 0;
`;

const StyledTitle = styled.h5`
  margin: 0;
  padding: 0;
  font-size: 1.4rem;
  font-weight: 400;
  word-wrap: break-word;
  word-break: break-all;
`;

const MaterialCard = ({
  streamer,
  onClick,
  picture,
  status,
  onRemove,
  game
}) => {
  const children = (
    <div>
      <StyledCardTitle
        title={<StyledTitle>{streamer}</StyledTitle>}
        avatar={picture ? <StyledAvatar image={picture} /> : null}
        subtitle={onClick ? game : null}
      />
      <CardText>
        {status}
      </CardText>
      <CardActions>
        {onClick
          ? <Button
              raised
              primary
              label="Watch"
              value={streamer}
              onClick={onClick}
            />
          : null}
        <Button accent label="Remove" value={streamer} onClick={onRemove} />
      </CardActions>
    </div>
  );

  // Return appropriate online or offline card based on
  // ... whether or not a link to watch the stream was provided
  if (onClick) {
    return (
      <OnlineCard raised>
        {children}
      </OnlineCard>
    );
  } else {
    return (
      <OfflineCard raised>
        {children}
      </OfflineCard>
    );
  }
};

@observer class StreamerCard extends Component {
  constructor() {
    super();

    this.state = {
      channelData: null,
      loading: true,
      error: null
    };

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
    this.fetchInformation = this.fetchInformation.bind(this);
  }

  handleFavoriteClick(e) {
    this.props.store.setChannel(e.target.value);
  }

  handleRemoveClick(e) {
    this.props.store.removeFavorite(this.props.streamer);
  }

  fetchInformation() {
    const { streamer } = this.props;
    const config = {
      headers: {
        "Client-ID": "gc6rul66vivvwv6qwj98v529l9mpyo"
      }
    };

    fetch(`https://api.twitch.tv/kraken/channels/${streamer}`, config)
      .then(res => res.json())
      .then(results => {
        this.setState({
          channelsData: results,
          loading: false
        });
      })
      .catch(error => {
        console.error(
          `An error occurred fetching channel data for ${streamer}`,
          error
        );
        this.setState({
          error: JSON.stringify(error)
        });
      });
  }

  componentDidMount() {
    this.fetchInformation();
  }

  render() {
    const { streamer, isOnline } = this.props;

    if (this.state.error) {
      return (
        <div>
          <h3>Error: {this.state.error}</h3>
        </div>
      );
    }

    if (this.state.loading) {
      return (
        <MaterialCard
          streamer={streamer}
          status="Loading..."
          onRemove={this.handleRemoveClick}
        />
      );
    }

    const { display_name, logo, status, game } = this.state.channelsData;

    return (
      <MaterialCard
        streamer={display_name}
        picture={logo}
        status={status}
        game={game}
        onClick={isOnline ? this.handleFavoriteClick : null}
        onRemove={this.handleRemoveClick}
      />
    );
  }
}

export default StreamerCard;
