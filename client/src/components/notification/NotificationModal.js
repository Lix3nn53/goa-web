import $ from "jquery";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "store/actions";

class NotificationModal extends Component {
  componentDidUpdate() {
    $("#notificationModal").modal("show");
  }

  render() {
    switch (this.props.notificationModal) {
      case null:
        return <div />;
      case false:
        return <div />;
      default:
        return (
          <div
            className="modal fade"
            id="notificationModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="exampleModalCenterTitle"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalCenterTitle">
                    {this.props.notificationModal.type}
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className={"modal-body text-center"}>
                  {this.props.notificationModal.message}
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
    }
  }
}

function mapStateToProps({ notificationModal }) {
  return { notificationModal };
}

export default connect(mapStateToProps, actions)(NotificationModal);
