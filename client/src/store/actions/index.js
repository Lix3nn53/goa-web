import { FETCH_USER, NOTIFICATION_MODAL, NOTIFICATION_TOPBAR } from "./types";
import tokenService from "api/tokenService";
import userAPI from "api/userAPI";

export const fetchUser = () => async (dispatch) => {
  const apiRes = await userAPI.currentUser();

  const { success, res } = apiRes;

  if (success) {
    console.log("fetchUser");
    console.log(res.data);

    dispatch({ type: FETCH_USER, payload: res.data });
    return true;
  }

  dispatch({ type: FETCH_USER, payload: null });
  return false;
};

export const buyProduct = (values) => async (dispatch) => {
  try {
    const res = await tokenService.requestWithAccessToken(
      "/api/products",
      "post",
      values
    );

    console.log(res.data);

    dispatch({ type: FETCH_USER, payload: res.data.user });

    return { success: res.data.success, msg: res.data.msg };
  } catch (error) {
    // Error 😨
    if (error.response) {
      /*
       * The request was made and the server responded with a
       * status code that falls out of the range of 2xx
       */
      return { success: false, msg: error.response.data };
      //console.log(error.response.data);
      //console.log(error.response.status);
      //console.log(error.response.headers);
    } else if (error.request) {
      /*
       * The request was made but no response was received, `error.request`
       * is an instance of XMLHttpRequest in the browser and an instance
       * of http.ClientRequest in Node.js
       */
      //console.log(error.request);
    } else {
      // Something happened in setting up the request and triggered an Error
      console.log("Error", error.message);
    }
    //console.log(error);
    return { success: false, msg: error.message };
  }
};

export const notifyModal = (isVisible, type, message) => async (dispatch) => {
  dispatch({
    type: NOTIFICATION_MODAL,
    payload: { isVisible: isVisible, type: type, message: message },
  });
};

export const notifyTopBar = (isVisible, type, message) => async (dispatch) => {
  dispatch({
    type: NOTIFICATION_TOPBAR,
    payload: { isVisible: isVisible, type: type, message: message },
  });
};
