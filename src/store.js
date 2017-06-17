import { observable } from "mobx";

export default class Store {
  @observable channel = "cohhcarnage";
  @observable onlineChannels = [];
  @observable favorites = [
    "cohhcarnage",
    "loserfruit",
    "koalibears",
    "aimbotcalvin"
  ];

  @observable channelViewInfo = {};

  constructor(ipc) {
    this.setChannel = this.setChannel.bind(this);
    this.ipc = ipc;
  }

  setChannel(channel) {
    this.channel = channel;
  }

  addFavorite(channel) {
    this.favorites.push(channel);
    this.saveConfig();
  }

  removeFavorite(channel) {
    const index = this.favorites.indexOf(channel);
    if (index !== -1) this.favorites.splice(index, 1);
    this.saveConfig();

    // Remove from onlineChannels
    const onlineIndex = this.onlineChannels.indexOf(channel);
    if (onlineIndex !== -1) this.onlineChannels.splice(onlineIndex, 1);

    // If we just removed our current channel, get a new one
    if (channel === this.channel) {
      this.selectFirstOnlineStreamer();
    }
  }

  setOnline(channel) {
    if (this.onlineChannels.indexOf(channel) === -1)
      this.onlineChannels.push(channel);

    this.selectFirstOnlineStreamer();
  }

  setOffline(channel) {
    const index = this.onlineChannels.indexOf(channel);
    if (index !== -1) this.onlineChannels.splice(index, 1);

    this.selectFirstOnlineStreamer();
  }

  updateChannel({ streamer, viewers, followers, views }) {
    this.channelViewInfo[streamer] = { viewers, followers, views };
  }

  selectFirstOnlineStreamer() {
    // Only change channel if current is not online and there is at least 1 online channel
    if (
      this.onlineChannels.length > 0 &&
      this.onlineChannels.indexOf(this.channel) === -1
    ) {
      this.channel = this.onlineChannels[0];
    }
  }

  loadConfig(config) {
    this.favorites = config.favorites;
    this.channel = config.favorites[0];
  }

  saveConfig() {
    const config = { favorites: this.favorites.$mobx.values };
    this.ipc.send("config save", config);
  }
}
