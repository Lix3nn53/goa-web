import React, { Component } from "react";

class CreditSelectionCard extends Component {
  renderButton() {
    if (this.props.onFormSubmit) {
      return (
        <button
          className="btn btn-block btn-primary text-uppercase"
          onClick={() => this.props.onFormSubmit(this.props.creditSelection)}
        >
          Purchase
        </button>
      );
    }
  }

  render() {
    return (
      <div
        className="col-lg-4"
        key={this.props.creditSelection.name}
        style={{ marginBottom: "1rem" }}
      >
        <div
          className="card mb-5 mb-lg-0"
          style={{ backgroundColor: "transparent" }}
        >
          <img
            src={this.props.creditSelection.icon}
            className="card-img-top card-img-small"
            alt="..."
          ></img>
          <div className="card-body">
            <h5 className="card-title text-center">
              ${this.props.creditSelection.price} for
            </h5>
            <h1 className="card-price text-center">
              {this.props.creditSelection.name}
            </h1>
            <p className="text-center font-italic">
              {this.props.creditSelection.description}
            </p>

            {this.renderButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default CreditSelectionCard;
