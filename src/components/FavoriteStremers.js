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
      let results = values.map((item, i) => ({
        streamer: favorites[i],
        online: item.data.stream !== null
      }));

      this.setState({
        favorites: results
      });
    });
  }

  componentDidUpdate() {
    const { favorites } = this.state;
    const { store } = this.props;

    favorites.forEach(item => {
      if (item.online) store.setOnline(item.streamer);
      else store.setOffline(item.streamer);
    });
  }

  render() {
    const { store } = this.props;
    const { favorites } = this.state;
    const onlineStreamers = favorites.filter(item => item.online);
    const offlineStreamers = favorites.filter(item => !item.online);

    return (
      <div>
        <h2>Favorite Streamers</h2>
        {onlineStreamers.length > 0
          ? <div>
              <h3>Live</h3>
              {onlineStreamers.map(item => (
                <StreamerCard
                  key={item.streamer}
                  streamer={item.streamer}
                  isOnline={item.online}
                  store={store}
                />
              ))}
            </div>
          : <span>
              None of your favorite streamers are currently online! Maybe add some more?
            </span>}
        {offlineStreamers.length > 0
          ? <div>
              <h3>Offline</h3>
              {offlineStreamers.map(item => (
                <StreamerCard
                  key={item.streamer}
                  streamer={item.streamer}
                  isOnline={item.online}
                  store={store}
                />
              ))}
            </div>
          : null}
      </div>
    );
  }
}

export default FavoriteStreamers;
