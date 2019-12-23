import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCalendar } from "@fortawesome/free-solid-svg-icons";

class PostCard extends Component {
  renderImage() {
    if (this.props.image) {
      return <img className="card-img-top" src={this.props.image} alt="" />;
    }
  }

  renderTextPreview() {
    const limit = 240;

    if (this.props.text.length > limit) {
      const preview = this.props.text.substring(0, limit - 1);

      return preview + "...";
    }

    return this.props.text;
  }

  render() {
    const postLink = "post/" + this.props._id;

    return (
      <div className="card mb-4">
        {this.renderImage()}

        <div className="card-body">
          <div className="card-title text-capitalize">
            <h3>
              <u>
                <Link to={postLink}>{this.props.title}</Link>
              </u>
            </h3>
            <small>
              <a className="mx-2">
                <FontAwesomeIcon className="mr-2" icon={faPencilAlt} />
                {this.props.author}
              </a>
              <a className="mx-2">
                <FontAwesomeIcon className="mr-2" icon={faCalendar} />
                {this.props.date}
              </a>
            </small>
          </div>
          <p className="card-text mt-4 ml-2">{this.renderTextPreview()}</p>
        </div>
      </div>
    );
  }
}

export default PostCard;
