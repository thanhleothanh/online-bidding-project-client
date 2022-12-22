import {
  PROFILE_GET_MY_PROFILE_FAIL,
  PROFILE_GET_MY_PROFILE_REQUEST,
  PROFILE_GET_MY_PROFILE_SUCCESS,
  PROFILE_GET_BY_ID_FAIL,
  PROFILE_GET_BY_ID_REQUEST,
  PROFILE_GET_BY_ID_SUCCESS,
  PROFILE_UPDATE_INFO_FAIL,
  PROFILE_UPDATE_INFO_REQUEST,
  PROFILE_UPDATE_INFO_SUCCESS,
  PROFILE_CHANGE_PASSWORD_FAIL,
  PROFILE_CHANGE_PASSWORD_REQUEST,
  PROFILE_CHANGE_PASSWORD_SUCCESS,
  //admin
  PROFILE_ADMIN_GET_ALL_FAIL,
  PROFILE_ADMIN_GET_ALL_REQUEST,
  PROFILE_ADMIN_GET_ALL_SUCCESS,
  PROFILE_ADMIN_BAN_FAIL,
  PROFILE_ADMIN_BAN_REQUEST,
  PROFILE_ADMIN_BAN_SUCCESS,
} from '../constants/profileConstants';
import axios from 'axios';
import { API_URL } from '../../utils/config';

export const profileGetMyProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_GET_MY_PROFILE_REQUEST,
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
    const { data } = await axios.get(
      `${API_URL}/api/v1/profiles/myProfile`,
      config
    );
    dispatch({
      type: PROFILE_GET_MY_PROFILE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: PROFILE_GET_MY_PROFILE_FAIL,
      payload: errorMessage,
    });
  }
};

export const profileGetById = (profileId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_GET_BY_ID_REQUEST,
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

export const profileUpdateInfo = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROFILE_UPDATE_INFO_REQUEST,
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
    const { data } = await axios.put(
      `${API_URL}/api/v1/profiles/myProfile`,
      payload,
      config
    );
    dispatch({
      type: PROFILE_UPDATE_INFO_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: PROFILE_UPDATE_INFO_FAIL,
      payload: errorMessage,
    });
  }
};

export const profileChangePassword =
  (payload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_CHANGE_PASSWORD_REQUEST,
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
        error.response.data.message +
        ' ' +
        error.response.data.errors.toString();
      dispatch({
        type: PROFILE_CHANGE_PASSWORD_FAIL,
        payload: errorMessage,
      });
    }
  };

//admin

export const profileAdminGetAll =
  (page = 0, status = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_ADMIN_GET_ALL_REQUEST,
      });
      const {
        userLogin: { userInfo },
      } = getState();
      const config = {
        headers: {
          page,
          page_size: 5,
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(
        `${API_URL}/api/v1/admin/profiles?status=${status}`,
        config
      );
      dispatch({
        type: PROFILE_ADMIN_GET_ALL_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      const errorMessage =
        error.response.data.message + error.response.data.errors.toString();
      dispatch({
        type: PROFILE_ADMIN_GET_ALL_FAIL,
        payload: errorMessage,
      });
    }
  };

export const profileAdminBan =
  (userId, payload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROFILE_ADMIN_BAN_REQUEST,
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
      const { data } = await axios.put(
        `${API_URL}/api/v1/admin/profiles/${userId}`,
        payload,
        config
      );
      dispatch({
        type: PROFILE_ADMIN_BAN_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      const errorMessage =
        error.response.data.message +
        ' ' +
        error.response.data.errors.toString();
      dispatch({
        type: PROFILE_ADMIN_BAN_FAIL,
        payload: errorMessage,
      });
    }
  };
