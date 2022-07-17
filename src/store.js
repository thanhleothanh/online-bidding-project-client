import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  userLoginReducer,
  userSignupReducer,
} from './redux/reducers/userReducers';
import {
  auctionGetOpeningsReducer,
  auctionGetTopTrendingReducer,
  auctionGetByIdReducer,
  auctionGetMyAuctionsReducer,
  auctionPostReducer,
  auctionDeleteReducer,
  auctionSubmitReducer,
} from './redux/reducers/auctionReducers';
import {
  bidGetByAuctionIdReducer,
  bidPostByAuctionIdReducer,
} from './redux/reducers/bidReducers';

const reducer = combineReducers({
  //user related
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,

  //auction related
  auctionGetOpenings: auctionGetOpeningsReducer,
  auctionGetTopTrending: auctionGetTopTrendingReducer,
  auctionGetById: auctionGetByIdReducer,
  auctionGetMyAuctions: auctionGetMyAuctionsReducer,
  auctionPost: auctionPostReducer,
  auctionDelete: auctionDeleteReducer,
  auctionSubmit: auctionSubmitReducer,

  //bid related
  bidGetByAuctionId: bidGetByAuctionIdReducer,
  bidPostByAuctionId: bidPostByAuctionIdReducer,
});

const userInfoFromLocalStorage =
  localStorage.getItem('userInfo') != null
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
