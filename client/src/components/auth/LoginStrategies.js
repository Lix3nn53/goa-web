import React from "react";
import { useSelector } from "react-redux";
import authAPI from "api/authAPI";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faTwitter,
  faFacebook,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import keys from "config/keys";
import OAuth2 from "./OAuth2";

const LoginStrategies = () => {
  const auth = useSelector((state) => state.auth);

  if (auth) {
    return <p>You are already logged in</p>;
  }

  return (
    <div className="mx-auto text-center">
      <div className="row">
        <OAuth2
          authUrl="https://accounts.google.com/o/oauth2/v2/auth"
          parameters={{
            client_id: keys.googleClientID,
            redirect_uri: keys.oAuth2RedirectUri,
            response_type: "code",
            scope: "profile email",
            prompt: "select_account",
            include_granted_scopes: true,
            state: "myteststate123",
          }}
          className="col mx-4 nav-link btn login login-google"
          buttonText="Login with Google"
          icon={<FontAwesomeIcon key={1} className="mr-2" icon={faGoogle} />}
          onCallback={async (params) => {
            console.log("Google", params);
            const auth_res = await authAPI.googleAuth(params);

            if (auth_res.success) {
              window.location.href = "/";
            }
          }}
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
        <OAuth2
          authUrl="https://www.facebook.com/v8.0/dialog/oauth"
          parameters={{
            client_id: keys.facebookAppID,
            redirect_uri: keys.oAuth2RedirectUri,
            state: "myteststate123",
          }}
          className="col mx-4 nav-link btn login login-facebook"
          buttonText="Login with Facebook"
          icon={<FontAwesomeIcon key={1} className="mr-2" icon={faFacebook} />}
          onCallback={async (params) => {
            const auth_res = await authAPI.facebookAuth(params);

            if (auth_res.success) {
              window.location.href = "/";
            }
          }}
        />
      </div>
    </div>
  );
};

export default LoginStrategies;
