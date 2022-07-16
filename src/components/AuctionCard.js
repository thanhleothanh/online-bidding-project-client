import React from 'react';
import { Link } from 'react-router-dom';
import DateToTimer from '../utils/DateToTimer';

const AuctionCard = ({
  id,
  name = 'Bidding Item',
  username,
  timeStart,
  timeEnd,
  image,
}) => {
  return (
    <div className='flex w-full text-gray-200 bg-gray-800 rounded-md h-80'>
      <div className='w-5/12 h-full'>
        <img
          src={image}
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = '/images/auction_img.jpg';
          }}
          className='flex object-cover w-full h-full bg-gray-600 rounded-l-md'
        ></img>
      </div>
      <div className='flex flex-col justify-around w-7/12 px-3 py-5 space-y-3 text-center'>
        <h2 className='text-xl font-semibold uppercase'>{name}</h2>
        <h3>
          <i className='fas fa-user' /> {username}
        </h3>
        <h3 className='w-full px-5'>
          <DateToTimer timeStart={timeStart} timeEnd={timeEnd} />
        </h3>
        <div className='flex justify-around'>
          <Link to={`/auctions/${id}`}>
            <button className='font-semibold bg-orange-600 1 hover:bg-orange-700 genericButton'>
              Join
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuctionCard;
