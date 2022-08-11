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
  auctionPutReducer,
  auctionDeleteReducer,
  auctionSubmitReducer,
  //admin
  auctionAdminGetAllReducer,
  auctionAdminApproveReducer,
  //auction phase 2
  auctionGetUsersAuctionsReducer,
  auctionGetInterestedReducer,
  auctionCheckInterestedReducer,
  auctionDeleteInterestedReducer,
  auctionSaveInterestedReducer,
  auctionGetMyWinsReducer,
} from './redux/reducers/auctionReducers';
import {
  bidGetByAuctionIdReducer,
  bidPostByAuctionIdReducer,
} from './redux/reducers/bidReducers';
import {
  itemPutReducer,
  itemPostImageReducer,
  itemDeleteImageReducer,
  itemUploadImageReducer,
} from './redux/reducers/itemReducers';
import {
  profileGetMyProfileReducer,
  profileGetByIdReducer,
  profileUpdateInfoReducer,
  profileChangePasswordReducer,
  //admin
  profileAdminGetAllReducer,
  profileAdminBanReducer,
} from './redux/reducers/profileReducers';
import {
  reportPostReducer,
  //admin
  reportAdminGetAllReducer,
  reportAdminJudgeReducer,
  reportAdminDeleteReducer,
} from './redux/reducers/reportReducers';
import { notificationGetMyNotificationsReducer } from './redux/reducers/notificationReducers';

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
  auctionPut: auctionPutReducer,
  auctionDelete: auctionDeleteReducer,
  auctionSubmit: auctionSubmitReducer,
  //////////auction admin
  auctionAdminGetAll: auctionAdminGetAllReducer,
  auctionAdminApprove: auctionAdminApproveReducer,
  //////////auction phase 2
  auctionGetUsersAuctions: auctionGetUsersAuctionsReducer,
  auctionGetInterested: auctionGetInterestedReducer,
  auctionCheckInterested: auctionCheckInterestedReducer,
  auctionDeleteInterested: auctionDeleteInterestedReducer,
  auctionSaveInterested: auctionSaveInterestedReducer,
  auctionGetMyWins: auctionGetMyWinsReducer,

  //bid related
  bidGetByAuctionId: bidGetByAuctionIdReducer,
  bidPostByAuctionId: bidPostByAuctionIdReducer,

  //item related
  itemPut: itemPutReducer,
  itemPostImage: itemPostImageReducer,
  itemDeleteImage: itemDeleteImageReducer,
  itemUploadImage: itemUploadImageReducer,

  //profile related
  profileGetMyProfile: profileGetMyProfileReducer,
  profileGetById: profileGetByIdReducer,
  profileUpdateInfo: profileUpdateInfoReducer,
  profileChangePassword: profileChangePasswordReducer,
  /////////////profile admin
  profileAdminGetAll: profileAdminGetAllReducer,
  profileAdminBan: profileAdminBanReducer,

  //report related
  reportPost: reportPostReducer,
  ////////////report admin
  reportAdminGetAll: reportAdminGetAllReducer,
  reportAdminJudge: reportAdminJudgeReducer,
  reportAdminDelete: reportAdminDeleteReducer,

  //notification related
  notificationGetMyNotifications: notificationGetMyNotificationsReducer,
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
