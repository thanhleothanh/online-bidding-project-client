import React from 'react';
import { Link } from 'react-router-dom';

const AuctionCard = ({
  id,
  name = 'Bidding Item',
  username,
  timeEnd,
  image = '/images/auction_img.jpg',
}) => {
  return (
    <div className='flex w-full text-gray-200 bg-gray-800 rounded-md h-96'>
      <div className='w-2/5 h-full'>
        <img
          src={image}
          className='flex object-cover w-full h-full bg-gray-600 rounded-l-md'
        ></img>
      </div>
      <div className='flex flex-col justify-around w-3/5 px-2 py-5 space-y-3 text-center'>
        <h2 className='text-xl font-bold'>{name}</h2>
        <h3>
          <i className='fas fa-user' /> {username}
        </h3>
        <h3>
          <i className='fas fa-clock' /> {timeEnd.split('T').join(' ')}
        </h3>
        <div className='flex justify-around'>
          <Link to={`/auctions/${id}`}>
            <button className='bg-orange-600 1 hover:bg-orange-700 genericButton'>
              Join
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
