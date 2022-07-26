import {
  PROFILE_GET_BY_ID_FAIL,
  PROFILE_GET_BY_ID_REQUEST,
  PROFILE_GET_BY_ID_SUCCESS,
  PROFILE_CHANGE_PASSWORD_FAIL,
  PROFILE_CHANGE_PASSWORD_REQUEST,
  PROFILE_CHANGE_PASSWORD_SUCCESS,
  PROFILE_CHANGE_PASSWORD_RESET,
  PROFILE_ADMIN_GET_ALL_FAIL,
  PROFILE_ADMIN_GET_ALL_REQUEST,
  PROFILE_ADMIN_GET_ALL_SUCCESS,
  PROFILE_ADMIN_BAN_FAIL,
  PROFILE_ADMIN_BAN_REQUEST,
  PROFILE_ADMIN_BAN_SUCCESS,
  PROFILE_ADMIN_BAN_RESET,
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

//admin

export const profileAdminGetAllReducer = (state = {}, action) => {
  switch (action.type) {
    case PROFILE_ADMIN_GET_ALL_REQUEST:
      return { loading: true };
    case PROFILE_ADMIN_GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        profiles: action.payload.profiles,
        page: action.payload.page,
        count: action.payload.count,
        pageSize: action.payload.pageSize,
        pageTotal: action.payload.pageTotal,
      };
    case PROFILE_ADMIN_GET_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const profileAdminBanReducer = (state = { profile: null }, action) => {
  switch (action.type) {
    case PROFILE_ADMIN_BAN_REQUEST:
      return { loading: true };
    case PROFILE_ADMIN_BAN_SUCCESS:
      return { loading: false, profile: action.payload };
    case PROFILE_ADMIN_BAN_FAIL:
      return { loading: false, error: action.payload };
    case PROFILE_ADMIN_BAN_RESET:
      return { profile: null };
    default:
      return state;
  }
};
