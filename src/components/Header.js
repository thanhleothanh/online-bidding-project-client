import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DropdownMenu from './DropdownMenu';
import NotificationDropdown from './NotificationDropdown';

const Header = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <div className='flex justify-end space-x-2 text-gray-200'>
      {!userInfo ? (
        <Link to='/login'>
          <button className='font-bold genericButton'>
            Sign in <i className='fas fa-smile animate-bounce' />
          </button>
        </Link>
      ) : (
        <>
          <NotificationDropdown />
          <DropdownMenu />
        </>
      )}
    </div>
  );
};

export default Header;
