import React, { Component } from 'react';
import { observer } from 'mobx-react';

@observer
class Sidebar extends Component {
  render() {
    const { favorites } = this.props.store;
    return (
      <div>
        <h3>Favorites</h3>
        {favorites.map(item => (<p>{item}</p>))}
      </div>
    );
  }
}

export default Sidebar;
