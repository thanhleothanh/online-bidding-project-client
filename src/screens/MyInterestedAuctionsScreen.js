import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import { auctionGetInterested } from '../redux/actions/auctionActions';
import Header from '../components/Header';
import Alert from './../components/Alert';
import Message from './../components/Message';
import Loader from './../components/Loader';
import ItemInfoSection from '../components/AdminAuctionScreen/ItemInfoSection';
import AuctionInfoSection from '../components/AdminAuctionScreen/AuctionInfoSection';
import CountdownTimer from '../components/CountdownTimer';
import UserInfoSection from '../components/AdminAuctionScreen/UserInfoSection';

const MyInterestedAuctionsScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    auctions: myInterestedAuctions,
    loading: loadingMyInterestedAuctions,
    error: errorMyInterestedAuctions,
  } = useSelector((state) => state.auctionGetInterested);

  useEffect(() => {
    if (!userInfo) history.push('/login');
    if (userInfo && userInfo.role === 'ADMIN') history.push('/admin/auctions');
    if (userInfo) dispatch(auctionGetInterested());
  }, [userInfo]);

  return (
    <>
      {userInfo ? (
        <div className='relative flex flex-col w-full h-auto min-h-screen p-5 space-y-5 animate-fadeIn'>
          <div className='flex w-full'>
            <div className='w-full h-full xl:w-2/3'>
              <div className='flex invisible xl:visible'>
                <input
                  type='search'
                  id='search'
                  name='search'
                  placeholder='Search...'
                  className='font-bold rounded-md inputField'
                />
              </div>
            </div>
            <div className='w-full xl:w-1/3'>
              <div className='absolute top-0 right-0 flex justify-end p-5 xl:static xl:p-0'>
                <Header />
              </div>
            </div>
          </div>
          <div className='w-full my-5'>
            {/* buttons section */}
            <div className='flex justify-between mb-5'>
              <div className='font-semibold genericButton hover:bg-gray-800'>
                Opening auctions that you are interested in!
              </div>
            </div>
            {/* auctions table section */}
            {loadingMyInterestedAuctions ? (
              <Loader
                className={'py-3'}
                loader={Math.floor(Math.random() * 10 + 1)}
                color={Math.floor(Math.random() * 10 + 1)}
              />
            ) : errorMyInterestedAuctions ? (
              <Alert className={'mt-3'}>{errorMyInterestedAuctions}</Alert>
            ) : (
              <>
                <tr className='sticky top-0 flex w-full text-gray-100 bg-orange-600 rounded-t-md'>
                  <th className='w-1/12 py-7'>ID</th>
                  <th className='w-3/12 py-7'>User Info</th>
                  <th className='w-4/12 py-7'>Auction Info</th>
                  <th className='w-5/12 py-7'>Auction Item</th>
                  <th className='w-1/12 py-7'></th>
                </tr>
                <div className='w-full overflow-hidden rounded-md'>
                  <table className='w-full overflow-x-auto table-fixed '>
                    <thead>
                      <tr>
                        <th className='w-1/12'></th>
                        <th className='w-3/12'></th>
                        <th className='w-4/12'></th>
                        <th className='w-5/12'></th>
                        <th className='w-1/12'></th>
                      </tr>
                    </thead>
                    <tbody>
                      {myInterestedAuctions &&
                        myInterestedAuctions.length !== 0 &&
                        myInterestedAuctions.map((auction) => {
                          return (
                            <tr
                              className='text-center text-gray-200 bg-gray-700 border-orange-500 border-y-2'
                              key={auction.id}
                            >
                              <td className='py-10'>{auction.id}</td>
                              <td className='py-10 lg:px-5'>
                                <UserInfoSection auction={auction} />
                              </td>
                              <td className='py-10 space-y-5 lg:px-5'>
                                <AuctionInfoSection auction={auction} />
                                <CountdownTimer
                                  timeStart={auction.timeStart}
                                  timeEnd={auction.timeEnd}
                                />
                              </td>
                              <td className='py-10 lg:px-5'>
                                <ItemInfoSection auction={auction} />
                              </td>
                              <td className='py-10 lg:px-5'>
                                <Link to={`/auctions/${auction.id}`}>
                                  <button data-for='join' data-tip='Join Now'>
                                    <i className='fas fa-sign-in fa-lg hover:text-orange-500' />
                                  </button>
                                  <ReactTooltip
                                    id='join'
                                    place='top'
                                    effect='float'
                                  />
                                </Link>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                  {myInterestedAuctions && myInterestedAuctions.length === 0 && (
                    <Message type='info' className={'w-full'}>
                      You haven't been interested in any opening auctions!
                    </Message>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MyInterestedAuctionsScreen;
