import {
  PROFILE_GET_BY_ID_FAIL,
  PROFILE_GET_BY_ID_REQUEST,
  PROFILE_GET_BY_ID_SUCCESS,
  PROFILE_CHANGE_PASSWORD_FAIL,
  PROFILE_CHANGE_PASSWORD_REQUEST,
  PROFILE_CHANGE_PASSWORD_SUCCESS,
} from '../constants/profileConstants';
import axios from 'axios';
import { API_URL } from '../../utils/config';

export const profileGetById = (profileId) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_GET_BY_ID_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(
      `${API_URL}/api/v1/profiles/${profileId}`,
      config
    );
    dispatch({
      type: PROFILE_GET_BY_ID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: PROFILE_GET_BY_ID_FAIL,
      payload: errorMessage,
    });
  }
};

export const profileChangePassword = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: PROFILE_CHANGE_PASSWORD_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `${API_URL}/api/v1/profiles/myProfile/changePassword`,

      payload,
      config
    );
    dispatch({
      type: PROFILE_CHANGE_PASSWORD_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: PROFILE_CHANGE_PASSWORD_FAIL,
      payload: errorMessage,
    });
  }
};
