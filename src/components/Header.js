import React from 'react';

const Header = ({ postAuctionButton = false }) => {
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
      <button className='genericButton'>Username</button>
    </div>
  );
};

export default Header;
