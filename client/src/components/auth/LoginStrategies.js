import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import GoogleLogin from "./google/GoogleLogin";
import FacebookLogin from "./facebook/FacebookLogin";
import authAPI from "api/authAPI";
import keys from "config/keys";

const LoginStrategies = (props) => {
  const [loginError, setLoginError] = useState(undefined);

  const auth = useSelector((state) => state.auth);

  if (auth) {
    return <p>You are already logged in</p>;
  }

  const responseGoogle = async (res) => {
    const authCode = res.code;

    const auth = await authAPI.googleAuth(authCode);

    if (auth.success) {
      window.location.href = "/";
    } else {
      setLoginError(auth.errorMessage);
    }
  };

  return (
    <div className="mx-auto text-center">
      <div className="row">
        <GoogleLogin
          className="col mx-4 nav-link btn login login-google"
          clientId={keys.googleClientID}
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          prompt="select_account"
          accessType="offline"
          responseType="code"
        />
        <a className="col mx-4 nav-link" href="/auth/github">
          <FontAwesomeIcon className="mr-2" icon={faGithub} />
          Login with GitHub
        </a>
      </div>
      <div className="row mt-2">
        <a className="col mx-4 nav-link" href="/auth/twitter">
          <FontAwesomeIcon className="mr-2" icon={faTwitter} />
          Login with Twitter
        </a>
        <FacebookLogin
          className="col mx-4 nav-link btn login login-facebook"
          appId={keys.facebookAppID}
          buttonText="Login with Facebook"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          prompt="select_account"
          accessType="offline"
          responseType="code"
        />
      </div>
    </div>
  );
};

export default LoginStrategies;
