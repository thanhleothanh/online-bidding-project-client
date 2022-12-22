import {
  REPORT_POST_FAIL,
  REPORT_POST_REQUEST,
  REPORT_POST_SUCCESS,
  REPORT_ADMIN_GET_ALL_FAIL,
  REPORT_ADMIN_GET_ALL_REQUEST,
  REPORT_ADMIN_GET_ALL_SUCCESS,
  REPORT_ADMIN_JUDGE_FAIL,
  REPORT_ADMIN_JUDGE_REQUEST,
  REPORT_ADMIN_JUDGE_SUCCESS,
  REPORT_ADMIN_DELETE_FAIL,
  REPORT_ADMIN_DELETE_REQUEST,
  REPORT_ADMIN_DELETE_SUCCESS,
} from '../constants/reportConstants';
import axios from 'axios';
import { API_URL } from '../../utils/config';

export const reportPost = (payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPORT_POST_REQUEST,
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
      `${API_URL}/api/v1/reports`,
      payload,
      config
    );
    dispatch({
      type: REPORT_POST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: REPORT_POST_FAIL,
      payload: errorMessage,
    });
  }
};

//admin

export const reportAdminGetAll =
  (page = 0, result = '') =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: REPORT_ADMIN_GET_ALL_REQUEST,
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
        `${API_URL}/api/v1/admin/reports?result=${result}`,
        config
      );
      dispatch({
        type: REPORT_ADMIN_GET_ALL_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      const errorMessage =
        error.response.data.message + error.response.data.errors.toString();
      dispatch({
        type: REPORT_ADMIN_GET_ALL_FAIL,
        payload: errorMessage,
      });
    }
  };

export const reportAdminJudge =
  (reportId, payload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: REPORT_ADMIN_JUDGE_REQUEST,
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
        `${API_URL}/api/v1/admin/reports/${reportId}/results`,
        payload,
        config
      );
      dispatch({
        type: REPORT_ADMIN_JUDGE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      const errorMessage =
        error.response.data.message +
        ' ' +
        error.response.data.errors.toString();
      dispatch({
        type: REPORT_ADMIN_JUDGE_FAIL,
        payload: errorMessage,
      });
    }
  };

export const reportAdminDelete = (reportId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REPORT_ADMIN_DELETE_REQUEST,
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
    await axios.delete(`${API_URL}/api/v1/admin/reports/${reportId}`, config);
    dispatch({
      type: REPORT_ADMIN_DELETE_SUCCESS,
      payload: true,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: REPORT_ADMIN_DELETE_FAIL,
      payload: errorMessage,
    });
  }
};
