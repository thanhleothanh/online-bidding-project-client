import {
  REPORT_POST_FAIL,
  REPORT_POST_REQUEST,
  REPORT_POST_SUCCESS,
  REPORT_POST_RESET,
  REPORT_ADMIN_GET_ALL_FAIL,
  REPORT_ADMIN_GET_ALL_REQUEST,
  REPORT_ADMIN_GET_ALL_SUCCESS,
  REPORT_ADMIN_JUDGE_FAIL,
  REPORT_ADMIN_JUDGE_REQUEST,
  REPORT_ADMIN_JUDGE_RESET,
  REPORT_ADMIN_JUDGE_SUCCESS,
  REPORT_ADMIN_DELETE_FAIL,
  REPORT_ADMIN_DELETE_REQUEST,
  REPORT_ADMIN_DELETE_RESET,
  REPORT_ADMIN_DELETE_SUCCESS,
} from '../constants/reportConstants';

export const reportPostReducer = (state = { report: null }, action) => {
  switch (action.type) {
    case REPORT_POST_REQUEST:
      return { loading: true };
    case REPORT_POST_SUCCESS:
      return { loading: false, report: action.payload };
    case REPORT_POST_FAIL:
      return { loading: false, error: action.payload };
    case REPORT_POST_RESET:
      return { report: null };
    default:
      return state;
  }
};

//admin

export const reportAdminGetAllReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_ADMIN_GET_ALL_REQUEST:
      return { loading: true };
    case REPORT_ADMIN_GET_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        reports: action.payload.reports,
        page: action.payload.page,
        count: action.payload.count,
        pageSize: action.payload.pageSize,
        pageTotal: action.payload.pageTotal,
      };
    case REPORT_ADMIN_GET_ALL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const reportAdminJudgeReducer = (state = { result: null }, action) => {
  switch (action.type) {
    case REPORT_ADMIN_JUDGE_REQUEST:
      return { loading: true };
    case REPORT_ADMIN_JUDGE_SUCCESS:
      return { loading: false, result: action.payload };
    case REPORT_ADMIN_JUDGE_FAIL:
      return { loading: false, error: action.payload };
    case REPORT_ADMIN_JUDGE_RESET:
      return { result: null };
    default:
      return state;
  }
};

export const reportAdminDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case REPORT_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case REPORT_ADMIN_DELETE_SUCCESS:
      return { loading: false, success: action.payload };
    case REPORT_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case REPORT_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
