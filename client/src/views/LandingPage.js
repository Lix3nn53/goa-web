import React, { useEffect } from "react";
import PostList from "components/posts/PostList";
import $ from "jquery";

function LandingPage(props) {
  useEffect(() => {
    $('[data-toggle="tooltip"]').tooltip();
  });

  const copyToClipboard = (str) => {
    const el = document.createElement("textarea"); // Create a <textarea> element
    el.value = str; // Set its value to the string that you want copied
    el.setAttribute("readonly", ""); // Make it readonly to be tamper-proof
    el.style.position = "absolute";
    el.style.left = "-9999px"; // Move outside the screen to make it invisible
    document.body.appendChild(el); // Append the <textarea> element to the HTML document
    /*
    const selected =
      document.getSelection().rangeCount > 0 // Check if there is any content selected previously
        ? document.getSelection().getRangeAt(0) // Store selection if found
        : false; // Mark as false to know no selection existed before
    */
    el.select(); // Select the <textarea> content
    document.execCommand("copy"); // Copy - only works as a result of a user action (e.g. click events)
    document.body.removeChild(el); // Remove the <textarea> element
  };

  return (
    <div>
      <div
        className="container-fluid intro"
        style={{
          paddingTop: "4rem",
          paddingBottom: "12rem",
          backgroundImage:
            "url('https://i.ibb.co/h91KmMf/Optimized-2019-11-06-18-23-12.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
        }}
      >
        <div className="row">
          <div className="col text-center">
            <img
              className="img-fluid"
              src="https://i.ibb.co/SmnMm5L/logo.png"
              alt="logo"
            />
          </div>
        </div>

        <div className="row mt-5">
          <div className="col text-center">
            <button
              className="btn landing-btn font-weight-bold"
              title="Click to copy server adress!"
              data-toggle="tooltip"
              data-placement="right"
              onClick={() => copyToClipboard("play.guardiansofadelia.com")}
            >
              START YOUR JOURNEY
            </button>
          </div>
        </div>

        <div className="row mb-5">
          <p className="col text-center text-light">
            play.guardiansofadelia.com
          </p>
        </div>
      </div>

      <div className="container mt-4">
        <PostList />
      </div>
    </div>
  );
}

export default LandingPage;
