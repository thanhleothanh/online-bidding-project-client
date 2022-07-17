import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { auctionGetById } from '../redux/actions/auctionActions';
import {
  bidGetByAuctionId,
  bidPostByAuctionId,
} from '../redux/actions/bidActions';
import Header from '../components/Header';
import BiddingPriceTable from './../components/AuctionScreen/BiddingPriceTable';
import Alert from './../components/Alert';
import Loader from './../components/Loader';
import CountdownTimer from '../components/CountdownTimer';
import toPrice from '../utils/toPrice';
import notify from '../utils/notify';

const AuctionScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [biddingPrice, setBiddingPrice] = useState(0);
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    auction: currentAuction,
    loading: loadingCurrentAuction,
    error: errorCurrentAuction,
  } = useSelector((state) => state.auctionGetById);

  const {
    bid: postBid,
    loading: loadingPostBid,
    error: errorPostBid,
  } = useSelector((state) => state.bidPostByAuctionId);
  useEffect(() => {
    if (!loadingPostBid && (postBid !== null || errorPostBid)) {
      if (postBid) notify(false, 'Trả giá thành công!');
      else notify(true, errorPostBid);
      dispatch({ type: 'BID_POST_BY_AUCTION_ID_RESET' });
    }
  }, [loadingPostBid]);

  const location = useLocation();
  const auctionId = location.pathname
    ? location.pathname.split('auctions/')[1]
    : undefined;

  useEffect(() => {
    if (!userInfo) history.push('/entry');
  }, [userInfo]);

  useEffect(() => {
    if (auctionId == undefined) history.push('/');
    else {
      dispatch(auctionGetById(auctionId));
      dispatch(bidGetByAuctionId(auctionId));
    }
  }, [auctionId]);

  useEffect(() => {
    if (auctionId == undefined) history.push('/');
    else {
      dispatch(auctionGetById(auctionId));
      dispatch(bidGetByAuctionId(auctionId));
    }
  }, []);

  const postBidHandler = () => {
    if (window.confirm('Are you sure to post this bidding price?')) {
      dispatch(bidPostByAuctionId(auctionId, { price: biddingPrice * 1 }));
      setBiddingPrice(0);
    }
  };

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
          userInfo &&
          currentAuction && (
            <>
              {/* item images section*/}
              <div className='flex flex-col w-full h-auto space-y-5 lg:w-2/5'>
                {currentAuction.item.itemImages.length === 0 ? (
                  <>
                    <img
                      className='object-cover rounded-md'
                      src='/images/auction_img.jpg'
                    />
                    <img
                      className='object-cover rounded-md'
                      src='/images/auction_img.jpg'
                    />
                    <img
                      className='object-cover rounded-md'
                      src='/images/auction_img.jpg'
                    />
                    <img
                      className='object-cover rounded-md'
                      src='/images/auction_img.jpg'
                    />
                  </>
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
              {/* infomation section */}
              <div className='flex flex-col w-full h-full mt-10 lg:mt-0 lg:w-3/5'>
                <div className='space-y-5 lg:sticky lg:top-5'>
                  {/* countdown timer */}
                  <div className='text-2xl font-bold text-gray-200'>
                    {currentAuction && (
                      <CountdownTimer
                        timeStart={currentAuction.timeStart}
                        timeEnd={currentAuction.timeEnd}
                      />
                    )}
                  </div>
                  {/* item and user info */}
                  <h3 className='text-xl italic font-medium text-gray-200'>
                    <i className='fas fa-user-circle' />{' '}
                    {currentAuction.user.profile.id === userInfo.id
                      ? 'Your Auction'
                      : currentAuction.user.profile.username}
                  </h3>
                  <h1 className='text-xl font-bold text-gray-200 uppercase'>
                    <i className='fab fa-product-hunt' />{' '}
                    {currentAuction.item.name}
                  </h1>
                  <h2 className='text-xl font-medium text-gray-200'>
                    <i className='fas fa-comment' />{' '}
                    {currentAuction.item.description}
                  </h2>
                  <h3 className='italic font-medium text-right text-gray-200'>
                    Start price: {toPrice(currentAuction.priceStart)}
                  </h3>
                  <h3 className='italic font-medium text-right text-gray-200'>
                    Price step: {toPrice(currentAuction.priceStep)}
                  </h3>
                  {/* raise bids */}
                  <div
                    className={`${
                      currentAuction.user.profile.id === userInfo.id
                        ? 'hidden'
                        : 'flex'
                    } w-full`}
                  >
                    <input
                      onChange={(e) => setBiddingPrice(e.target.value)}
                      type='number'
                      value={biddingPrice || 0}
                      className='w-1/2 appearance-none inputField'
                      placeholder='Name your price!'
                    />
                    <button
                      onClick={postBidHandler}
                      className='w-1/2 font-bold bg-orange-600 rounded-l-none genericButton hover:bg-orange-700'
                    >
                      Go with {toPrice(biddingPrice * 1)}
                    </button>
                  </div>
                  {/* bids table */}
                  {auctionId && <BiddingPriceTable auctionId={auctionId} />}
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
