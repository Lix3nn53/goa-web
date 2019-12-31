import axios from "axios";
import {
  FETCH_USER,
  FETCH_SURVEYS,
  FETCH_PRODUCTS,
  FETCH_POSTS,
  NOTIFICATION_MODAL,
  NOTIFICATION_TOPBAR
} from "./types";

export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/current_user");

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const updateUser = values => async dispatch => {
  const res = await axios.post("/api/profile", values);

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitSurvey = (values, history) => async dispatch => {
  const res = await axios.post("/api/surveys", values);

  history.push("/surveys");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const buyProduct = values => async dispatch => {
  try {
    const res = await axios.post("/api/products", values);

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

export const fetchSurveys = () => async dispatch => {
  const res = await axios.get("/api/surveys");

  dispatch({ type: FETCH_SURVEYS, payload: res.data });
};

export const fetchProducts = () => async dispatch => {
  const res = await axios.get("/api/products");

  dispatch({ type: FETCH_PRODUCTS, payload: res.data });
};

export const fetchPosts = (page, limit) => async dispatch => {
  const res = await axios.get("/api/posts?page=" + page + "&limit=" + limit);

  dispatch({ type: FETCH_POSTS, payload: res.data });
};

export const notifyModal = (isVisible, type, message) => async dispatch => {
  dispatch({
    type: NOTIFICATION_MODAL,
    payload: { isVisible: isVisible, type: type, message: message }
  });
};

export const notifyTopBar = (isVisible, type, message) => async dispatch => {
  dispatch({
    type: NOTIFICATION_TOPBAR,
    payload: { isVisible: isVisible, type: type, message: message }
  });
};
