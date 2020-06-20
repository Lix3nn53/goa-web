import React from "react";
import PropTypes from "prop-types";

function IyzipayModal(props) {
  const { iyzipayHtml } = props;

  return (
    <div
      className="modal fade"
      id="iyzipayModal"
      tabIndex="-1"
      role="dialog"
      aria-labelledby="iyzipayModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-xl" role="document">
        <div className="modal-content">
          <div className="modal-body embed-responsive embed-responsive-16by9">
            <iframe
              title="paymentFrame"
              className="embed-responsive-item"
              src={"data:text/html;charset=utf-8," + iyzipayHtml}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IyzipayModal;

IyzipayModal.propTypes = {
  iyzipayHtml: PropTypes.object.isRequired,
};
