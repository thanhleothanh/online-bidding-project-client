import {
  BID_GET_BY_AUCTION_ID_FAIL,
  BID_GET_BY_AUCTION_ID_REQUEST,
  BID_GET_BY_AUCTION_ID_SUCCESS,
  BID_POST_BY_AUCTION_ID_FAIL,
  BID_POST_BY_AUCTION_ID_REQUEST,
  BID_POST_BY_AUCTION_ID_SUCCESS,
  BID_POST_BY_AUCTION_ID_RESET,
} from '../constants/bidConstants';

export const bidGetByAuctionIdReducer = (state = {}, action) => {
  switch (action.type) {
    case BID_GET_BY_AUCTION_ID_REQUEST:
      return { loading: true };
    case BID_GET_BY_AUCTION_ID_SUCCESS:
      return { loading: false, bids: action.payload };
    case BID_GET_BY_AUCTION_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const bidPostByAuctionIdReducer = (state = { bid: null }, action) => {
  switch (action.type) {
    case BID_POST_BY_AUCTION_ID_REQUEST:
      return { loading: true };
    case BID_POST_BY_AUCTION_ID_SUCCESS:
      return { loading: false, bid: action.payload };
    case BID_POST_BY_AUCTION_ID_FAIL:
      return { loading: false, error: action.payload };
    case BID_POST_BY_AUCTION_ID_RESET:
      return { bid: null };
    default:
      return state;
  }
};
