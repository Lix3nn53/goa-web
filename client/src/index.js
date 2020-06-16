import "assets/scss/goaweb.scss";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "popper.js/dist/popper.min.js";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./App";
import reducers from "store/reducers";

import axios from "axios";
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
  console.log("Dev mode: Using http-proxy-middleware");
} else {
  // production code
  console.log("Prod mode: Setting axios.defaults.baseURL");
  axios.defaults.baseURL =
    "http://getsemi-env.eba-gt3vg7zp.us-east-2.elasticbeanstalk.com";
}

//dev env only
//window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
