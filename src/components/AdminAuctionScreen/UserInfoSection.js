import React from 'react';
import { Link } from 'react-router-dom';

const UserInfoSection = ({ auction }) => {
  return (
    <div className='flex flex-col w-full space-y-2'>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Username:</div>
        <div className='text-right'>
          <Link to={`/profiles/${auction.user.profile.id}`}>
            <span className='underline'>
              {auction.user
                ? auction.user.profile.username ?? 'n/a'
                : 'No user info found!'}
            </span>
          </Link>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Name:</div>
        <div className='text-right'>
          {auction.user
            ? auction.user.profile.name ?? 'n/a'
            : 'No user info found!'}
        </div>
      </div>
    </div>
  );
};

export default UserInfoSection;
