import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faCalendar } from "@fortawesome/free-solid-svg-icons";

function PostCard(props) {
  const { _id, title, text, image, author, date } = props;

  const renderImage = () => {
    if (image) {
      return (
        <div className="embed-responsive embed-responsive-16by9">
          <img
            className="card-img-top embed-responsive-item"
            src={image}
            alt=""
          />
        </div>
      );
    }
  };

  const renderTextPreview = () => {
    const limit = 240;

    if (text && text.length > limit) {
      const preview = text.substring(0, limit - 1);

      return preview + "...";
    }

    return text;
  };

  const postLink = "post/" + _id;

  return (
    <div className="card mb-3">
      {renderImage()}
      <div className="card-body">
        <h5 className="card-title text-capitalize">
          <Link to={postLink} style={{ fontSize: "27px" }}>
            {title}
          </Link>
        </h5>
        <p className="card-text">{renderTextPreview()}</p>
        <p className="card-text">
          <small>
            <span className="">
              <FontAwesomeIcon className="mr-1" icon={faPencilAlt} />
              {author}
            </span>
            <span className="px-2">
              <FontAwesomeIcon className="mr-1" icon={faCalendar} />
              {new Date(date).toDateString()}
            </span>
          </small>
        </p>
      </div>
    </div>
  );
}

export default PostCard;

PostCard.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string,
  text: PropTypes.string,
  image: PropTypes.string,
  author: PropTypes.string,
  date: PropTypes.string,
};
