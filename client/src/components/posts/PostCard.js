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

    if (this.props.text && this.props.text.length > limit) {
      const preview = this.props.text.substring(0, limit - 1);

      return preview + "...";
    }

    return this.props.text;
  }

  render() {
    const postLink = "post/" + this.props._id;

    return (
      <div className="card bg-light text-dark mb-4">
        {this.renderImage()}

        <div className="card-body">
          <div className="card-title text-capitalize">
            <div className="post-title">
              <Link to={postLink} style={{ fontSize: "27px" }}>
                {this.props.title}
              </Link>
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
          </div>

          <p className="card-text">{this.renderTextPreview()}</p>
        </div>
      </div>
    );
  }
}

export default PostCard;
