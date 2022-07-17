import {
  BID_GET_BY_AUCTION_ID_FAIL,
  BID_GET_BY_AUCTION_ID_REQUEST,
  BID_GET_BY_AUCTION_ID_SUCCESS,
  BID_POST_BY_AUCTION_ID_FAIL,
  BID_POST_BY_AUCTION_ID_REQUEST,
  BID_POST_BY_AUCTION_ID_SUCCESS,
} from '../constants/bidConstants';
import axios from 'axios';
import { API_URL } from '../../utils/config';

export const bidGetByAuctionId = (auctionId) => async (dispatch) => {
  try {
    dispatch({
      type: BID_GET_BY_AUCTION_ID_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.get(
      `${API_URL}/api/v1/auctions/${auctionId}/bids`,
      config
    );
    dispatch({
      type: BID_GET_BY_AUCTION_ID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: BID_GET_BY_AUCTION_ID_FAIL,
      payload: errorMessage,
    });
  }
};

export const bidPostByAuctionId = (auctionId, payload) => async (dispatch) => {
  try {
    dispatch({
      type: BID_POST_BY_AUCTION_ID_REQUEST,
    });
    const config = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${API_URL}/api/v1/auctions/${auctionId}/bids`,
      payload,
      config
    );
    dispatch({
      type: BID_POST_BY_AUCTION_ID_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    const errorMessage =
      error.response.data.message + ' ' + error.response.data.errors.toString();
    dispatch({
      type: BID_POST_BY_AUCTION_ID_FAIL,
      payload: errorMessage,
    });
  }
};
