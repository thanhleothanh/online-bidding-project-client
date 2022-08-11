import React from 'react';
import { useSelector } from 'react-redux';
import Alert from '../Alert';
import Loader from '../Loader';

const ProfileForm = () => {
  const {
    profile: getProfileById,
    loading: loadingGetProfileById,
    error: errorGetProfileById,
  } = useSelector((state) => state.profileGetById);

  return (
    <div>
      <div className='w-full py-5 text-lg font-bold text-left text-gray-200 bg-orange-600 shadow-md xl:text-xl rounded-t-md pl-7'>
        About this person
      </div>
      {loadingGetProfileById ? (
        <Loader
          className={'py-3'}
          loader={Math.floor(Math.random() * 10 + 1)}
          color={Math.floor(Math.random() * 10 + 1)}
        />
      ) : errorGetProfileById ? (
        <Alert>{errorGetProfileById}</Alert>
      ) : (
        getProfileById && (
          <form className='flex flex-col w-full px-8 pt-6 pb-8 mb-3 bg-gray-800 shadow-sm rounded-b-md'>
            <div>
              <label className='labelField'>Bio</label>
              <input
                className='bg-opacity-25 inputField'
                id='username'
                value={getProfileById.bio ?? 'n/a'}
                type='text'
                disabled
                readOnly
              />
            </div>
            <div className='mt-2'>
              <label className='labelField'>Username</label>
              <input
                className='bg-opacity-25 inputField'
                id='username'
                value={getProfileById.username}
                type='text'
                disabled
                readOnly
              />
            </div>
            <div className='mt-2'>
              <label className='labelField'>Email</label>
              <input
                className='bg-opacity-25 inputField'
                id='name'
                value={getProfileById.email ?? 'n/a'}
                type='email'
                disabled
                readOnly
              />
            </div>
            <div className='mt-2'>
              <label className='labelField'>Name</label>
              <input
                className='bg-opacity-25 inputField'
                id='name'
                value={getProfileById.name}
                type='text'
                disabled
                readOnly
              />
            </div>
            <div className='mt-2'>
              <label className='labelField'>Status</label>
              <input
                className='bg-opacity-25 inputField'
                id='status'
                value={getProfileById.status}
                type='text'
                disabled
                readOnly
              />
            </div>
            <div className='mt-2'>
              <label className='labelField'>Legitimate Score</label>
              <input
                className='bg-opacity-25 inputField'
                id='status'
                value={getProfileById.legitimateScore}
                type='number'
                disabled
                readOnly
              />
            </div>
          </form>
        )
      )}
    </div>
  );
};

export default ProfileForm;
