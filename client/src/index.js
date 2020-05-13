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

//dev env only
//import axios from 'axios';
//window.axios = axios;

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
