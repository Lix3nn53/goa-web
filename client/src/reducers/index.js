import { combineReducers } from "redux";
import authReducer from "./authReducer";
import postsReducer from "./postsReducer";
import notificationModalReducer from "./notificationModalReducer";
import notificationTopBarReducer from "./notificationTopBarReducer";

export default combineReducers({
  auth: authReducer,
  posts: postsReducer,
  notificationModal: notificationModalReducer,
  notificationTopBar: notificationTopBarReducer,
});
