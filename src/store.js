import { observable } from 'mobx';

export default class Store {
  @observable channel = 'cohhcarnage';
  @observable favorites = ['cohhcarnage', 'loserfruit', 'koalibears', 'aimbotcalvin'];

  constructor() {
    this.setChannel = this.setChannel.bind(this);
  }

  setChannel(channel) {
    this.channel = channel;
  }

  addFavorite(channel) {
    this.favorites.push(channel);
  }

  removeFavorite(channel) {
    const index = this.favorites.indexOf(channel);
    if (index !== -1) this.favorites.splice(index, 1);
  }
}
