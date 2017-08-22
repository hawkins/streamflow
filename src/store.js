import { action, observable } from "mobx";

export default class Store {
  @observable channel = "cohhcarnage";
  @observable onlineChannels = [];
  @observable favorites = [];
  @observable updateDownloaded = false;

  constructor(ipc) {
    this.ipc = ipc;
  }

  @action setChannel = channel => {
    this.channel = channel.toLowerCase();
    this.ipc.send("select channel", channel);
  };

  @action syncWithUser = async username => {
    let total;
    let found = 0;
    let newFavorites = [];

    const config = {
      headers: {
        "Client-ID": "gc6rul66vivvwv6qwj98v529l9mpyo"
      }
    };

    while (!total || found < total) {
      console.log(`Syncing favorites with user ${username}`);
      let res = await fetch(
        `https://api.twitch.tv/kraken/users/${username}/follows/channels?offset=${found}`,
        config
      );
      let data = await res.json();

      total = data._total;
      found += data.follows.length;
      console.log(`> Found ${found} follows so far`);

      newFavorites = newFavorites.concat(
        data.follows.map(({ channel }) => channel.name)
      );
    }

    console.log(`Synced ${found} favorites`);
    this.favorites = newFavorites;
    this.onlineChannels = [];
    this.saveConfig();
  };

  @action addFavorite = channel => {
    this.favorites.push(channel);
    this.saveConfig();
  };

  @action removeFavorite = channel => {
    const index = this.favorites.indexOf(channel);
    if (index !== -1) this.favorites.splice(index, 1);
    this.saveConfig();

    // Remove from onlineChannels
    const onlineIndex = this.onlineChannels.indexOf(channel);
    if (onlineIndex !== -1) this.onlineChannels.splice(onlineIndex, 1);

    // If we just removed our current channel, get a new one
    if (channel === this.channel) {
      this.selectOnlineChannel();
    }
  };

  @action setOnline = channel => {
    if (this.onlineChannels.indexOf(channel) === -1) {
      this.onlineChannels.push(channel);
      this.ipc.send("online channels", this.onlineChannels.slice());
    }

    this.selectOnlineChannel();
  };

  @action setOffline = channel => {
    const index = this.onlineChannels.indexOf(channel);
    if (index !== -1) {
      this.onlineChannels.splice(index, 1);
      this.ipc.send("online channels", this.onlineChannels.slice());
    }

    this.selectOnlineChannel();
  };

  selectOnlineChannel = () => {
    // Only change channel if current is not online and there is at least 1 online channel
    if (
      this.onlineChannels.length > 0 &&
      this.onlineChannels.indexOf(this.channel) === -1
    )
      this.setChannel(this.onlineChannels[0]);
  };

  @action loadConfig = config => {
    this.favorites = config.favorites.map(a => a.toLowerCase());
    this.channel = config.favorites[0].toLowerCase();
  };

  @action saveConfig = () => {
    const config = { favorites: this.favorites.$mobx.values };
    this.ipc.send("config save", config);
  };

  @action promptUserToUpdate = () => {
    this.updateDownloaded = true;
  };

  @action initiateUpdate = () => {
    this.ipc.send("install-update");
  };
}
