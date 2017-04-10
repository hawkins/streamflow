import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Sidebar extends Component {
  constructor() {
    super();
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }

  handleFavoriteClick(e) {
    this.props.store.setChannel(e.target.value);
  }

  render() {
    return (
      <div>
        <h3>Favorites</h3>
        {this.props.store.favorites.map(item => (<button value={item} onClick={this.handleFavoriteClick}>{item}</button>))}
      </div>
    );
  }
}

export default Sidebar;
