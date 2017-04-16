import React, { Component } from 'react';
import styled from 'styled-components';
import Input from 'react-toolbox/lib/input';
import { Card, CardTitle, CardActions, CardText } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';

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

export default class Controls extends Component {
  constructor() {
    super();

    this.state = {
      newFavorite: ''
    };

    this.handleNewFavoriteChange = this.handleNewFavoriteChange.bind(this);
    this.handleNewFavoriteClick = this.handleNewFavoriteClick.bind(this);
  }

  handleNewFavoriteChange(value) {
    this.setState({
      newFavorite: value
    });
  }

  handleNewFavoriteClick() {
    const { newFavorite } = this.state;
    if (newFavorite) this.props.store.addFavorite(this.state.newFavorite);
    this.setState({ newFavorite: '' });
  }

  render() {
    return (
      <StyledCard>
        <CardTitle>Add Streamer</CardTitle>
        <CardText>
          <StyledInput
            type="text"
            label="Streamer name"
            name="name"
            value={this.state.newFavorite}
            onChange={this.handleNewFavoriteChange}
          />
        </CardText>
        <CardActions>
          <Button
            primary
            raised
            value={this.state.newFavorite}
            onClick={this.handleNewFavoriteClick}
            label="Add New Favorite"
          />
        </CardActions>
      </StyledCard>
    );
  }
}
