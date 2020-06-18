import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { notifyModal, fetchUser } from "store/actions";

import Spinner from "components/util/Spinner";
import ProfileForm from "components/forms/ProfileForm";
import BillingForm from "components/forms/BillingForm";
import MinecraftForm from "components/forms/MinecraftForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

import $ from "jquery";
import userAPI from "api/userAPI";

function ProfilePage(props) {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const onFormSubmit = async (fields) => {
    const apiRes = await userAPI.updateUser(fields);

    const { success } = apiRes;

    console.log(fields);

    if (success) {
      dispatch(notifyModal(true, "success", "Changes saved"));
      dispatch(fetchUser());
    } else {
      const { errorMessage } = apiRes;
      dispatch(notifyModal(true, "warning", errorMessage));
    }
  };

  const showLoginModal = () => {
    $("#loginModal").modal("show");
  };

  switch (auth) {
    case null:
      return (
        <div className="col mt-4">
          <Spinner />
        </div>
      );
    case false:
      return (
        <div className="row">
          <button
            className="mt-4 btn mx-auto"
            href="#loginModal"
            onClick={showLoginModal}
          >
            <FontAwesomeIcon className="mr-2" icon={faSignInAlt} />
            Login
          </button>
        </div>
      );
    default:
      return (
        <div className="container mt-5">
          <div className="row">
            <div className="col-xl-3 p-1 bg-primary rounded">
              <div className="text-center py-2">
                <img
                  src="https://i.ibb.co/hR60sKK/2018-04-12-19-08-26.png"
                  className="rounded-circle w-50 pb-1"
                  alt=""
                />
              </div>
              <div
                className="nav flex-column nav-pills"
                id="v-pills-tab"
                role="tablist"
                aria-orientation="vertical"
              >
                <a
                  className="nav-link active"
                  id="v-pills-home-tab"
                  data-toggle="pill"
                  href="#v-pills-home"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Profile
                </a>
                <a
                  className="nav-link"
                  id="v-pills-profile-tab"
                  data-toggle="pill"
                  href="#v-pills-profile"
                  role="tab"
                  aria-controls="v-pills-profile"
                  aria-selected="false"
                >
                  Billing
                </a>
                <a
                  className="nav-link"
                  id="v-pills-messages-tab"
                  data-toggle="pill"
                  href="#v-pills-messages"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Minecraft
                </a>
              </div>
            </div>
            <div className="col-xl-9">
              <div className="tab-content" id="v-pills-tabContent">
                <div
                  className="tab-pane fade show active"
                  id="v-pills-home"
                  role="tabpanel"
                  aria-labelledby="v-pills-home-tab"
                >
                  <ProfileForm onFormSubmit={onFormSubmit} />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-profile"
                  role="tabpanel"
                  aria-labelledby="v-pills-profile-tab"
                >
                  <BillingForm onFormSubmit={onFormSubmit} />
                </div>
                <div
                  className="tab-pane fade"
                  id="v-pills-messages"
                  role="tabpanel"
                  aria-labelledby="v-pills-messages-tab"
                >
                  <MinecraftForm onFormSubmit={onFormSubmit} />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

export default ProfilePage;
