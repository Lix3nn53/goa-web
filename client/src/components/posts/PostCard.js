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
      <div class="card mb-3">
        {this.renderImage()}
        <div class="card-body">
          <h5 class="card-title text-capitalize">
            <Link to={postLink} style={{ fontSize: "27px" }}>
              {this.props.title}
            </Link>
          </h5>
          <p class="card-text">
            This is a wider card with supporting text below as a natural lead-in
            to additional content. This content is a little bit longer.
          </p>
          <p class="card-text">
            <small>
              <span className="">
                <FontAwesomeIcon className="mr-1" icon={faPencilAlt} />
                {this.props.author}
              </span>
              <span className="px-2">
                <FontAwesomeIcon className="mr-1" icon={faCalendar} />
                {new Date(this.props.date).toDateString()}
              </span>
            </small>
          </p>
        </div>
      </div>
    );
  }
}

export default PostCard;
