import { combineReducers } from "redux";
import authReducer from "./authReducer";
import notificationModalReducer from "./notificationModalReducer";
import notificationTopBarReducer from "./notificationTopBarReducer";

export default combineReducers({
  auth: authReducer,
  notificationModal: notificationModalReducer,
  notificationTopBar: notificationTopBarReducer,
});
