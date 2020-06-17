import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Spinner from "components/util/Spinner";
import postAPI from "api/postAPI";

function SinglePostContentPage(props) {
  const [post, setPost] = useState(null);

  let location = useLocation();
  const postId = location.pathname.split("/")[2];

  useEffect(() => {
    async function fetchPost() {
      if (!postId) return;

      const post = await postAPI.getPost(postId);
      setPost(post);
    }

    fetchPost();
  }, [postId]);

  if (!post) {
    return <Spinner />;
  }

  const { title, text, author, image, dateSent } = post;

  const renderImage = () => {
    if (image) {
      return (
        <img className="img-fluid rounded mt-4 w-100" src={image} alt="" />
      );
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          {renderImage()}

          <h1 className="pt-2">{title}</h1>

          <small className="">
            Posted on {new Date(dateSent).toDateString()} by {author}
          </small>

          <hr />

          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}

export default SinglePostContentPage;
