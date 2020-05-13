import { NOTIFICATION_TOPBAR } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case NOTIFICATION_TOPBAR:
      if (action.payload.isVisible) {
        return action.payload || false;
      } else {
        return state;
      }
    default:
      return state;
  }
}
