import React, { Component } from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { Card, CardTitle, CardActions, CardText } from 'react-toolbox/lib/card';
import Button from 'react-toolbox/lib/button/Button';
import axios from 'axios';

const StyledCard = styled(Card)`
  background: #555555;
  color: #ecf0f1;
  margin: 10px;
  width: calc(100% - 20px);
  flex: 0 0 auto;
`;

const MaterialCard = ({ streamer, callback, picture, status }) => (
  <StyledCard raised>
    {picture
      ? <CardTitle title={streamer} avatar={picture} />
      : <CardTitle title={streamer} />}
    <CardText>
      {status}
    </CardText>
    {callback
      ? <CardActions>
          <Button raised label="Watch" value={streamer} onClick={callback} />
        </CardActions>
      : null}
  </StyledCard>
);

@observer class StreamerCard extends Component {
  constructor() {
    super();

    this.state = {
      streamsData: null,
      channelData: null,
      loading: true,
      error: null
    };

    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  handleFavoriteClick(e) {
    this.props.store.setChannel(e.target.value);
  }

  componentDidMount() {
    const { streamer } = this.props;
    const config = {
      headers: {
        'Client-ID': 'gc6rul66vivvwv6qwj98v529l9mpyo'
      }
    };

    axios
      .get(`https://api.twitch.tv/kraken/channels/${streamer}`, config)
      .then(res => {
        this.setState({
          channelsData: res.data
        });

        if (this.state.streamsData) {
          this.setState({
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: JSON.stringify(error)
        });
      });

    axios
      .get(`https://api.twitch.tv/kraken/streams/${streamer}`, config)
      .then(res => {
        this.setState({
          streamsData: res.data
        });

        if (this.state.channelsData) {
          this.setState({
            loading: false
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          error: JSON.stringify(error)
        });
      });
  }

  render() {
    const { streamer } = this.props;

    if (this.state.error) {
      return (
        <div>
          <h3>Error: {this.state.error}</h3>
        </div>
      );
    }

    if (this.state.loading) {
      return <MaterialCard streamer={streamer} status="Loading..." />;
    }

    const isOnline = this.state.streamsData.stream !== null;

    return (
      <MaterialCard
        streamer={streamer}
        callback={isOnline ? this.handleFavoriteClick : null}
        picture={this.state.channelsData.logo}
        status={this.state.channelsData.status}
      />
    );
  }
}

export default StreamerCard;
