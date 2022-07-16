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
  BID_GET_BY_AUCTION_ID_FAIL,
  BID_GET_BY_AUCTION_ID_REQUEST,
  BID_GET_BY_AUCTION_ID_SUCCESS,
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
      const { data } = await axios.get(`${API_URL}/api/v1/auctions`, {
        withCredentials: true,
        headers: {
          page,
          page_size: 4,
        },
      });
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

    const { data } = await axios.get(`${API_URL}/api/v1/auctions/topTrending`, {
      withCredentials: true,
    });
    dispatch({
      type: AUCTION_GET_TOP_TRENDING_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + error.response.data.errors.join(', ');
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

    const { data } = await axios.get(
      `${API_URL}/api/v1/auctions/${auctionId}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: AUCTION_GET_BY_ID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + error.response.data.errors.join(', ');
    dispatch({
      type: AUCTION_GET_BY_ID_FAIL,
      payload: errorMessage,
    });
  }
};

export const bidGetByAuctionId = (auctionId) => async (dispatch) => {
  try {
    dispatch({
      type: BID_GET_BY_AUCTION_ID_REQUEST,
    });

    const { data } = await axios.get(
      `${API_URL}/api/v1/auctions/${auctionId}/bids`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: BID_GET_BY_AUCTION_ID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + error.response.data.errors.join(', ');
    dispatch({
      type: BID_GET_BY_AUCTION_ID_FAIL,
      payload: errorMessage,
    });
  }
};
