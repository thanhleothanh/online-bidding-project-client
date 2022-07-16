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

export const auctionGetOpeningsReducer = (state = {}, action) => {
  switch (action.type) {
    case AUCTION_GET_OPENINGS_REQUEST:
      return { loading: true };
    case AUCTION_GET_OPENINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        auctions: action.payload.auctions,
        page: action.payload.page,
        count: action.payload.count,
        pageSize: action.payload.pageSize,
        pageTotal: action.payload.pageTotal,
      };
    case AUCTION_GET_OPENINGS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const auctionGetTopTrendingReducer = (state = {}, action) => {
  switch (action.type) {
    case AUCTION_GET_TOP_TRENDING_REQUEST:
      return { loading: true };
    case AUCTION_GET_TOP_TRENDING_SUCCESS:
      return { loading: false, auctions: action.payload };
    case AUCTION_GET_TOP_TRENDING_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const auctionGetByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case AUCTION_GET_BY_ID_REQUEST:
      return { loading: true };
    case AUCTION_GET_BY_ID_SUCCESS:
      return { loading: false, auction: action.payload };
    case AUCTION_GET_BY_ID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

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
