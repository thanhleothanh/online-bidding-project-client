import {
  NOTIFICATION_GET_MY_NOTIFICATIONS_FAIL,
  NOTIFICATION_GET_MY_NOTIFICATIONS_REQUEST,
  NOTIFICATION_GET_MY_NOTIFICATIONS_SUCCESS,
  NOTIFICATION_GET_MY_NOTIFICATIONS_SEEN,
  NOTIFICATION_GET_MY_NOTIFICATIONS_RESET,
} from '../constants/notificationConstants';

export const notificationGetMyNotificationsReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTIFICATION_GET_MY_NOTIFICATIONS_REQUEST:
      return { loading: true };
    case NOTIFICATION_GET_MY_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        seen: false,
        loading: false,
        notifications: action.payload.notifications,
        page: action.payload.page,
        count: action.payload.count,
        pageSize: action.payload.pageSize,
        pageTotal: action.payload.pageTotal,
      };
    case NOTIFICATION_GET_MY_NOTIFICATIONS_FAIL:
      return { loading: false, error: action.payload };
    case NOTIFICATION_GET_MY_NOTIFICATIONS_SEEN:
      return { ...state, seen: true };
    case NOTIFICATION_GET_MY_NOTIFICATIONS_RESET:
      return {};
    default:
      return state;
  }
};
