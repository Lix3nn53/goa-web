import React, { useState, useEffect } from "react";

import { TwitterTimelineEmbed } from "react-twitter-embed";

import PostCard from "./PostCard";
import Pagination from "../util/Pagination";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

import postAPI from "api/postAPI";

function PostsList(props) {
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const pageLimit = 3;
  const pageNeighbours = 1;

  useEffect(() => {
    async function fetchPostList() {
      const data = await postAPI.fetchPosts(currentPage, pageLimit);

      setCurrentPosts(data.currentResults);
      setTotalPosts(data.totalResults);
      setTotalPages(Math.ceil(data.totalResults / pageLimit));
    }

    fetchPostList();
  }, [currentPage, pageLimit]);

  const onPageChanged = async (page) => {
    setCurrentPage(page);
  };

  const renderPosts = () => {
    if (!currentPosts) return null;

    const headerClass = [
      "m-0",
      currentPage ? "px-2 border-light border-right" : "",
    ]
      .join(" ")
      .trim();

    return (
      <div>
        <div className="post-list">
          {currentPosts.map((post) => (
            <PostCard
              title={post.title}
              text={post.text}
              date={post.dateSent}
              author={post.author}
              image={post.image}
              _id={post._id}
              key={post._id}
            />
          ))}
        </div>
        <div className="w-100 d-flex flex-row flex-wrap align-items-center justify-content-between">
          <div className="d-flex flex-row mb-2 align-items-center">
            <div className={headerClass}>
              <strong>{totalPosts}</strong> Posts
            </div>

            {currentPage && (
              <span className="current-page d-inline-block h-100 pl-2">
                Page <span className="font-weight-bold">{currentPage}</span> /{" "}
                <span className="font-weight-bold">{totalPages}</span>
              </span>
            )}
          </div>

          <div className="d-flex flex-row align-items-center">
            <Pagination
              totalRecords={totalPosts}
              totalPages={totalPages}
              currentPage={currentPage}
              pageNeighbours={pageNeighbours}
              onPageChanged={onPageChanged}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="row">
      <div className="col-lg-8">
        <h1 className="text-center pb-4 font-weight-bold">Latest Posts</h1>

        {renderPosts()}
      </div>

      <div className="col-lg-4">
        <h1 className="text-center pb-4 font-weight-bold">
          <FontAwesomeIcon icon={faTwitter} />
        </h1>
        <article className="h-75">
          <TwitterTimelineEmbed
            sourceType="profile"
            screenName="loykAd"
            options={{ height: 640 }}
            lang="en"
          />
        </article>
      </div>
    </div>
  );
}

export default PostsList;
