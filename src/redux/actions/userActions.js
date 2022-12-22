import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_LOGOUT,
} from '../constants/userConstants';
import axios from 'axios';
import { API_URL } from '../../utils/config';
import { NOTIFICATION_GET_MY_NOTIFICATIONS_RESET } from '../constants/notificationConstants';

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${API_URL}/api/v1/auth/login`,
      { username, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorMessage,
    });
  }
};

export const signup = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${API_URL}/api/v1/auth/signup`,
      { ...payload, role: { id: 2 } },
      config
    );
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: errorMessage,
    });
  }
};

export const logOut = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`${API_URL}/api/v1/auth/logout`, config);
    localStorage.removeItem('userInfo');
    dispatch({
      type: USER_LOGOUT,
    });
    dispatch({
      type: NOTIFICATION_GET_MY_NOTIFICATIONS_RESET,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    // console.log(errorMessage);
  }
};
