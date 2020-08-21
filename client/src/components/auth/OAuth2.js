import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import oAuth2WindowHandler from "./oAuth2WindowHandler";

const { openSignInWindow } = oAuth2WindowHandler;

const OAuth2 = (props) => {
  const [paramaterString, setParamaterString] = useState(null);

  const {
    authUrl,
    parameters,
    className,
    onCallback,
    buttonText,
    icon,
    disabled,
  } = props;

  // create paramater string to use at url from paramaters obj
  useEffect(() => {
    var paramatersTmp = "";

    var keys = Object.keys(parameters);

    for (var i = 0; i < keys.length; i++) {
      var prefix = "&";
      if (i === 0) prefix = "?";

      paramatersTmp += prefix + keys[i] + "=" + parameters[keys[i]];
    }

    setParamaterString(paramatersTmp);

    console.log(paramaterString);
  }, [parameters, paramaterString]);

  return (
    <button
      className={disabled ? "disabled " + className : className}
      onClick={() =>
        openSignInWindow(authUrl + paramaterString, "oauth", onCallback)
      }
    >
      {icon}
      {buttonText}
    </button>
  );
};

export default OAuth2;

OAuth2.propTypes = {
  authUrl: PropTypes.string.isRequired,
  parameters: PropTypes.object.isRequired,
  buttonText: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  onCallback: PropTypes.func.isRequired,
  icon: PropTypes.object,
  disabled: PropTypes.bool,
};
