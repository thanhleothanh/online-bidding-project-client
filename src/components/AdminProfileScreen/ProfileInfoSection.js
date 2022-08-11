import React from 'react';
import { Link } from 'react-router-dom';

const ProfileInfoSection = ({ profile }) => {
  return (
    <div className='flex flex-col w-full space-y-2'>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Username:</div>
        <div className='text-right'>
          <Link to={`/profiles/${profile.id}`}>
            <span className='underline hover:text-orange-500'>
              {profile.username}
            </span>
          </Link>
        </div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Email:</div>
        <div className='text-right'>{profile.email ?? 'n/a'}</div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Name:</div>
        <div className='text-right'>{profile.name}</div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Bio:</div>
        <div className='text-right'>{profile.bio ?? 'n/a'}</div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Status:</div>
        <div className='text-right'>{profile.status}</div>
      </div>
      <div className='flex justify-between'>
        <div className='font-semibold text-left'>Legitimate Score:</div>
        <div className='text-right'>{profile.legitimateScore}</div>
      </div>
    </div>
  );
};

export default ProfileInfoSection;
