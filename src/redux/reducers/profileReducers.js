import {
  PROFILE_GET_BY_ID_FAIL,
  PROFILE_GET_BY_ID_REQUEST,
  PROFILE_GET_BY_ID_SUCCESS,
  PROFILE_CHANGE_PASSWORD_FAIL,
  PROFILE_CHANGE_PASSWORD_REQUEST,
  PROFILE_CHANGE_PASSWORD_SUCCESS,
  PROFILE_CHANGE_PASSWORD_RESET,
} from '../constants/profileConstants';

export const profileGetByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_GET_BY_ID_REQUEST:
      return { loading: true };
    case PROFILE_GET_BY_ID_SUCCESS:
      return { loading: false, profile: action.payload };
    case PROFILE_GET_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const profileChangePasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_CHANGE_PASSWORD_REQUEST:
      return { loading: true };
    case PROFILE_CHANGE_PASSWORD_SUCCESS:
      return { loading: false, success: action.payload };
    case PROFILE_CHANGE_PASSWORD_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_CHANGE_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};
