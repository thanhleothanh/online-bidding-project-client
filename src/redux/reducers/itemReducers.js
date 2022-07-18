import {
  ITEM_PUT_FAIL,
  ITEM_PUT_REQUEST,
  ITEM_PUT_RESET,
  ITEM_PUT_SUCCESS,
  ITEM_UPLOAD_IMAGE_FAIL,
  ITEM_UPLOAD_IMAGE_REQUEST,
  ITEM_UPLOAD_IMAGE_RESET,
  ITEM_UPLOAD_IMAGE_SUCCESS,
} from '../constants/itemConstants';

export const itemPutReducer = (state = { item: null }, action) => {
  switch (action.type) {
    case ITEM_PUT_REQUEST:
      return { loading: true };
    case ITEM_PUT_SUCCESS:
      return { loading: false, item: action.payload };
    case ITEM_PUT_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_PUT_RESET:
      return { item: null };
    default:
      return state;
  }
};

export const itemUploadImageReducer = (state = { image: null }, action) => {
  switch (action.type) {
    case ITEM_UPLOAD_IMAGE_REQUEST:
      return { loading: true };
    case ITEM_UPLOAD_IMAGE_SUCCESS:
      return { loading: false, image: action.payload };
    case ITEM_UPLOAD_IMAGE_FAIL:
      return { loading: false, error: action.payload };
    case ITEM_UPLOAD_IMAGE_RESET:
      return { image: null };
    default:
      return state;
  }
};
