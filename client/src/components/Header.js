import React, { Component } from "react";
import Spinner from "./util/Spinner";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBook,
  faStore,
  faCoins,
  faUser,
  faSignOutAlt,
  faTools,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { faWikipediaW } from "@fortawesome/free-brands-svg-icons";
import $ from "jquery";
import LoginModal from "./modals/LoginModal";
import RegisterModal from "./modals/RegisterModal";
import axios from "axios";
import { fetchUser } from "actions";

class Header extends Component {
  state = {
    active: 9,
  };

  async logout() {
    try {
      console.log(1);

      const refreshToken = localStorage.getItem("refreshToken");

      await axios.get("/api/logout", {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });

      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");

      this.props.fetchUser();
      this.props.history.push("/");
    } catch (error) {
      this.props.fetchUser();
      this.props.history.push("/");
    }
  }

  handleClick(id) {
    this.setState({ active: id });
  }

  componentDidUpdate() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  renderButtonsOnLeft() {
    const header = [
      <li
        className={this.state.active === 9 ? "nav-item active" : "nav-item"}
        key="9"
        onClick={() => this.handleClick(9)}
      >
        <Link className="nav-link text-light" to="/">
          <FontAwesomeIcon className="mx-1" icon={faHome} />
          Home
        </Link>
      </li>,
      <li className="nav-item" key="8">
        <a
          className="nav-link text-light"
          rel="noopener noreferrer"
          href="https://guardiansofadelia.fandom.com/wiki/GuardiansOfAdelia_Wiki"
          target="_blank"
        >
          <FontAwesomeIcon className="mx-1" icon={faWikipediaW} />
          wiki
        </a>
      </li>,
      <li
        className={this.state.active === 7 ? "nav-item active" : "nav-item"}
        key="7"
        onClick={() => this.handleClick(7)}
      >
        <Link className="nav-link text-light" to="/lore">
          <FontAwesomeIcon className="mx-1" icon={faBook} />
          Lore
        </Link>
      </li>,
      <li
        className={this.state.active === 6 ? "nav-item active" : "nav-item"}
        key="6"
        onClick={() => this.handleClick(6)}
      >
        <Link className="nav-link text-warning" to="/store">
          <FontAwesomeIcon className="mx-1" icon={faStore} />
          Store
        </Link>
      </li>,
    ];

    return header;
  }

  showLoginModal() {
    $("#loginModal").modal("show");
  }

  showRegisterModal() {
    $("#registerModal").modal("show");
  }

  renderButtonsOnRight() {
    switch (this.props.auth) {
      case null:
        return <Spinner />;
      case false:
        return [
          <li className="nav-item" key="11">
            <a
              className="nav-link text-light"
              href="#registerModal"
              onClick={this.showRegisterModal}
            >
              <FontAwesomeIcon className="mr-2" icon={faUserPlus} />
              Register
            </a>
          </li>,
          <li className="nav-item" key="10">
            <a
              className="nav-link text-light"
              href="#loginModal"
              onClick={this.showLoginModal}
            >
              <FontAwesomeIcon className="mr-2" icon={faSignInAlt} />
              Login
            </a>
          </li>,
        ];
      default:
        const header = [
          <li
            className={this.state.active === 4 ? "nav-item active" : "nav-item"}
            key="4"
            onClick={() => this.handleClick(4)}
            title="Click to add credits!"
            data-toggle="tooltip"
            data-placement="bottom"
          >
            <Link className="nav-link text-light" to="/addcredit">
              <FontAwesomeIcon className="mx-1 text-warning" icon={faCoins} />
              <span className="text-warning">Credits:</span>{" "}
              {this.props.auth.credits}
            </Link>
          </li>,
          <li
            className={this.state.active === 3 ? "nav-item active" : "nav-item"}
            key="3"
            onClick={() => this.handleClick(3)}
          >
            <Link className="nav-link text-light" to="/profile">
              <FontAwesomeIcon className="mx-1" icon={faUser} />
              Profile
            </Link>
          </li>,
          <li className="nav-item" key="2">
            <a
              className="nav-link text-light"
              href="#root"
              onClick={() => this.logout()}
            >
              <FontAwesomeIcon className="mx-1" icon={faSignOutAlt} />
              Logout
            </a>
          </li>,
        ];

        if (this.props.auth.role === "admin") {
          header.push(
            <li
              className={
                this.state.active === 1 ? "nav-item active" : "nav-item"
              }
              key="1"
              onClick={() => this.handleClick(1)}
            >
              <Link className="nav-link text-light" to="/admin">
                <FontAwesomeIcon className="mx-1" icon={faTools} />
                Admin
              </Link>
            </li>
          );
        }

        return header;
    }
  }

  render() {
    console.log(this.props.auth);

    return (
      <nav id="header" className="navbar navbar-expand-lg navbar-light mx-auto">
        <Link
          className="navbar-brand"
          to={"/"}
          onClick={() => this.handleClick(9)}
        >
          <img src="https://i.ibb.co/TgQ2z1w/favicon.png" alt="" className="" />
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
            {this.renderButtonsOnLeft()}
          </ul>

          <ul className="navbar-nav my-2 my-lg-0 navbar-right-buttons">
            {this.renderButtonsOnRight()}
          </ul>
        </div>
        <LoginModal />
        <RegisterModal />
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { fetchUser })(withRouter(Header));
