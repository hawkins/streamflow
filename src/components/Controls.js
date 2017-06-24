import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "react-toolbox/lib/input";
import { Card, CardTitle, CardActions, CardText } from "react-toolbox/lib/card";
import Button from "react-toolbox/lib/button/Button";

const StyledInput = styled(Input)`
  color: #ecf0f1;
  & > * {
    color: #ecf0f1 !important;
  }
`;

const StyledCard = styled(Card)`
  background: #555555;
  color: #ecf0f1;
  margin: 10px;
  width: calc(100% - 20px);
  flex: 0 0 auto;
`;

export default class Controls extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  constructor() {
    super();

    this.state = {
      newFavorite: "",
      username: ""
    };

    this.handleNewFavoriteClick = this.handleNewFavoriteClick.bind(this);
    this.handleNewFavoriteChange = this.handleNewFavoriteChange.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handleSyncClick = this.handleSyncClick.bind(this);
  }

  handleNewFavoriteChange(value) {
    this.setState({ newFavorite: value });
  }

  handleNewFavoriteClick() {
    const { newFavorite } = this.state;
    if (newFavorite) this.context.store.addFavorite(newFavorite);
    this.setState({ newFavorite: "" });
  }

  handleUsernameChange(value) {
    this.setState({ username: value });
  }

  handleSyncClick() {
    const { username } = this.state;
    if (username) this.context.store.syncWithUser(username);
    this.setState({ username: "" });
  }

  render() {
    return (
      <StyledCard>
        <CardTitle>Add Streamer</CardTitle>
        <CardText>
          <StyledInput
            type="text"
            label="New Favorite Streamer"
            name="name"
            value={this.state.newFavorite}
            onChange={this.handleNewFavoriteChange}
          />
          <StyledInput
            type="text"
            label="Twitch Username"
            name="name"
            value={this.state.username}
            onChange={this.handleUsernameChange}
          />
        </CardText>
        <CardActions>
          <Button
            primary
            raised
            disabled={!this.state.newFavorite}
            value={this.state.newFavorite}
            onClick={this.handleNewFavoriteClick}
            label="Add Favorite"
          />
          <Button
            accent
            raised
            disabled={!this.state.username}
            value={this.state.username}
            onClick={this.handleSyncClick}
            label="Sync"
          />
        </CardActions>
      </StyledCard>
    );
  }
}
