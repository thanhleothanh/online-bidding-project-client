import {
  ITEM_PUT_FAIL,
  ITEM_PUT_REQUEST,
  ITEM_PUT_SUCCESS,
  ITEM_POST_IMAGE_FAIL,
  ITEM_POST_IMAGE_REQUEST,
  ITEM_POST_IMAGE_SUCCESS,
  ITEM_DELETE_IMAGE_FAIL,
  ITEM_DELETE_IMAGE_REQUEST,
  ITEM_DELETE_IMAGE_SUCCESS,
  ITEM_UPLOAD_IMAGE_FAIL,
  ITEM_UPLOAD_IMAGE_REQUEST,
  ITEM_UPLOAD_IMAGE_SUCCESS,
} from '../constants/itemConstants';
import axios from 'axios';
import { API_URL } from '../../utils/config';

export const itemPut = (itemId, payload) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ITEM_PUT_REQUEST,
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
      `${API_URL}/api/v1/items/${itemId}`,
      payload,
      config
    );
    dispatch({
      type: ITEM_PUT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: ITEM_PUT_FAIL,
      payload: errorMessage,
    });
  }
};

export const itemPostImage =
  (itemId, payload) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ITEM_POST_IMAGE_REQUEST,
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
        `${API_URL}/api/v1/items/${itemId}/itemImages`,
        payload,
        config
      );
      dispatch({
        type: ITEM_POST_IMAGE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      const errorMessage =
        error.response.data.message +
        ' ' +
        error.response.data.errors.toString();
      dispatch({
        type: ITEM_POST_IMAGE_FAIL,
        payload: errorMessage,
      });
    }
  };

export const itemDeleteImage =
  (itemId, imageId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ITEM_DELETE_IMAGE_REQUEST,
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
      await axios.delete(
        `${API_URL}/api/v1/items/${itemId}/itemImages/${imageId}`,
        config
      );
      dispatch({
        type: ITEM_DELETE_IMAGE_SUCCESS,
        payload: true,
      });
    } catch (error) {
      const errorMessage =
        error.response.data.message +
        ' ' +
        error.response.data.errors.toString();
      dispatch({
        type: ITEM_DELETE_IMAGE_FAIL,
        payload: errorMessage,
      });
    }
  };

export const itemUploadImage = (files) => async (dispatch) => {
  try {
    dispatch({
      type: ITEM_UPLOAD_IMAGE_REQUEST,
    });
    const formData = new FormData();
    formData.append('file', files[0]);
    formData.append('upload_preset', 'onlinebiddingproject');

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/metanoia/image/upload`,
      formData
    );
    console.log(data);
    dispatch({
      type: ITEM_UPLOAD_IMAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: ITEM_UPLOAD_IMAGE_FAIL,
      payload: errorMessage,
    });
  }
};
