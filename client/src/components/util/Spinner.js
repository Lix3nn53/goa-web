import React, { Component } from "react";

class Spinner extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="spinner-border mx-auto" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Spinner;
