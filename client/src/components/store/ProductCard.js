import React, { Component } from "react";

class ProductCard extends Component {
  renderImage() {
    if (this.props.product.image) {
      return (
        <img
          src={this.props.product.image}
          className="card-img-top"
          alt="..."
        ></img>
      );
    }
  }

  renderButton() {
    if (this.props.onFormSubmit) {
      return (
        <button
          className="btn btn-primary float-right mt-2"
          type="submit"
          onClick={() => this.props.onFormSubmit(this.props.product)}
        >
          Get it now!
        </button>
      );
    }
  }

  render() {
    return (
      <div
        className="col-lg-4 mx-auto"
        key={this.props.product.name}
        style={{ marginBottom: "1rem" }}
      >
        <div className="card">
          {this.renderImage()}
          <div className="card-body">
            <h5 className="card-title text-center mt-2">
              {this.props.product.name}
            </h5>
            <p className="text-center mt-n2 text-monospace">
              {this.props.product.credits} Credits
            </p>
            <p className="text-center font-italic mt-4">
              {this.props.product.description}
            </p>

            {this.renderButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
