import { NOTIFICATION_MODAL } from "../actions/types";

export default function(state = null, action) {
  switch (action.type) {
    case NOTIFICATION_MODAL:
      if (action.payload.isVisible) {
        return action.payload || false;
      } else {
        return state;
      }
    default:
      return state;
  }
}
