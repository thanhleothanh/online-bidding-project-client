import React from 'react';
import { Link } from 'react-router-dom';
import CountdownTimer from '../CountdownTimer';

const truncateTitle = (title) => {
  var length = 30;
  if (title.length > length) {
    title = title.substring(0, length) + '...';
  }
  return title;
};

const AuctionCard = ({
  id,
  name = 'Bidding Item',
  username,
  userId,
  timeStart,
  timeEnd,
  image,
}) => {
  return (
    <div className='flex w-full overflow-hidden text-gray-200 transition duration-300 ease-in-out bg-gray-800 rounded-md h-80 hover:-translate-y-1 hover:scale-95'>
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
      <div className='flex flex-col justify-around w-7/12 p-5 space-y-3 text-center'>
        <h2 className='text-lg font-semibold uppercase'>
          {truncateTitle(name)}
        </h2>
        <h3>
          <Link
            to={`/profiles/${userId}`}
            className='w-full hover:text-orange-500'
          >
            <i className='fas fa-user-circle' /> {username}
          </Link>
        </h3>
        <h3 className='w-full px-2 xl:px-5'>
          <CountdownTimer timeStart={timeStart} timeEnd={timeEnd} />
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
