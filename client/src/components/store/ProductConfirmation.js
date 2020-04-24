import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ProductCard from "./ProductCard";
import { notifyModal, buyProduct } from "../../actions";
import Spinner from "../util/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import $ from "jquery";
import mojangAPI from "api/mojangAPI";

class ProductConfirmation extends Component {
  state = {
    name: "",
    uuid: "",
    skin: "",
  };

  componentDidMount() {
    this.getMinecraftUser();
  }

  async getMinecraftUser() {
    if (this.props.formValues.minecraftUsername) {
      const user = await mojangAPI.getMinecraftUser(
        this.props.formValues.minecraftUsername
      );

      const url = await mojangAPI.getMinecraftSkinURL(user.uuid);

      this.setState({
        name: user.name,
        uuid: user.uuid,
        skin: url,
      });
    }
  }

  async onConfirmation(formValues) {
    this.props.notifyModal(
      true,
      "secondary",
      <div>
        <Spinner />
        Please wait...
      </div>
    );

    if (!this.state.uuid) {
      this.props.notifyModal(true, "danger", "Minecraft user not found");
      return;
    }

    delete formValues.productSelection.description;
    delete formValues.productSelection.image;
    delete formValues.productSelection.name;
    delete formValues.productSelection.minecraftUsername;
    console.log(formValues);

    const requestString = Object.assign(
      { minecraftUuid: this.state.uuid },
      formValues
    );

    const res = await this.props.buyProduct(requestString);

    console.log(res);

    if (res.success) {
      this.props.notifyModal(true, "success", res.msg);
    } else {
      this.props.notifyModal(true, "danger", res.msg);
    }
  }

  showLoginModal() {
    $("#loginModal").modal("show");
  }

  render() {
    if (!this.props.auth) {
      return (
        <div className="container mw-100">
          <div className="row">
            <p className="mx-auto" role="status">
              You must be logged in to complete purchase.
            </p>
          </div>
          <div className="row">
            <button
              className="mt-4 btn mx-auto"
              href="#loginModal"
              onClick={this.showLoginModal}
            >
              <FontAwesomeIcon className="mr-2" icon={faSignInAlt} />
              Login
            </button>
          </div>
        </div>
      );
    }

    return (
      <section className="py-5">
        <div className="container mw-100">
          <div className="row">
            <ProductCard product={this.props.formValues.productSelection} />
          </div>
          <div className="row">
            <div className="col-lg-4 mx-auto" style={{ marginBottom: "1rem" }}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-center mt-2">
                    Minecraft Username
                  </h5>
                  <p className="text-center mt-n2">{this.state.name}</p>
                  <h5 className="card-title text-center mt-2">
                    Minecraft UUID
                  </h5>
                  <p className="text-center">{this.state.uuid}</p>
                  <h5 className="card-title text-center mt-2">
                    Minecraft Skin
                  </h5>
                  <img
                    width="512"
                    height="512"
                    src={this.state.skin}
                    style={{ imageRendering: "crisp-edges" }}
                    alt="..."
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <button
            className="btn btn-primary float-right btn-lg"
            type="submit"
            onClick={() => this.onConfirmation(this.props.formValues)}
          >
            Confirm!
          </button>
          <button
            className="btn btn-secondary btn-lg"
            type="button"
            variant="secondary"
            onClick={() => this.props.onCancel()}
          >
            Back
          </button>
        </div>
      </section>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default connect(mapStateToProps, { notifyModal, buyProduct })(
  withRouter(ProductConfirmation)
);
