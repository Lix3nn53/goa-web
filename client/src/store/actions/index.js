import axios from "axios";
import {
  FETCH_USER,
  FETCH_POSTS,
  NOTIFICATION_MODAL,
  NOTIFICATION_TOPBAR,
} from "./types";
import tokenService from "api/tokenService";

export const fetchUser = () => async (dispatch) => {
  const refreshToken = localStorage.getItem("refreshToken");

  try {
    const res = await axios.get("/api/current_user", {
      headers: { Authorization: `Bearer ${refreshToken}` },
    });

    console.log(res.data);

    dispatch({ type: FETCH_USER, payload: res.data });
    return;
  } catch (error) {
    if (error.response && error.response.data) {
      console.log(error.response.data);
    }
  }

  dispatch({ type: FETCH_USER, payload: null });
};

export const updateUser = (values) => async (dispatch) => {
  try {
    const res = await tokenService.requestWithAccessToken(
      "/api/profile",
      "post",
      values
    );

    dispatch({ type: FETCH_USER, payload: res.data });

    return { success: true };
  } catch (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
  }
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

//NO FETCH PRODUCT CUZ PRODUCTS ARE HARD CODED IN THIS PROJECT
/*export const fetchProducts = () => async (dispatch) => {
  const res = await axios.get("/api/products");

  dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};*/

export const fetchPosts = (page, limit) => async (dispatch) => {
  const res = await axios.get("/api/posts?page=" + page + "&limit=" + limit);

  dispatch({ type: FETCH_POSTS, payload: res.data });
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
