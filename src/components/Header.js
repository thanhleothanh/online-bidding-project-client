import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DropdownMenu from './DropdownMenu';

const Header = ({ postAuctionButton = false }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <div className='space-x-2 text-gray-200'>
      <button
        className={`genericButton ${postAuctionButton ? 'inline' : 'hidden'}`}
      >
        <i className='fas fa-plus fa-lg'></i>
      </button>
      <button className='genericButton'>
        <i className='fas fa-bell fa-lg'></i>
      </button>
      {!userInfo ? (
        <Link to='/login'>
          <button className='font-bold genericButton'>
            Sign in <i className='fas fa-smile animate-bounce' />
          </button>
        </Link>
      ) : (
        <DropdownMenu />
        // <button className='genericButton'>{userInfo.username}</button>
      )}
    </div>
  );
};

export default Header;
