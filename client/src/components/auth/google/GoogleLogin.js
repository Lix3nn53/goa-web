import React, { useState } from "react";
import PropTypes from "prop-types";
import useGoogleLogin from "./useGoogleLogin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const GoogleLogin = (props) => {
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
    theme,
    disabled: disabledProp,
    onSuccess,
    clientId,
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

  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    clientId,
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

  const initialStyle = {
    backgroundColor: theme === "dark" ? "rgb(66, 133, 244)" : "#dd4b39",
    alignItems: "center",
    color: theme === "dark" ? "#fff" : "#e2ded3",
    padding: 0,
    border: "1px solid transparent",
  };

  const hoveredStyle = {
    color: theme === "dark" ? "#fff" : "#fff",
    cursor: "pointer",
    opacity: 0.9,
  };

  const activeStyle = {
    cursor: "pointer",
    backgroundColor: theme === "dark" ? "#3367D6" : "#eee",
    color: theme === "dark" ? "#fff" : "rgba(0, 0, 0, .54)",
    opacity: 1,
  };

  const defaultStyle = (() => {
    if (disabled) {
      return Object.assign({}, initialStyle, disabledStyle);
    }

    if (active) {
      if (theme === "dark") {
        return Object.assign({}, initialStyle, activeStyle);
      }

      return Object.assign({}, initialStyle, activeStyle);
    }

    if (hovered) {
      return Object.assign({}, initialStyle, hoveredStyle);
    }

    return initialStyle;
  })();
  const googleLoginButton = React.createElement(
    tag,
    {
      onMouseEnter: () => setHovered(true),
      onMouseLeave: () => {
        setHovered(false);
        setActive(false);
      },
      onMouseDown: () => setActive(true),
      onMouseUp: () => setActive(false),
      onClick: signIn,
      style: defaultStyle,
      type,
      disabled,
      className,
    },
    [
      <FontAwesomeIcon key={1} className="mr-2" icon={faGoogle} />,
      <span
        key={2}
        style={{
          paddingRight: 10,
          fontWeight: 500,
          paddingLeft: 10,
          paddingTop: 10,
          paddingBottom: 10,
        }}
      >
        {children || buttonText}
      </span>,
    ]
  );

  return (
    <button
      className={disabled ? "disabled " + className : className}
      onClick={signIn}
    >
      <FontAwesomeIcon key={1} className="mr-2" icon={faGoogle} />
      {children || buttonText}
    </button>
  );
};

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  clientId: PropTypes.string.isRequired,
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
  theme: PropTypes.string,
};

GoogleLogin.defaultProps = {
  type: "button",
  tag: "button",
  buttonText: "Sign in with Google",
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
  theme: "light",
  onRequest: () => {},
};

export default GoogleLogin;
