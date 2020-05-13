import React, { Component } from "react";
import { connect } from "react-redux";
import EmailForm from "components/forms/EmailForm";
import Spinner from "components/util/Spinner";
import { notifyModal } from "store/actions";
import authAPI from "api/authAPI";

class VerifyPage extends Component {
  constructor(props) {
    super(props);

    this.resendConfirmationMail = this.resendConfirmationMail.bind(this);
  }

  async resendConfirmationMail() {
    this.props.notifyModal(true, "Please wait", "");

    const res = await authAPI.resendConfirmationMail();

    if (res.success) {
      this.props.notifyModal(
        true,
        "Success",
        "We sent you a new activation email."
      );
    } else {
      var errorMessage = "Failed";
      if (res.errorMessage) errorMessage = res.errorMessage;
      this.props.notifyModal(true, "Danger", errorMessage);
    }
  }

  render() {
    if (!this.props.auth) {
      return (
        <div className="col mt-4">
          <Spinner />
        </div>
      );
    } else if (!this.props.auth.verified) {
      return (
        <div className="container">
          <div className="row">
            <div className="col mt-4">
              <div className="card">
                <div className="card-header">Verify</div>
                <div className="card-body">
                  <p>{this.props.auth.email}</p>
                  We sent you a very awesome email called "Activate your GoA
                  account" to the email address above. To activate your account,
                  find that email in your inbox and click the button that says
                  "Activate your account".
                  <div className="mt-4 text-right">
                    <button
                      className="btn btn-primary"
                      onClick={this.resendConfirmationMail}
                    >
                      Resend Confirmation
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col mt-4">
              <div className="card">
                <div className="card-header">Change Your Email</div>
                <div className="card-body">
                  Not you? Wrong email? No problem, let’s just update it and
                  everything will be fine.
                  <EmailForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="col mt-4">
          <p className="text-center">Gratz! Your account is verified.</p>
        </div>
      );
    }
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { notifyModal })(VerifyPage);
