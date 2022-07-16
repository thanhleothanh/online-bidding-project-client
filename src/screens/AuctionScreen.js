import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import {
  bidGetByAuctionId,
  auctionGetById,
} from '../redux/actions/auctionActions';
import Alert from './../components/Alert';
import Loader from './../components/Loader';
import Message from './../components/Message';
import DateToTimer from '../utils/DateToTimer';
import ToPrice from '../utils/ToPrice';

const AuctionScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    auction: currentAuction,
    loading: loadingCurrentAuction,
    error: errorCurrentAuction,
  } = useSelector((state) => state.auctionGetById);
  const {
    bids: currentAuctionBids,
    loading: loadingCurrentAuctionBids,
    error: errorCurrentAuctionBids,
  } = useSelector((state) => state.bidGetByAuctionId);
  const location = useLocation();
  const auctionId = location.pathname
    ? location.pathname.split('/auctions/')[1]
    : undefined;

  useEffect(() => {
    if (!userInfo) history.push('/login');
  }, [userInfo]);

  useEffect(() => {
    if (auctionId == undefined) history.push('/');
    else {
      dispatch(auctionGetById(auctionId));
      dispatch(bidGetByAuctionId(auctionId));
    }
  }, [auctionId]);

  return (
    <div className='flex flex-col w-full h-auto min-h-screen p-5'>
      {/* header section */}
      <div className='flex w-full'>
        <div className='w-full h-full xl:w-2/3'>
          <Link to='/'>
            <button className='genericButton'>
              <i className='fas fa-arrow-left' />
            </button>
          </Link>
        </div>
        <div className='w-full xl:w-1/3'>
          <div className='flex justify-end'>
            <Header />
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full h-full mt-5 lg:space-x-10 lg:flex-row'>
        {loadingCurrentAuction ? (
          <Loader
            className='mt-3'
            loader={Math.floor(Math.random() * 10 + 1)}
            color={Math.floor(Math.random() * 10 + 1)}
          />
        ) : errorCurrentAuction ? (
          <Alert className='mt-3'>{errorCurrentAuction}</Alert>
        ) : (
          currentAuction && (
            <>
              {/* item images */}
              <div className='flex flex-col w-full h-auto space-y-5 lg:w-2/5'>
                {currentAuction.item.itemImages.length === 0 ? (
                  <img
                    className='object-cover rounded-md'
                    src='/images/auction_img.jpg'
                  />
                ) : (
                  currentAuction.item.itemImages.map((itemImage) => {
                    return (
                      <img
                        key={itemImage.id}
                        className='object-cover rounded-md'
                        onError={({ currentTarget }) => {
                          currentTarget.onerror = null;
                          currentTarget.src = '/images/auction_img.jpg';
                        }}
                        src={`${
                          itemImage.imageUrl || '/images/auction_img.jpg'
                        }`}
                      />
                    );
                  })
                )}
              </div>
              <div className='flex flex-col w-full h-full mt-10 lg:mt-0 lg:w-3/5'>
                <div className='space-y-5 lg:sticky lg:top-5'>
                  {/* countdown timer */}
                  <div className='text-2xl font-bold text-gray-200'>
                    {currentAuction && (
                      <DateToTimer
                        timeStart={currentAuction.timeStart}
                        timeEnd={currentAuction.timeEnd}
                      />
                    )}
                  </div>
                  {/* item and user info */}
                  <div className='flex items-center justify-between '>
                    <h1 className='text-xl font-bold text-gray-200 uppercase'>
                      <i className='fab fa-product-hunt' />{' '}
                      {currentAuction.item.name}
                    </h1>
                    <h3 className='text-xl italic font-medium text-gray-200'>
                      <i className='fas fa-user-circle' />{' '}
                      {currentAuction.user.profile.username}
                    </h3>
                  </div>
                  <h2 className='text-xl font-medium text-orange-400 '>
                    <i className='fas fa-comment' />{' '}
                    {currentAuction.item.description}
                  </h2>
                  {/* raise bids */}
                  <form>
                    <div className='flex'>
                      <input
                        type='text'
                        className='inputField'
                        placeholder='Name your price!'
                      />
                      <button className='w-40 font-bold bg-orange-600 rounded-l-none genericButton hover:bg-orange-700'>
                        Raise price!
                      </button>
                    </div>
                  </form>
                  {/* bids table */}
                  <table className='w-full table-fixed'>
                    <thead className='text-gray-200'>
                      <tr>
                        <th className='w-3/12 py-3 bg-gray-700 rounded-tl-md'>
                          <i className='fas fa-users fa-lg' />
                        </th>
                        <th className='w-3/12 py-3 bg-gray-700 '>
                          <i className='fas fa-dollar-sign fa-lg' />
                        </th>
                        <th className='w-6/12 py-3 bg-gray-700 rounded-tr-md'>
                          <i className='fas fa-stopwatch' />
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {loadingCurrentAuctionBids ? (
                        <Loader
                          className='mt-3'
                          loader={Math.floor(Math.random() * 10 + 1)}
                          color={Math.floor(Math.random() * 10 + 1)}
                        />
                      ) : errorCurrentAuctionBids ? (
                        <Alert className='mt-3'>
                          {errorCurrentAuctionBids}
                        </Alert>
                      ) : (
                        <>
                          {currentAuctionBids &&
                          currentAuctionBids.length === 0 ? (
                            <Message type='info' className='mx-10 mt-10'>
                              Be the first to raise the price!
                            </Message>
                          ) : (
                            <>
                              {currentAuctionBids &&
                                currentAuctionBids.map((bid, index) => {
                                  return (
                                    <tr>
                                      <td
                                        className={`py-2 text-center ${
                                          index === 0
                                            ? 'text-orange-600'
                                            : 'text-gray-200'
                                        } bg-gray-700`}
                                      >
                                        {bid.user.profile.name}
                                      </td>
                                      <td
                                        className={`py-2 text-center ${
                                          index === 0
                                            ? 'text-orange-600'
                                            : 'text-gray-200'
                                        } bg-gray-700`}
                                      >
                                        {ToPrice(bid.price)}
                                      </td>
                                      <td
                                        className={`py-2 text-center ${
                                          index === 0
                                            ? 'text-orange-600'
                                            : 'text-gray-200'
                                        } bg-gray-700`}
                                      >
                                        {bid.createdAt.split('T').join(' ')}
                                      </td>
                                    </tr>
                                  );
                                })}
                            </>
                          )}
                        </>
                      )}
                      <tr>
                        <td className='py-2 bg-gray-700 rounded-bl-md'></td>
                        <td className='py-2 bg-gray-700 '></td>
                        <td className='py-2 bg-gray-700 rounded-br-md'></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default AuctionScreen;
