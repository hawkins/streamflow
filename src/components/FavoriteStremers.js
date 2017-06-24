import React from "react";
import PropTypes from "prop-types";
import { observer } from "mobx-react";
import { autorun } from "mobx";
import StreamerCard from "./StreamerCard";

@observer class FavoriteStreamers extends React.Component {
  static contextTypes = {
    store: PropTypes.object
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      favorites: context.store.favorites.map(item => ({
        streamer: item,
        online: false
      }))
    };

    this.fetchInformation = this.fetchInformation.bind(this);
  }

  componentDidMount() {
    autorun(this.fetchInformation);

    // Poll for online status every so often
    setInterval(this.fetchInformation, 60000);
  }

  fetchInformation() {
    const { favorites } = this.context.store;
    const config = {
      headers: {
        "Client-ID": "gc6rul66vivvwv6qwj98v529l9mpyo"
      }
    };

    Promise.all(
      favorites.map(streamer =>
        fetch(
          `https://api.twitch.tv/kraken/streams/${streamer}`,
          config
        ).then(res => res.json())
      )
    )
      .then(values => {
        // Get list of streamers names and whether they are online or not
        const results = values.map(({ stream }, i) => ({
          streamer: favorites[i],
          online: stream !== null
        }));

        this.setState({ favorites: results });
      })
      .catch(err => {
        console.error("An error occurred during fetching streamer status", err);
      });
  }

  componentDidUpdate() {
    const { favorites } = this.state;
    const { store } = this.context;

    favorites.forEach(item => {
      if (item.online) store.setOnline(item.streamer);
      else store.setOffline(item.streamer);
    });
  }

  render() {
    const { store } = this.context;
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
