import React from "react";
import { useSelector } from "react-redux";

import Spinner from "components/util/Spinner";
import PostForm from "components/forms/PostForm";

function AdminDashboard(props) {
  const auth = useSelector((state) => state.auth);

  switch (auth) {
    case null:
      return (
        <div className="col mt-4">
          <Spinner />
        </div>
      );
    case false:
      return <p className="text-center">You must be logged in</p>;
    default:
      if (auth.role === "admin") {
        return (
          <div className="container mt-5">
            <div className="row">
              <div className="col-lg-3 p-2 bg-primary rounded">
                <div className="text-center py-2">
                  <img
                    src="https://i.ibb.co/hR60sKK/2018-04-12-19-08-26.png"
                    className="rounded-circle w-50 pb-1"
                    alt=""
                  />
                </div>
                <div className="text-center text-secondary font-weight-bold">
                  <p>
                    {auth.username + " / " + auth.minecraftUsername}
                    <br />
                    <span class="badge badge-pill badge-secondary">
                      {auth.role}
                    </span>
                  </p>
                </div>
                <div
                  className="nav nav-dark flex-column nav-pills"
                  id="v-pills-tab"
                  role="tablist"
                  aria-orientation="vertical"
                >
                  <a
                    className="nav-link active my-1"
                    id="v-pills-home-tab"
                    data-toggle="pill"
                    href="#v-pills-home"
                    role="tab"
                    aria-controls="v-pills-home"
                    aria-selected="true"
                  >
                    Publish Post
                  </a>
                  <a
                    className="nav-link my-1"
                    id="v-pills-profile-tab"
                    data-toggle="pill"
                    href="#v-pills-profile"
                    role="tab"
                    aria-controls="v-pills-profile"
                    aria-selected="false"
                  >
                    Test
                  </a>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="tab-content" id="v-pills-tabContent">
                  <div
                    className="tab-pane fade show active"
                    id="v-pills-home"
                    role="tabpanel"
                    aria-labelledby="v-pills-home-tab"
                  >
                    <PostForm />
                  </div>
                  <div
                    className="tab-pane fade"
                    id="v-pills-profile"
                    role="tabpanel"
                    aria-labelledby="v-pills-profile-tab"
                  >
                    <p>Test</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }

      return (
        <h1 className="" href="">
          You must be an admin
        </h1>
      );
  }
}

export default AdminDashboard;
