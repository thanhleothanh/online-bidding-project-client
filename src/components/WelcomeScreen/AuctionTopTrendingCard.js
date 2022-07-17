import React from 'react';
import { Link } from 'react-router-dom';

const AuctionTopTrendingCard = ({
  auctionId,
  name = 'Bidding Item',
  image = '/images/auction_img.jpg',
}) => {
  return (
    <div className='flex items-center justify-center mx-5 space-x-2 text-white'>
      <img
        src={image}
        className='object-cover bg-gray-600 rounded-full w-14 h-14'
      ></img>
      <Link to={`/auctions/${auctionId}`}>
        <h2 className='text-xs font-semibold uppercase'>{name}</h2>
      </Link>
    </div>
  );
};

export default AuctionTopTrendingCard;
