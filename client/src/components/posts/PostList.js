import React, { Component } from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import PostCard from "./PostCard";
import { connect } from "react-redux";
import { fetchPosts } from "store/actions";
import Pagination from "../util/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

class PostsList extends Component {
  state = {
    totalPosts: 0,
    totalPages: 0,
    currentPosts: [],
    currentPage: null,
    pageLimit: 3,
    pageNeighbours: 1,
  };

  async componentDidMount() {
    const { pageLimit } = this.state;
    const currentPage = 1;

    await this.props.fetchPosts(currentPage, pageLimit); //wait for async method to complete so this.props.posts at next lines is not null

    const currentPosts = this.props.posts.currentResults;
    const totalPosts = this.props.posts.totalResults;
    this.setState({ totalPosts, currentPosts, currentPage });
  }

  onPageChanged = async (data) => {
    const { totalPages, currentPage } = data;
    const { pageLimit } = this.state;

    await this.props.fetchPosts(currentPage, pageLimit);

    const currentPosts = this.props.posts.currentResults;
    const totalPosts = this.props.posts.totalResults;

    this.setState({ totalPosts, totalPages, currentPosts, currentPage });
  };

  renderPosts() {
    const {
      totalPosts,
      totalPages,
      currentPosts,
      currentPage,
      pageLimit,
      pageNeighbours,
    } = this.state;

    if (totalPosts === 0) return null;

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
              pageLimit={pageLimit}
              pageNeighbours={pageNeighbours}
              onPageChanged={this.onPageChanged}
            />
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-8">
          <h1 className="text-center pb-4 font-weight-bold">Latest Posts</h1>

          {this.renderPosts()}
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
}

function mapStateToProps({ posts }) {
  return { posts };
}

export default connect(mapStateToProps, { fetchPosts })(PostsList);
