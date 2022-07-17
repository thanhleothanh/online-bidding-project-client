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
  AUCTION_POST_RESET,
  AUCTION_DELETE_FAIL,
  AUCTION_DELETE_REQUEST,
  AUCTION_DELETE_SUCCESS,
  AUCTION_DELETE_RESET,
  AUCTION_SUBMIT_FAIL,
  AUCTION_SUBMIT_REQUEST,
  AUCTION_SUBMIT_SUCCESS,
  AUCTION_SUBMIT_RESET,
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

export const auctionGetMyAuctionsReducer = (state = {}, action) => {
  switch (action.type) {
    case AUCTION_GET_MY_AUCTIONS_REQUEST:
      return { loading: true };
    case AUCTION_GET_MY_AUCTIONS_SUCCESS:
      return { loading: false, auctions: action.payload };
    case AUCTION_GET_MY_AUCTIONS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const auctionPostReducer = (state = { auction: null }, action) => {
  switch (action.type) {
    case AUCTION_POST_REQUEST:
      return { loading: true };
    case AUCTION_POST_SUCCESS:
      return { loading: false, auction: action.payload };
    case AUCTION_POST_FAIL:
      return { loading: false, error: action.payload };
    case AUCTION_POST_RESET:
      return { auction: null };
    default:
      return state;
  }
};

export const auctionDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case AUCTION_DELETE_REQUEST:
      return { loading: true };
    case AUCTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case AUCTION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case AUCTION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const auctionSubmitReducer = (state = { auction: null }, action) => {
  switch (action.type) {
    case AUCTION_SUBMIT_REQUEST:
      return { loading: true };
    case AUCTION_SUBMIT_SUCCESS:
      return { loading: false, auction: action.payload };
    case AUCTION_SUBMIT_FAIL:
      return { loading: false, error: action.payload };
    case AUCTION_SUBMIT_RESET:
      return { auction: null };
    default:
      return state;
  }
};
