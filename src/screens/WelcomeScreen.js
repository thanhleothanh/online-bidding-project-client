import React, { Children, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AuctionCard from '../components/WelcomeScreen/AuctionCard';
import AuctionTopTrendingCard from '../components/WelcomeScreen/AuctionTopTrendingCard';
import Header from '../components/Header';
import Alert from './../components/Alert';
import Message from './../components/Message';
import Loader from './../components/Loader';
import {
  auctionGetOpenings,
  auctionGetTopTrending,
} from '../redux/actions/auctionActions';
import PagingButtons from '../components/PagingButtons';
import CategoryChooser from '../components/AdminAuctionScreen/CategoryChooser';
import { useTrail, a } from '@react-spring/web';

const Trail = ({ open, children }) => {
  const items = Children.toArray(children);
  useEffect(() => {}, [open]);
  const trail = useTrail(items.length, {
    config: { mass: 10, tension: 1500, friction: 250 },
    opacity: open ? 1 : 0,
    height: open ? 360 : 0,
    from: { opacity: 0, height: 0 },
  });
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <a.div
          key={index}
          className='overflow-hidden rounded-md trailsText'
          style={style}
        >
          <a.div style={{ height }}>{items[index]}</a.div>
        </a.div>
      ))}
    </div>
  );
};

const WelcomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);
  const [choosenCategory, setChoosenCategory] = useState(null);
  const [open, setOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    auctions: openingAuctions,
    page: pageOpeningAuctions,
    pageTotal: pageTotalOpeningAuctions,
    loading: loadingOpeningAuctions,
    error: errorOpeningAuctions,
  } = useSelector((state) => state.auctionGetOpenings);
  const {
    auctions: topTrendingAuctions,
    loading: loadingTopTrendingAuctions,
    error: errorTopTrendingAuctions,
  } = useSelector((state) => state.auctionGetTopTrending);

  useEffect(() => {
    if (userInfo && userInfo.role === 'ADMIN') history.push('/admin/auctions');
  }, [userInfo]);

  useEffect(() => {
    dispatch(auctionGetOpenings(currentPage, choosenCategory));
  }, [currentPage, choosenCategory]);

  useEffect(() => {
    dispatch(auctionGetTopTrending());
    setOpen(true);
  }, []);

  return (
    <div className='relative flex flex-col w-full h-auto p-5 space-y-1 xl:space-y-0 xl:space-x-5 xl:flex-row'>
      <div className='w-full h-auto xl:w-2/3'>
        <div className='flex invisible xl:visible'>
          <input
            type='search'
            id='search'
            name='search'
            placeholder='Search...'
            className='font-bold inputField'
          />
          <button className='w-24 font-bold bg-orange-600 rounded-l-none genericButton hover:bg-orange-700'>
            Search
          </button>
        </div>
        {/* buttons section */}
        <div className='flex justify-between pt-5'>
          <div className='space-x-2'>
            <CategoryChooser
              choosenCategory={choosenCategory}
              setChoosenCategory={setChoosenCategory}
            />
          </div>
          <div className='space-x-2'>
            <button
              className='genericButton'
              onClick={() => setChoosenCategory(null)}
            >
              <i className='fas fa-redo' />
            </button>
          </div>
        </div>
        {/* paging buttons */}
        <div className='mt-3'>
          {currentPage != null &&
            openingAuctions &&
            openingAuctions.length !== 0 && (
              <PagingButtons
                setCurrentPage={setCurrentPage}
                page={pageOpeningAuctions}
                pageTotal={pageTotalOpeningAuctions}
              />
            )}
        </div>
        {/* auction cards section */}
        <div className='w-full my-3'>
          {loadingOpeningAuctions ? (
            <Loader
              className={'py-3'}
              loader={Math.floor(Math.random() * 10 + 1)}
              color={Math.floor(Math.random() * 10 + 1)}
            />
          ) : errorOpeningAuctions ? (
            <Alert className={'mt-3'}>{errorOpeningAuctions}</Alert>
          ) : (
            <>
              {openingAuctions && openingAuctions.length === 0 ? (
                <Message type='info' className={'mt-3'}>
                  There is no auction with these criterias opening!
                </Message>
              ) : (
                <div className='w-full space-y-5 col lg:columns-2 columns-1'>
                  {openingAuctions &&
                    openingAuctions.map((auction) => {
                      return (
                        <Trail open={open}>
                          <AuctionCard
                            image={
                              auction.item.itemImages == null ||
                              auction.item.itemImages.length === 0
                                ? '/images/auction_img.jpg'
                                : auction.item.itemImages[0].imageUrl
                            }
                            key={auction.id}
                            id={auction.id}
                            name={auction.item.name}
                            timeStart={auction.timeStart}
                            timeEnd={auction.timeEnd}
                            username={auction.user.profile.username}
                            userId={auction.user.profile.id}
                          />
                        </Trail>
                      );
                    })}
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <div className='w-full xl:w-1/3'>
        <div className='absolute top-0 right-0 flex justify-end p-5 xl:static xl:p-0'>
          <Header />
        </div>
        {/* top trending section */}
        <div className='sticky w-full py-10 space-y-5 bg-gray-800 rounded-md top-5 xl:mt-5'>
          <h1 className='text-2xl font-bold text-center text-gray-200'>
            <i className='fas fa-angle-double-up' /> TOP TRENDING
          </h1>
          <div className='mx-24 border-t-2 border-orange-500' />

          {loadingTopTrendingAuctions ? (
            <Loader
              className={'py-3'}
              loader={Math.floor(Math.random() * 10 + 1)}
              color={Math.floor(Math.random() * 10 + 1)}
            />
          ) : errorTopTrendingAuctions ? (
            <Alert className={'mt-3'}>{errorTopTrendingAuctions}</Alert>
          ) : (
            <>
              {topTrendingAuctions && topTrendingAuctions.length === 0 ? (
                <Message type='info' className={'mx-10 mt-10'}>
                  There is no auction on trending!
                </Message>
              ) : (
                topTrendingAuctions &&
                topTrendingAuctions.length !== 0 && (
                  <>
                    {topTrendingAuctions.map((auction) => {
                      return (
                        <AuctionTopTrendingCard
                          key={auction.id}
                          auctionId={auction.id}
                          name={auction.itemName}
                        />
                      );
                    })}
                  </>
                )
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
