import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <nav className='sticky top-0 flex flex-col items-center justify-center w-12 h-screen text-gray-200 bg-gray-800 lg:w-16'>
      <Link to={'/'} className='w-full'>
        <button className='w-full py-4 hover:bg-gray-700'>
          <i className='fas fa-home fa-lg' />
        </button>
      </Link>
      <Link to={'/myAuctions'} className='w-full'>
        <button className='w-full py-4 hover:bg-gray-700'>
          <i className='fas fa-coins fa-lg' />
        </button>
      </Link>

      <Link to={'/auctions'} className='w-full'>
        <button className='w-full py-4 hover:bg-gray-700'>
          <i className='fas fa-cart-plus fa-lg'></i>
        </button>
      </Link>
      <Link to={'/settings'} className='w-full'>
        <button className='w-full py-4 hover:bg-gray-700'>
          <i className='fas fa-cog fa-lg' />
        </button>
      </Link>
    </nav>
  );
};

export default NavigationBar;
