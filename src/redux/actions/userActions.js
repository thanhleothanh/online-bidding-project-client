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
      { username, name, password, role: { id: 2 } },
      config
    );
    dispatch({
      type: USER_SIGNUP_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + error.response.data.errors.toString();
    dispatch({
      type: USER_SIGNUP_FAIL,
      payload: errorMessage,
    });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(`${API_URL}/api/v1/auth/logout`, config);
    console.log(data.data);
    dispatch({
      type: USER_LOGOUT,
    });
    localStorage.removeItem('userInfo');
  } catch (error) {
    const errorMessage =
      error.response.data.message + error.response.data.errors.toString();
    console.log(errorMessage);
  }
};
