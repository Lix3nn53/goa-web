import React, { useState } from "react";
import PropTypes from "prop-types";
import useFacebookLogin from "./useFacebookLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";

const FacebookLogin = (props) => {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const {
    tag,
    type,
    className,
    disabledStyle,
    buttonText,
    children,
    render,
    disabled: disabledProp,
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
    jsSrc,
    onRequest,
    prompt,
  } = props;

  const { signIn, loaded } = useFacebookLogin({
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
    jsSrc,
    onRequest,
    prompt,
  });
  const disabled = disabledProp || !loaded;

  if (render) {
    return render({ onClick: signIn, disabled });
  }

  return (
    <btn
      className={disabled ? "disabled " + className : className}
      onClick={signIn}
    >
      <FontAwesomeIcon key={1} className="mr-2" icon={faFacebook} />
      {children || buttonText}
    </btn>
  );
};

FacebookLogin.propTypes = {
  appId: PropTypes.string.isRequired,
  autoLogAppEvents: PropTypes.bool,
  xfbml: PropTypes.bool,
  version: PropTypes.string,
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  jsSrc: PropTypes.string,
  onRequest: PropTypes.func,
  buttonText: PropTypes.node,
  scope: PropTypes.string,
  className: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  children: PropTypes.node,
  disabledStyle: PropTypes.object,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  tag: PropTypes.string,
  autoLoad: PropTypes.bool,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  uxMode: PropTypes.string,
  isSignedIn: PropTypes.bool,
  responseType: PropTypes.string,
  type: PropTypes.string,
  accessType: PropTypes.string,
  render: PropTypes.func,
};

FacebookLogin.defaultProps = {
  autoLogAppEvents: true,
  xfbml: true,
  version: "v8.0",
  type: "button",
  tag: "button",
  buttonText: "Sign in with Facebook",
  scope: "profile email",
  accessType: "online",
  prompt: "",
  cookiePolicy: "single_host_origin",
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: "popup",
  disabledStyle: {
    opacity: 0.6,
  },
  onRequest: () => {},
};

export default FacebookLogin;
