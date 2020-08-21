import React, { useEffect } from "react";

const OAuth2Callback = (props) => {
  useEffect(() => {
    // get the URL parameters which will include the auth token
    const params = window.location.search;
    console.log(params);
    if (window.opener) {
      // send them to the opening window
      window.opener.postMessage(params);
      // close the popup
      window.close();
    }
  });

  return <p>Redirecting...</p>;
};

export default OAuth2Callback;
