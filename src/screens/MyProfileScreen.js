import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auctionGetMyWins } from '../redux/actions/auctionActions';
import MyProfileInfo from '../components/MyProfileScreen/MyProfileInfo';
import Header from '../components/Header';
import Alert from './../components/Alert';
import Message from './../components/Message';
import Loader from './../components/Loader';
import ItemInfoSection from '../components/AdminAuctionScreen/ItemInfoSection';
import AuctionInfoSection from '../components/AdminAuctionScreen/AuctionInfoSection';
import UserInfoSection from '../components/AdminAuctionScreen/UserInfoSection';
import { profileGetMyProfile } from '../redux/actions/profileActions';

const MyProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    auctions: myWonAuctions,
    loading: loadingMyWonAuctions,
    error: errorMyWonAuctions,
  } = useSelector((state) => state.auctionGetMyWins);

  useEffect(() => {
    if (!userInfo) history.push('/login');
    if (userInfo) dispatch(profileGetMyProfile());
    if (userInfo && userInfo.role === 'USER') {
      dispatch(auctionGetMyWins());
    }
  }, [userInfo]);

  return (
    <>
      {userInfo && (
        <div className='relative flex flex-col w-full h-auto min-h-screen p-5 space-y-5 animate-fadeIn'>
          <div className='flex w-full'>
            <div className='w-full h-full xl:w-2/3'>
              <div>
                <button className='genericButton' onClick={history.goBack}>
                  <i className='fas fa-arrow-left' />
                </button>
              </div>
            </div>
            <div className='w-full xl:w-1/3'>
              <div className='absolute top-0 right-0 flex justify-end p-5 xl:static xl:p-0'>
                <Header />
              </div>
            </div>
          </div>
          <div className='flex flex-col w-full h-auto my-5 space-y-5 xl:flex-row xl:space-x-5 xl:space-y-0'>
            <div
              className={`${
                userInfo.role === 'ADMIN' ? 'w-none' : 'w-full xl:w-3/4'
              }`}
            >
              {userInfo && userInfo.role === 'USER' && (
                <div className='w-full bg-gray-800 rounded-md'>
                  <h1 className='py-5 text-lg font-bold text-left text-gray-200 pl-7 xl:text-xl'>
                    <i className='fas fa-coins' /> Your won auctions
                  </h1>
                  {loadingMyWonAuctions ? (
                    <Loader
                      className={'py-3'}
                      loader={Math.floor(Math.random() * 10 + 1)}
                      color={Math.floor(Math.random() * 10 + 1)}
                    />
                  ) : errorMyWonAuctions ? (
                    <Alert className={'mt-3'}>{errorMyWonAuctions}</Alert>
                  ) : (
                    <>
                      <tr className='sticky top-0 flex w-full text-gray-100 bg-orange-600 rounded-t-md'>
                        <th className='w-1/12 py-7'>ID</th>
                        <th className='w-2/12 py-7'>User Info</th>
                        <th className='w-9/12 py-7'>Auction Info</th>
                      </tr>
                      <div className='w-full overflow-hidden rounded-md'>
                        <table className='w-full overflow-x-auto table-fixed'>
                          <thead>
                            <tr>
                              <th className='w-1/12'></th>
                              <th className='w-2/12'></th>
                              <th className='w-9/12'></th>
                            </tr>
                          </thead>
                          <tbody>
                            {myWonAuctions &&
                              myWonAuctions.length !== 0 &&
                              myWonAuctions.map((auction) => {
                                return (
                                  <tr
                                    className='text-center text-gray-200 bg-gray-700 border-orange-500 border-y-2'
                                    key={auction.id}
                                  >
                                    <td className='py-10'>{auction.id}</td>
                                    <td className='py-10 lg:px-5'>
                                      <UserInfoSection auction={auction} />
                                    </td>
                                    <td className='flex flex-col py-10 lg:px-5'>
                                      <AuctionInfoSection auction={auction} />
                                      <br />
                                      <ItemInfoSection auction={auction} />
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                        {myWonAuctions && myWonAuctions.length === 0 && (
                          <Message type='info' className={'w-full'}>
                            You have't won any auction!
                          </Message>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
            <div
              className={`${
                userInfo.role === 'ADMIN' ? 'w-full' : 'w-full xl:w-1/4'
              }`}
            >
              <MyProfileInfo />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyProfileScreen;
