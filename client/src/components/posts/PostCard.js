import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCalendar } from "@fortawesome/free-solid-svg-icons";

class PostCard extends Component {
  renderImage() {
    if (this.props.image) {
      return (
        <img
          className="fluid-image rounded-left"
          src={this.props.image}
          alt=""
        />
      );
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
      <div className="card post-card mb-4 flex-row">
        {this.renderImage()}

        <div className="card-body">
          <div className="card-title text-capitalize">
            <div className="post-title">
              <Link to={postLink}>{this.props.title}</Link>
            </div>
          </div>
          <small>
            <span className="px-2">
              <FontAwesomeIcon className="mr-2" icon={faPencilAlt} />
              {this.props.author}
            </span>
            <span className="px-2">
              <FontAwesomeIcon className="mr-2" icon={faCalendar} />
              {new Date(this.props.date).toDateString()}
            </span>
          </small>
          <p className="card-text pt-4">{this.renderTextPreview()}</p>
        </div>
      </div>
    );
  }
}

export default PostCard;
