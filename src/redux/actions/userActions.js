import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_SIGNUP_FAIL,
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS,
  USER_SIGNUP_RESET,
} from '../constants/userConstants';
import axios from 'axios';
import { API_URL } from '../../utils/config';

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const data = await axios.post(
      `${API_URL}/api/v1/auth/login`,
      { username, password },
      config
    );
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data.data.data,
    });
    localStorage.setItem('userInfo', JSON.stringify(data.data.data));
  } catch (error) {
    const errorMessage =
      error.response.data.message + error.response.data.errors.toString();
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: errorMessage,
    });
  }
};

export const signup = (username, name, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_SIGNUP_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${API_URL}/api/v1/auth/signup`,
      { username, name, password },
      config
    );
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_SIGNUP_RESET,
    });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    const errorMessage =
      error.response.data.message + error.response.data.errors.toString();
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: errorMessage,
    });
  }
};
