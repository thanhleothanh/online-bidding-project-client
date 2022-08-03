import React from 'react';
import { Link } from 'react-router-dom';
import generateNotification from '../utils/generateNotification';
import toTimePassed from '../utils/toTimePassed';

const AuctionCard = ({ notification }) => {
  return (
    <div className='flex w-full h-auto text-gray-200 bg-gray-800 border-t-2 border-gray-700'>
      <div className='flex items-center justify-center w-2/12 mx-1'>
        {notification.notificationAuction !== null && (
          <i className='fas fa-piggy-bank' />
        )}
        {notification.notificationReport !== null && (
          <i className='fas fa-balance-scale-right' />
        )}
      </div>
      <div className='flex flex-col w-10/12 py-3 space-y-1'>
        <div className='pr-5 font-semibold text-left'>
          {generateNotification(notification)}
        </div>
        <div className='text-xs font-medium text-orange-500'>
          {toTimePassed(notification.updatedAt)}
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AuctionCard;
