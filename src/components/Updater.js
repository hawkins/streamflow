import React from "react";
import PropTypes from "prop-types";
import Dialog from "react-toolbox/lib/dialog/Dialog";
import { observer } from "mobx-react";

@observer class Updater extends React.Component {
  actions = [
    { label: "Not now.", onClick: () => null },
    { label: "Let's go!", onClick: this.handleUpdate.bind(this) }
  ];

  handleUpdate() {
    this.context.store.initiateUpdate();
  }

  render() {
    return (
      <Dialog
        actions={this.actions}
        active={this.context.store.updateDownloaded}
        onEscKeyDown={() => null}
        onOverlayClick={() => null}
        title="New Update Downloaded"
      />
    );
  }
}

Updater.contextTypes = { store: PropTypes.object };

export default Updater;
