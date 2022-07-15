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
} from './redux/reducers/auctionReducers';

const reducer = combineReducers({
  //user related
  userLogin: userLoginReducer,
  userSignup: userSignupReducer,

  //auction related
  auctionGetOpenings: auctionGetOpeningsReducer,
  auctionGetTopTrending: auctionGetTopTrendingReducer,
});

const userInfoFromLocalStorage = localStorage.getItem('userInfo')
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
