import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const NavigationBar = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/')[1] || undefined;

  return (
    <nav className='sticky top-0 flex flex-col items-center justify-center w-16 h-screen text-gray-200 bg-gray-800'>
      <Link to={'/'} className='w-full'>
        <button
          className={`${
            currentPage == undefined
              ? 'text-gray-200'
              : 'text-gray-600 hover:bg-gray-700'
          } w-full transition py-4 `}
        >
          <i className='fas fa-home fa-lg' />
        </button>
      </Link>
      <Link to={'/myAuctions'} className='w-full'>
        <button
          className={`${
            currentPage === 'myAuctions'
              ? 'text-gray-200'
              : 'text-gray-600 hover:bg-gray-700'
          } w-full transition py-4 `}
        >
          <i className='fas fa-coins fa-lg' />
        </button>
      </Link>

      <Link to={'/interestedAuctions'} className='w-full'>
        <button
          className={`${
            currentPage === 'interestedAuctions'
              ? 'text-gray-200'
              : 'text-gray-600 hover:bg-gray-700'
          } w-full transition py-4 `}
        >
          <i className='fas fa-cart-plus fa-lg'></i>
        </button>
      </Link>
      <Link to={'/settings'} className='w-full'>
        <button
          className={`${
            currentPage === 'settings'
              ? 'text-gray-200'
              : 'text-gray-600 hover:bg-gray-700'
          } w-full transition py-4 `}
        >
          <i className='fas fa-cog fa-lg' />
        </button>
      </Link>
    </nav>
  );
};

export default NavigationBar;
