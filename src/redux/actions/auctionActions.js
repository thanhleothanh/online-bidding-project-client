import {
  AUCTION_GET_OPENINGS_FAIL,
  AUCTION_GET_OPENINGS_REQUEST,
  AUCTION_GET_OPENINGS_SUCCESS,
  AUCTION_GET_TOP_TRENDING_FAIL,
  AUCTION_GET_TOP_TRENDING_REQUEST,
  AUCTION_GET_TOP_TRENDING_SUCCESS,
  AUCTION_GET_BY_ID_FAIL,
  AUCTION_GET_BY_ID_REQUEST,
  AUCTION_GET_BY_ID_SUCCESS,
  AUCTION_GET_MY_AUCTIONS_FAIL,
  AUCTION_GET_MY_AUCTIONS_REQUEST,
  AUCTION_GET_MY_AUCTIONS_SUCCESS,
  AUCTION_POST_FAIL,
  AUCTION_POST_REQUEST,
  AUCTION_POST_SUCCESS,
  AUCTION_PUT_FAIL,
  AUCTION_PUT_REQUEST,
  AUCTION_PUT_SUCCESS,
  AUCTION_DELETE_FAIL,
  AUCTION_DELETE_REQUEST,
  AUCTION_DELETE_SUCCESS,
  AUCTION_SUBMIT_FAIL,
  AUCTION_SUBMIT_REQUEST,
  AUCTION_SUBMIT_SUCCESS,
  //admin
  AUCTION_ADMIN_GET_ALL_FAIL,
  AUCTION_ADMIN_GET_ALL_REQUEST,
  AUCTION_ADMIN_GET_ALL_SUCCESS,
  AUCTION_ADMIN_APPROVE_FAIL,
  AUCTION_ADMIN_APPROVE_REQUEST,
  AUCTION_ADMIN_APPROVE_SUCCESS,
  //auction phase 2
  AUCTION_GET_USERS_AUCTIONS_FAIL,
  AUCTION_GET_USERS_AUCTIONS_REQUEST,
  AUCTION_GET_USERS_AUCTIONS_SUCCESS,
  AUCTION_GET_INTERESTED_FAIL,
  AUCTION_GET_INTERESTED_REQUEST,
  AUCTION_GET_INTERESTED_SUCCESS,
  AUCTION_CHECK_INTERESTED_FAIL,
  AUCTION_CHECK_INTERESTED_REQUEST,
  AUCTION_CHECK_INTERESTED_SUCCESS,
  AUCTION_DELETE_INTERESTED_FAIL,
  AUCTION_DELETE_INTERESTED_REQUEST,
  AUCTION_DELETE_INTERESTED_SUCCESS,
  AUCTION_SAVE_INTERESTED_FAIL,
  AUCTION_SAVE_INTERESTED_REQUEST,
  AUCTION_SAVE_INTERESTED_SUCCESS,
  AUCTION_GET_MY_WINS_FAIL,
  AUCTION_GET_MY_WINS_REQUEST,
  AUCTION_GET_MY_WINS_SUCCESS,
} from '../constants/auctionConstants';
import axios from 'axios';
import { API_URL } from '../../utils/config';

export const auctionGetOpenings =
  (page = 0, categoryId = null) =>
  async (dispatch) => {
    try {
      if (categoryId != null) page = 0;
      dispatch({
        type: AUCTION_GET_OPENINGS_REQUEST,
      });
      const config = {
        withCredentials: true,
        headers: {
          page,
          page_size: 4,
        },
      };
      const { data } = await axios.get(
        `${API_URL}/api/v1/auctions?categoryId=${categoryId ?? ''}`,
        config
      );
      dispatch({
        type: AUCTION_GET_OPENINGS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      const errorMessage =
        error.response.data.message +
        ' ' +
        error.response.data.errors.toString();
      dispatch({
        type: AUCTION_GET_OPENINGS_FAIL,
        payload: errorMessage,
      });
    }
  };

export const auctionGetTopTrending = () => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_GET_TOP_TRENDING_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(
      `${API_URL}/api/v1/auctions/topTrending`,
      config
    );
    dispatch({
      type: AUCTION_GET_TOP_TRENDING_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_GET_TOP_TRENDING_FAIL,
      payload: errorMessage,
    });
  }
};

export const auctionGetById = (auctionId) => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_GET_BY_ID_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(
      `${API_URL}/api/v1/auctions/${auctionId}`,
      config
    );
    dispatch({
      type: AUCTION_GET_BY_ID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_GET_BY_ID_FAIL,
      payload: errorMessage,
    });
  }
};

export const auctionGetMyAuctions = () => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_GET_MY_AUCTIONS_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(
      `${API_URL}/api/v1/profiles/myAuctions`,
      config
    );
    dispatch({
      type: AUCTION_GET_MY_AUCTIONS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_GET_MY_AUCTIONS_FAIL,
      payload: errorMessage,
    });
  }
};

export const auctionPost = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_POST_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${API_URL}/api/v1/auctions`,
      payload,
      config
    );
    dispatch({
      type: AUCTION_POST_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_POST_FAIL,
      payload: errorMessage,
    });
  }
};

export const auctionPut = (auctionId, payload) => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_PUT_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `${API_URL}/api/v1/auctions/${auctionId}`,
      payload,
      config
    );
    dispatch({
      type: AUCTION_PUT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_PUT_FAIL,
      payload: errorMessage,
    });
  }
};

export const auctionDelete = (auctionId) => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_DELETE_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.delete(`${API_URL}/api/v1/auctions/${auctionId}`, config);
    dispatch({
      type: AUCTION_DELETE_SUCCESS,
      payload: true,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_DELETE_FAIL,
      payload: errorMessage,
    });
  }
};

export const auctionSubmit = (auctionId) => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_SUBMIT_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `${API_URL}/api/v1/auctions/${auctionId}/submit`,
      {},
      config
    );
    dispatch({
      type: AUCTION_SUBMIT_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_SUBMIT_FAIL,
      payload: errorMessage,
    });
  }
};

//admin

export const auctionAdminGetAll =
  (page = 0, status = null) =>
  async (dispatch) => {
    try {
      dispatch({
        type: AUCTION_ADMIN_GET_ALL_REQUEST,
      });
      const config = {
        withCredentials: true,
        headers: {
          page,
          page_size: 5,
        },
      };
      const { data } = await axios.get(
        `${API_URL}/api/v1/admin/auctions?status=${status ?? ''}`,
        config
      );
      dispatch({
        type: AUCTION_ADMIN_GET_ALL_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      const errorMessage =
        error.response.data.message +
        ' ' +
        error.response.data.errors.toString();
      dispatch({
        type: AUCTION_ADMIN_GET_ALL_FAIL,
        payload: errorMessage,
      });
    }
  };

export const auctionAdminApprove = (auctionId, payload) => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_ADMIN_APPROVE_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.put(
      `${API_URL}/api/v1/admin/auctions/${auctionId}/approve`,
      payload,
      config
    );
    dispatch({
      type: AUCTION_ADMIN_APPROVE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_ADMIN_APPROVE_FAIL,
      payload: errorMessage,
    });
  }
};

//auction phase 2

export const auctionGetUsersAuctions = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_GET_USERS_AUCTIONS_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(
      `${API_URL}/api/v1/profiles/${userId}/auctions`,
      config
    );
    dispatch({
      type: AUCTION_GET_USERS_AUCTIONS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_GET_USERS_AUCTIONS_FAIL,
      payload: errorMessage,
    });
  }
};

export const auctionGetInterested = () => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_GET_INTERESTED_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(
      `${API_URL}/api/v1/profiles/myInterestedAuctions`,
      config
    );
    dispatch({
      type: AUCTION_GET_INTERESTED_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_GET_INTERESTED_FAIL,
      payload: errorMessage,
    });
  }
};

export const auctionCheckInterested = (auctionId) => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_CHECK_INTERESTED_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(
      `${API_URL}/api/v1/profiles/myInterestedAuctions/${auctionId}`,
      config
    );
    dispatch({
      type: AUCTION_CHECK_INTERESTED_SUCCESS,
      payload: true,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_CHECK_INTERESTED_FAIL,
      payload: errorMessage,
    });
  }
};

export const auctionDeleteInterested = (auctionId) => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_DELETE_INTERESTED_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.delete(
      `${API_URL}/api/v1/profiles/myInterestedAuctions/${auctionId}`,
      config
    );
    dispatch({
      type: AUCTION_DELETE_INTERESTED_SUCCESS,
      payload: true,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_DELETE_INTERESTED_FAIL,
      payload: errorMessage,
    });
  }
};

export const auctionSaveInterested = (payload) => async (dispatch) => {
  try {
    dispatch({
      type: AUCTION_SAVE_INTERESTED_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${API_URL}/api/v1/profiles/myInterestedAuctions/`,
      payload,
      config
    );
    dispatch({
      type: AUCTION_SAVE_INTERESTED_SUCCESS,
      payload: true,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_SAVE_INTERESTED_FAIL,
      payload: errorMessage,
    });
  }
};

export const auctionGetMyWins = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AUCTION_GET_MY_WINS_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const {
      userLogin: { userInfo },
    } = getState();
    const { data } = await axios.get(
      `${API_URL}/api/v1/profiles/${userInfo.id}/wonAuctions`,
      config
    );
    dispatch({
      type: AUCTION_GET_MY_WINS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: AUCTION_GET_MY_WINS_FAIL,
      payload: errorMessage,
    });
  }
};
