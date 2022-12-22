import {
  NOTIFICATION_GET_MY_NOTIFICATIONS_FAIL,
  NOTIFICATION_GET_MY_NOTIFICATIONS_REQUEST,
  NOTIFICATION_GET_MY_NOTIFICATIONS_SUCCESS,
} from '../constants/notificationConstants';
import axios from 'axios';
import { API_URL } from '../../utils/config';

export const notificationGetMyNotifications =
  (page = 0) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTIFICATION_GET_MY_NOTIFICATIONS_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          page,
          page_size: 7,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${API_URL}/api/v1/profiles/myNotifications`,
        config
      );
      dispatch({
        type: NOTIFICATION_GET_MY_NOTIFICATIONS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      const errorMessage =
        error.response.data.message +
        ' ' +
        error.response.data.errors.toString();
      dispatch({
        type: NOTIFICATION_GET_MY_NOTIFICATIONS_FAIL,
        payload: errorMessage,
      });
    }
  };
