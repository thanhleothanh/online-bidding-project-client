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
  AUCTION_DELETE_FAIL,
  AUCTION_DELETE_REQUEST,
  AUCTION_DELETE_SUCCESS,
  AUCTION_SUBMIT_FAIL,
  AUCTION_SUBMIT_REQUEST,
  AUCTION_SUBMIT_SUCCESS,
} from '../constants/auctionConstants';
import axios from 'axios';
import { API_URL } from '../../utils/config';

export const auctionGetOpenings =
  (page = 0) =>
  async (dispatch) => {
    try {
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
      const { data } = await axios.get(`${API_URL}/api/v1/auctions`, config);
      dispatch({
        type: AUCTION_GET_OPENINGS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      const errorMessage =
        error.response.data.message + error.response.data.errors.toString();
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
      `${API_URL}/api/v1/auctions/myAuctions`,
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
