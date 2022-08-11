import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../Loader';
import Alert from '../Alert';
import ModalUpdateProfile from './ModalUpdateProfile';

const MyProfileInfo = () => {
  const [modalUpdateProfile, setModalUpdateProfile] = useState(false);
  const {
    profile: myProfile,
    loading: loadingMyProfile,
    error: errorMyProfile,
  } = useSelector((state) => state.profileGetMyProfile);
  return (
    <>
      {loadingMyProfile ? (
        <Loader
          className={'py-3'}
          loader={Math.floor(Math.random() * 10 + 1)}
          color={Math.floor(Math.random() * 10 + 1)}
        />
      ) : errorMyProfile ? (
        <Alert className={'mt-3'}>{errorMyProfile}</Alert>
      ) : (
        myProfile && (
          <div className='sticky top-5'>
            <div className='w-full py-5 text-lg font-bold text-left text-gray-200 bg-orange-600 shadow-md xl:text-xl rounded-t-md pl-7'>
              About you
            </div>
            <div className='flex flex-col w-full px-8 pt-6 pb-8 mb-3 bg-gray-800 shadow-sm rounded-b-md'>
              <div>
                <label className='labelField'>Bio</label>
                <input
                  className='bg-opacity-25 inputField'
                  id='bio'
                  value={myProfile.bio ?? 'n/a'}
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
                  value={myProfile.username}
                  type='text'
                  disabled
                  readOnly
                />
              </div>
              <div className='mt-2'>
                <label className='labelField'>Name</label>
                <input
                  className='bg-opacity-25 inputField'
                  id='name'
                  value={myProfile.name}
                  type='text'
                  disabled
                  readOnly
                />
              </div>
              <div className='mt-2'>
                <label className='labelField'>Email</label>
                <input
                  className='bg-opacity-25 inputField'
                  id='email'
                  value={myProfile.email ?? 'n/a'}
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
                  value={myProfile.status}
                  type='text'
                  disabled
                  readOnly
                />
              </div>
              <div className='mt-2'>
                <label className='labelField'>Legitimate Score</label>
                <input
                  className='bg-opacity-25 inputField'
                  id='legitimateScore'
                  value={myProfile.legitimateScore}
                  type='number'
                  disabled
                  readOnly
                />
              </div>
              <div className='flex items-center justify-between mt-5 outline-none'>
                <button
                  className='w-full font-semibold bg-orange-600 genericButton hover:bg-orange-700'
                  onClick={() => setModalUpdateProfile(true)}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        )
      )}
      <ModalUpdateProfile
        isShow={modalUpdateProfile}
        closeModal={() => setModalUpdateProfile(false)}
      />
    </>
  );
};

export default MyProfileInfo;
