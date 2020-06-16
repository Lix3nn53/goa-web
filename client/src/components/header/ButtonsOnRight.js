import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import authAPI from "api/authAPI";

import Spinner from "../util/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faUser,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

function ButtonsOnRight(props) {
  const auth = useSelector((state) => state.auth);

  let location = useLocation();
  const path = location.pathname.split("/")[1];

  const logout = async () => {
    authAPI.logout();

    window.location.reload(false);
  };

  switch (auth) {
    case null:
      return <Spinner />;
    case false:
      return [
        <li className="nav-item" key="2">
          <Link
            className={path === "register" ? "nav-link active" : "nav-link"}
            to="/register"
          >
            <FontAwesomeIcon className="mr-2" icon={faUserPlus} />
            Register
          </Link>
        </li>,
        <li className="nav-item" key="1">
          <Link
            className={path === "login" ? "nav-link active" : "nav-link"}
            to="/login"
          >
            <FontAwesomeIcon className="mr-2" icon={faSignInAlt} />
            Login
          </Link>
        </li>,
      ];
    default:
      const header = [
        <li className="nav-item" key="3">
          <Link
            className={
              path === "addcredit"
                ? "nav-link active text-warning"
                : "nav-link text-warning"
            }
            to="/addcredit"
          >
            <FontAwesomeIcon className="mx-1" icon={faCoins} />
            <span>Credits:</span> {auth.credits}
          </Link>
        </li>,
        <li className="nav-item" key="2">
          <Link
            className={path === "profile" ? "nav-link active" : "nav-link"}
            to="/profile"
          >
            <FontAwesomeIcon className="mx-1" icon={faUser} />
            Profile
          </Link>
        </li>,
        <li className="nav-item" key="1">
          <a className="nav-link" href="#root" onClick={() => logout()}>
            <FontAwesomeIcon className="mx-1" icon={faSignOutAlt} />
            Logout
          </a>
        </li>,
      ];

      return header;
  }
}

export default React.memo(ButtonsOnRight);
