import {
  ITEM_PUT_FAIL,
  ITEM_PUT_REQUEST,
  ITEM_PUT_SUCCESS,
  ITEM_UPLOAD_IMAGE_FAIL,
  ITEM_UPLOAD_IMAGE_REQUEST,
  ITEM_UPLOAD_IMAGE_SUCCESS,
} from '../constants/itemConstants';
import axios from 'axios';
import { API_URL } from '../../utils/config';

export const itemPut = (itemId, payload) => async (dispatch) => {
  try {
    dispatch({
      type: ITEM_PUT_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
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
