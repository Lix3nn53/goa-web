import React from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faBook, faStore } from "@fortawesome/free-solid-svg-icons";
import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";

function ButtonsOnLeft(props) {
  let location = useLocation();
  const path = location.pathname.split("/")[1];

  return [
    <li className="nav-item" key="9">
      <Link className={path === "" ? "nav-link active" : "nav-link"} to="/">
        <FontAwesomeIcon className="mx-1" icon={faHome} />
        Home
      </Link>
    </li>,
    <li className="nav-item" key="8">
      <a
        className="nav-link"
        rel="noopener noreferrer"
        href="https://guardiansofadelia.fandom.com/wiki/GuardiansOfAdelia_Wiki"
        target="_blank"
      >
        <FontAwesomeIcon className="mx-1" icon={faWikipediaW} />
        Wiki
      </a>
    </li>,
    <li className="nav-item" key="7">
      <Link
        className={path === "lore" ? "nav-link active" : "nav-link"}
        to="/lore"
      >
        <FontAwesomeIcon className="mx-1" icon={faBook} />
        Lore
      </Link>
    </li>,
    <li className="nav-item" key="6">
      <Link
        className={
          path === "store"
            ? "nav-link active text-warning"
            : "nav-link text-warning"
        }
        to="/store"
      >
        <FontAwesomeIcon className="mx-1" icon={faStore} />
        Store
      </Link>
    </li>,
  ];
}

export default React.memo(ButtonsOnLeft);
