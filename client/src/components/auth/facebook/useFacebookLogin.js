import { useState, useEffect, useCallback } from "react";
import loadScript from "../load-script";
import removeScript from "../remove-script";

const useFacebookLogin = ({
  onSuccess,
  appId,
  autoLogAppEvents,
  xfbml,
  version,
  cookiePolicy,
  loginHint,
  hostedDomain,
  autoLoad,
  isSignedIn,
  fetchBasicProfile,
  redirectUri,
  discoveryDocs,
  onFailure,
  uxMode,
  scope,
  accessType,
  responseType,
  jsSrc = "https://connect.facebook.net/en_US/sdk.js",
  onRequest,
  prompt,
}) => {
  const [loaded, setLoaded] = useState(false);

  const handleSigninSuccess = useCallback(
    (res) => {
      /*
      offer renamed response keys to names that match use
    */
      const basicProfile = res.getBasicProfile();
      const authResponse = res.getAuthResponse();
      res.googleId = basicProfile.getId();
      res.tokenObj = authResponse;
      res.tokenId = authResponse.id_token;
      res.accessToken = authResponse.access_token;
      res.profileObj = {
        googleId: basicProfile.getId(),
        imageUrl: basicProfile.getImageUrl(),
        email: basicProfile.getEmail(),
        name: basicProfile.getName(),
        givenName: basicProfile.getGivenName(),
        familyName: basicProfile.getFamilyName(),
      };
      onSuccess(res);
    },
    [onSuccess]
  );

  const signIn = useCallback(
    (e) => {
      if (e) {
        e.preventDefault(); // to prevent submit if used within form
      }
      if (loaded) {
        window.FB.login(
          function (response) {
            console.log(response);
            if (response.authResponse) {
              console.log("Welcome!  Fetching your information.... ");
              window.FB.api("/me", { fields: "id,name,email" }, function (
                response
              ) {
                console.log(response);
                console.log("Good to see you, " + response.name + ".");
              });
            } else {
              console.log("User cancelled login or did not fully authorize.");
            }
          },
          {
            scope: "public_profile,email",
            return_scopes: true,
            auth_type: "reauthenticate",
          }
        );
      }
    },
    [
      loaded,
      onFailure,
      onRequest,
      onSuccess,
      prompt,
      responseType,
      handleSigninSuccess,
    ]
  );

  useEffect(() => {
    let unmounted = false;
    loadScript(document, "script", "facebook-login", jsSrc, () => {
      const params = {
        appId: appId,
        autoLogAppEvents: autoLogAppEvents,
        xfbml: xfbml,
        version: version,
        crossorigin: "anonymous",
        cookie_policy: cookiePolicy,
        login_hint: loginHint,
        hosted_domain: hostedDomain,
        fetch_basic_profile: fetchBasicProfile,
        discoveryDocs,
        ux_mode: uxMode,
        redirect_uri: redirectUri,
        scope,
        access_type: accessType,
      };

      if (responseType === "code") {
        params.access_type = "offline";
      }

      window.fbAsyncInit = function () {
        window.FB.init(params);
        setLoaded(true);
      };
    });

    return () => {
      unmounted = true;
      removeScript(document, "facebook-login");
    };
  }, [
    accessType,
    appId,
    cookiePolicy,
    discoveryDocs,
    fetchBasicProfile,
    handleSigninSuccess,
    hostedDomain,
    isSignedIn,
    jsSrc,
    loginHint,
    onFailure,
    redirectUri,
    responseType,
    scope,
    uxMode,
  ]);

  useEffect(() => {
    if (autoLoad) {
      signIn();
    }
  }, [loaded, autoLoad, signIn]);

  return { signIn, loaded };
};

export default useFacebookLogin;
