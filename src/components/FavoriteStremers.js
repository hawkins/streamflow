import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { autorun } from 'mobx';
import axios from 'axios';
import StreamerCard from './StreamerCard';

@observer class FavoriteStreamers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: props.store.favorites.map(item => ({
        streamer: item,
        online: false
      }))
    };

    this.fetchInformation = this.fetchInformation.bind(this);
  }

  componentDidMount() {
    autorun(this.fetchInformation);

    // Poll for online status every so often
    setInterval(this.fetchInformation, 300000);
  }

  fetchInformation() {
    console.log('Fetching stream information for all favorites');

    const { favorites } = this.props.store;
    const config = {
      headers: {
        'Client-ID': 'gc6rul66vivvwv6qwj98v529l9mpyo'
      }
    };

    Promise.all(
      favorites.map(streamer =>
        axios.get(`https://api.twitch.tv/kraken/streams/${streamer}`, config))
    ).then(values => {
      // Get list of streamers names and whether they are online or not
      let results = [];
      for (let i = 0; i < values.length; i++) {
        results.push({
          streamer: favorites[i],
          online: values[i].data.stream !== null
        });
      }

      // Sort to display online streamers first
      results.sort((x, y) => {
        return x.online === y.online ? 0 : x.online ? -1 : 1;
      });

      this.setState({
        favorites: results
      });
    });
  }

  render() {
    const { store } = this.props;
    const { favorites } = this.state;

    return (
      <div>
        <h2>Favorites</h2>
        {favorites.map(item => (
          <StreamerCard
            key={item.streamer}
            streamer={item.streamer}
            isOnline={item.online}
            store={store}
          />
        ))}
      </div>
    );
  }
}

export default FavoriteStreamers;
