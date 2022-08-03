import React from 'react';
import { Link } from 'react-router-dom';

const AuctionTopTrendingCard = ({ auctionId, name = 'Bidding Item' }) => {
  return (
    <div className='flex items-center justify-center py-2 mx-5 space-x-2 text-white'>
      <i className='fas fa-fire' />
      <Link to={`/auctions/${auctionId}`}>
        <h2 className='text-xs font-semibold uppercase'>{name}</h2>
      </Link>
    </div>
  );
};

export default AuctionTopTrendingCard;
