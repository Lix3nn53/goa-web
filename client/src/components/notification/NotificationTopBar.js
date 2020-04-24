import $ from "jquery";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../actions";

class NotificationTopBar extends Component {
  showAlert() {
    $("#notify-topbar").removeClass("d-none");
  }

  hideAlert() {
    $("#notify-topbar").addClass("d-none");
  }

  componentDidUpdate() {
    this.showAlert();
  }

  render() {
    if (!this.props.notificationTopBar) {
      return <div />;
    }

    switch (this.props.notificationTopBar.isVisible) {
      case null:
        return <div />;
      case false:
        return <div />;
      default:
        const alertType = "alert-" + this.props.notificationTopBar.type; //bootstrap alert, eight required contextual classes to define color

        return (
          <div
            className={"notify-topbar alert text-center " + alertType}
            role="alert"
            id="notify-topbar"
          >
            {this.props.notificationTopBar.message}
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={this.hideAlert}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        );
    }
  }
}

function mapStateToProps({ notificationTopBar }) {
  return { notificationTopBar };
}

export default connect(mapStateToProps, actions)(NotificationTopBar);
