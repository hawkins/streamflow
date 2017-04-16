import { observable } from 'mobx';

export default class Store {
  @observable channel = 'cohhcarnage';
  @observable favorites = [
    'cohhcarnage',
    'loserfruit',
    'koalibears',
    'aimbotcalvin'
  ];

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
  }

  loadConfig(config) {
    this.favorites = config.favorites;
    this.channel = config.favorites[0];
  }

  saveConfig() {
    const config = { favorites: this.favorites.$mobx.values };

    this.ipc.send('config save', config);
  }
}
