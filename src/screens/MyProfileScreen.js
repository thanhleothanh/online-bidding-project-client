import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MyProfileInfo from '../components/MyProfileScreen/MyProfileInfo';
import Header from '../components/Header';
import ProfileAuctions from '../components/ProfileScreen/ProfileAuctions';

const MyProfileScreen = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (!userInfo) history.push('/login');
  }, [userInfo]);
  return (
    <div className='relative flex flex-col w-full h-auto min-h-screen p-5 space-y-5'>
      <div className='flex w-full'>
        <div className='w-full h-full xl:w-2/3'>
          <div>
            <Link to='/'>
              <button className='genericButton'>
                <i className='fas fa-arrow-left' />
              </button>
            </Link>
          </div>
        </div>
        <div className='w-full xl:w-1/3'>
          <div className='absolute top-0 right-0 flex justify-end p-5 xl:static xl:p-0'>
            <Header />
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full h-auto my-5 space-y-5 xl:flex-row xl:space-x-5 xl:space-y-0'>
        <div className='w-full xl:w-2/3'>
          <div className='w-full py-5 bg-gray-800 rounded-md'>
            <h1 className='text-lg font-bold text-left text-gray-200 pl-7 xl:text-xl'>
              <i className='fas fa-coins' /> Your auctions
            </h1>
            <Link to={'/myAuctions'}>
              <button className='mt-5 font-semibold bg-orange-600 ml-7 genericButton hover:bg-orange-700'>
                Go to see your auctions
              </button>
            </Link>
          </div>
        </div>
        {userInfo && (
          <div className='w-full xl:w-1/3'>
            <MyProfileInfo />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfileScreen;
