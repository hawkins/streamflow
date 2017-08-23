import React from "react";
import PropTypes from "prop-types";
import Dialog from "react-toolbox/lib/dialog/Dialog";
import { observer } from "mobx-react";

@observer class Updater extends React.Component {
  actions = [
    { label: "Not now.", onClick: this.hidePopup.bind(this) },
    { label: "Let's go!", onClick: this.handleUpdate.bind(this) }
  ];

  handleUpdate() {
    this.context.store.initiateUpdate();

    this.hidePopup();
  }

  hidePopup() {
    // Hide the popup
    this.context.store.updateDownloaded = false;
  }

  render() {
    return (
      <Dialog
        actions={this.actions}
        active={this.context.store.updateDownloaded}
        onEscKeyDown={this.hidePopup.bind(this)}
        onOverlayClick={this.hidePopup.bind(this)}
        title="New Update Downloaded"
      >
        <p>
          We've downloaded a new update of Streamflow for you!
        </p>
        <p>
          You can choose to restart the app to install this now, or cancel to wait until next time.
        </p>
      </Dialog>
    );
  }
}

Updater.contextTypes = { store: PropTypes.object };

export default Updater;
