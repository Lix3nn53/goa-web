import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { submitSurvey } from "store/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMailBulk } from "@fortawesome/free-solid-svg-icons";

class SurveyFormReview extends Component {
  render() {
    return (
      <div className="w-75 d-block mx-auto">
        <h5 className="text-success">Please confirm your entries</h5>

        <div key="title">
          <label>Survey title</label>
          <p className="border font-weight-normal bg-white rounded-lg">
            {this.props.formValues.title}
          </p>
        </div>
        <div key="subject">
          <label>Subject Line</label>
          <p className="border font-weight-normal bg-white rounded-lg">
            {this.props.formValues.subject}
          </p>
        </div>
        <div key="body">
          <label>Email body</label>
          <p className="border font-weight-normal bg-white rounded-lg">
            {this.props.formValues.body}
          </p>
        </div>
        <div key="recipients">
          <label>Recipients list</label>
          <p className="border font-weight-normal bg-white rounded-lg">
            {this.props.formValues.recipients}
          </p>
        </div>

        <div style={{ margin: "2rem" }}>
          <button
            className="btn btn-primary float-right"
            variant="primary"
            type="submit"
            onClick={() => {
              this.props.submitSurvey(
                this.props.formValues,
                this.props.history
              );
            }}
          >
            Send Survey{" "}
            <span>
              <FontAwesomeIcon icon={faMailBulk} />
            </span>
          </button>

          <button
            className="btn btn-secondary float-left"
            variant="secondary"
            onClick={this.props.onCancel}
          >
            Back
          </button>
        </div>
      </div>
    );
  }
}

export default connect(null, { submitSurvey })(withRouter(SurveyFormReview));
