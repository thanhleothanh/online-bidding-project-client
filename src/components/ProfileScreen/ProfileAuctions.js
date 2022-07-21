import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { auctionGetUsersAuctions } from '../../redux/actions/auctionActions';
import Alert from '../../components/Alert';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ItemInfoSection from '../../components/MyAuctionsScreen/ItemInfoSection';
import AuctionInfoSection from '../../components/MyAuctionsScreen/AuctionInfoSection';

const ProfileAuctions = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const userId = location.pathname
    ? location.pathname.split('profiles/')[1]
    : undefined;

  const {
    auctions: usersAuctions,
    loading: loadingUsersAuctions,
    error: errorUsersAuctions,
  } = useSelector((state) => state.auctionGetUsersAuctions);

  useEffect(() => {
    dispatch(auctionGetUsersAuctions(userId));
  }, []);

  return (
    <div className='w-full pt-5 space-y-5 bg-gray-800 rounded-md'>
      <h1 className='text-lg font-bold text-left text-gray-200 pl-7 xl:text-xl'>
        <i className='fas fa-coins' /> This person's auctions
      </h1>
      <div className='w-full overflow-auto rounded-md scrollbar-thin'>
        <table className='w-full table-fixed overflow-x-scoll'>
          {loadingUsersAuctions ? (
            <Loader
              className='mt-3'
              loader={Math.floor(Math.random() * 10 + 1)}
              color={Math.floor(Math.random() * 10 + 1)}
            />
          ) : errorUsersAuctions ? (
            <Alert className='mt-3'>{errorUsersAuctions}</Alert>
          ) : (
            <>
              <thead className='text-gray-100 bg-orange-600'>
                <tr className='border-2 border-orange-500'>
                  <th className='w-5/12 py-7'>Auction Info</th>
                  <th className='w-5/12 py-7'>Auction Item</th>
                </tr>
              </thead>
              <tbody>
                {usersAuctions &&
                  usersAuctions.length !== 0 &&
                  usersAuctions.map((auction) => {
                    return (
                      <tr className='text-center text-gray-200 bg-gray-700 border-2 border-orange-500'>
                        <td className='px-5 py-10'>
                          <AuctionInfoSection auction={auction} />
                        </td>
                        <td className='px-5 py-10'>
                          <ItemInfoSection auction={auction} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </>
          )}
        </table>
        {usersAuctions && usersAuctions.length === 0 && (
          <Message type='info' className='w-full '>
            This person havent had any auction!
          </Message>
        )}
      </div>
    </div>
  );
};

export default ProfileAuctions;
