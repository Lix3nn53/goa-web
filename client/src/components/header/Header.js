import React from "react";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import ButtonsOnRight from "./ButtonsOnRight";
import ButtonsOnLeft from "./ButtonsOnLeft";

import favicon from "assets/img/favicon.png";

function Header(props) {
  return (
    <nav id="header" className="navbar navbar-expand-lg mx-auto">
      <Link className="navbar-brand" to="/">
        <img src={favicon} alt="" className="img-fluid" />
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto navbar-left-buttons">
          <ButtonsOnLeft />
        </ul>

        <ul className="navbar-nav my-2 my-lg-0 navbar-right-buttons">
          <ButtonsOnRight />
        </ul>
      </div>
    </nav>
  );
}

export default withRouter(Header);
