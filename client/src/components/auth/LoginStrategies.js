import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGoogle,
  faGithub,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import GoogleLogin from "./google/GoogleLogin";
import { fetchUser } from "actions";
import authAPI from "api/authAPI";

class LoginStrategies extends Component {
  constructor(props) {
    super(props);

    this.responseGoogle = this.responseGoogle.bind(this);
  }

  async responseGoogle(res) {
    const authCode = res.code;

    const auth = await authAPI.googleAuth(authCode);

    if (auth.success) {
      this.props.fetchUser();
      this.props.history.push("/");
      window.location.reload(false);
    } else {
      this.setState({ loginError: auth.errorMessage });
      this.props.history.push("/login");
    }
  }

  render() {
    if (this.props.auth) {
      return <p>You are already logged in</p>;
    }
    return (
      <>
        <div className="row">
          <a
            className="col mx-4 nav-link login login-google"
            href="/auth/google"
          >
            <FontAwesomeIcon className="mr-2" icon={faGoogle} />
            Login with Google
          </a>
          <GoogleLogin
            clientId="113424365961-tlr4vbu3hgldcmn0if70o0il8sb1v13e.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={this.responseGoogle}
            onFailure={this.responseGoogle}
            cookiePolicy={"single_host_origin"}
            prompt="select_account"
            accessType="offline"
            responseType="code"
          />
          <a
            className="col mx-4 nav-link login login-github"
            href="/auth/github"
          >
            <FontAwesomeIcon className="mr-2" icon={faGithub} />
            Login with GitHub
          </a>
        </div>
        <div className="row mt-2">
          <a
            className="col mx-4 nav-link login login-twitter"
            href="/auth/twitter"
          >
            <FontAwesomeIcon className="mr-2" icon={faTwitter} />
            Login with Twitter
          </a>
          <a
            className="col mx-4 nav-link login login-facebook"
            href="/auth/facebook"
          >
            <FontAwesomeIcon className="mr-2" icon={faFacebook} />
            Login with Facebook
          </a>
        </div>
      </>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(
  withRouter(LoginStrategies)
);
