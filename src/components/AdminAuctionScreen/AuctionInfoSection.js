import React from 'react';
import toPrice from '../../utils/toPrice';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AuctionInfoSection = ({ auction }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <div className='flex flex-col w-full space-y-2'>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Category:</div>
        <div className='text-right'>
          {auction.category ? auction.category.name ?? null : 'null'}
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Description:</div>
        <div className='text-right'>{auction.description ?? null}</div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Status:</div>
        <div className='text-right'>{auction.status ?? null}</div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Start Time:</div>
        <div className='text-right'>{auction.timeStart ?? null}</div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>End Time:</div>
        <div className='text-right'>{auction.timeEnd ?? null}</div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Start Price:</div>
        <div className='text-right'>{toPrice(auction.priceStart) ?? null}</div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Price Step:</div>
        <div className='text-right'>{toPrice(auction.priceStep) ?? null}</div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Highest Price:</div>
        <div className='text-right'>
          {toPrice(auction.highestPrice) ?? null}
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Created At:</div>
        {auction.createdAt ?? null}
      </div>
      {userInfo && auction.winner && (
        <div className='flex justify-between'>
          <div className='font-semibold text-left text-orange-500'>Winner</div>
          <Link to={`/profiles/${auction.winner.bid.user.profile.id}`}>
            <div className='text-orange-500 underline'>
              {auction.winner.bid.user.profile.username}
              {userInfo.id === auction.winner.bid.user.id && ' (You)'}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

export default AuctionInfoSection;
