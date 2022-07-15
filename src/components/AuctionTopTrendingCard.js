import React from 'react';

const AuctionTopTrendingCard = ({
  name = 'Bidding Item',
  image = '/images/auction_img.jpg',
}) => {
  return (
    <div className='flex items-center justify-start mx-16 space-x-2 text-white xl:mx-10'>
      <img
        src={image}
        className='object-cover bg-gray-600 rounded-full w-14 h-14'
      ></img>
      <h2 className='text-lg font-medium'>{name}</h2>
    </div>
  );
};

export default AuctionTopTrendingCard;
