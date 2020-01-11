import React, { Component } from "react";

class ProductCard extends Component {
  renderImage() {
    if (this.props.product.image) {
      var imageClass = this.props.product.imageSmall ? " card-img-small" : "";

      return (
        <img
          src={this.props.product.image}
          className={"card-img-top " + imageClass}
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
        <div className="card product-card">
          {this.renderImage()}
          <div className="card-body">
            <h4 className="card-title text-center mt-2 font-weight-bold">
              {this.props.product.name}
            </h4>
            <p className="text-center mt-n2 text-monospace">
              {this.props.product.credits} Credits
            </p>
            <div className="text-center font-italic mt-4">
              {this.props.product.description}
            </div>

            {this.renderButton()}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
