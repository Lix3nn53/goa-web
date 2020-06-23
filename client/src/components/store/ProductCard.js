import React, { Component } from "react";

class ProductCard extends Component {
  renderImage() {
    if (this.props.product.image) {
      return (
        <div className="embed-responsive embed-responsive-4by3">
          <img
            src={this.props.product.image}
            className="card-img-top  embed-responsive-item"
            alt="..."
          />
        </div>
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
      <div className="col-lg-4 mx-auto mb-4" key={this.props.product.name}>
        <div className="card">
          {this.renderImage()}
          <div className="card-body">
            <h4 className="card-title text-center font-weight-bold">
              {this.props.product.name}
            </h4>
            <p className="text-center text-monospace">
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
