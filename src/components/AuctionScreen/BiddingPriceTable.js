import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Alert from '../Alert';
import Loader from '../Loader';
import Message from '../Message';
import toPrice from '../../utils/toPrice';
import { connect, disconnect } from '../../utils/wsAuctionRoom';

const BiddingPriceTable = ({ auctionId }) => {
  const [auctionBids, setAuctionBids] = useState(null);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    bids: currentAuctionBids,
    loading: loadingCurrentAuctionBids,
    error: errorCurrentAuctionBids,
  } = useSelector((state) => state.bidGetByAuctionId);

  useEffect(() => {
    if (currentAuctionBids != null) {
      setAuctionBids(currentAuctionBids);
      connect(auctionId, auctionBids, setAuctionBids);
    }
    return () => {
      disconnect();
    };
  }, [currentAuctionBids]);

  return (
    <div className='overflow-auto rounded-md max-h-80 scrollbar-thin'>
      <table className='w-full h-full table-auto'>
        <thead className='text-gray-100 bg-gray-700'>
          <tr>
            <th className='w-4/12 py-5'>
              <i className='fas fa-users fa-lg' />
            </th>
            <th className='w-4/12 py-5'>
              <i className='fas fa-dollar-sign fa-lg' />
            </th>
            <th className='w-4/12 py-5'>
              <i className='fas fa-stopwatch' />
            </th>
          </tr>
        </thead>

        {userInfo && loadingCurrentAuctionBids ? (
          <Loader
            className='mt-3'
            loader={Math.floor(Math.random() * 10 + 1)}
            color={Math.floor(Math.random() * 10 + 1)}
          />
        ) : errorCurrentAuctionBids ? (
          <Alert className='mt-3'>{errorCurrentAuctionBids}</Alert>
        ) : (
          <>
            <tbody>
              {auctionBids &&
                auctionBids.length !== 0 &&
                auctionBids.map((bid, index) => {
                  return (
                    <tr key={bid.id} className='bg-gray-700'>
                      <td
                        className={`py-2 text-center ${
                          index === 0
                            ? 'text-orange-600 text-lg font-semibold'
                            : 'text-gray-200'
                        }`}
                      >
                        {userInfo.id === bid.user.profile.id
                          ? bid.user.profile.username + ' (You)'
                          : bid.user.profile.username}
                      </td>
                      <td
                        className={`py-2 text-center ${
                          index === 0
                            ? 'text-orange-600 text-lg font-semibold'
                            : 'text-gray-200'
                        }`}
                      >
                        {toPrice(bid.price)}
                      </td>
                      <td
                        className={`py-2 text-center ${
                          index === 0
                            ? 'text-orange-600 text-lg font-semibold'
                            : 'text-gray-200'
                        }`}
                      >
                        {bid.createdAt.substring(0, 19).split('T').join(' ')}
                      </td>
                    </tr>
                  );
                })}
              <tr>
                <td className='py-2 bg-gray-700'></td>
                <td className='py-2 bg-gray-700'></td>
                <td className='py-2 bg-gray-700'></td>
              </tr>
            </tbody>
          </>
        )}
      </table>
      {auctionBids && auctionBids.length === 0 && (
        <Message type='info' className='w-full '>
          No one placed a bid yet! :(
        </Message>
      )}
    </div>
  );
};

export default BiddingPriceTable;
