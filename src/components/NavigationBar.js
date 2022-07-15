import React from 'react';

const NavigationBar = () => {
  return (
    <nav className='sticky top-0 flex flex-col items-center justify-center w-12 h-screen text-gray-200 bg-gray-800 lg:w-16'>
      <button className='w-full py-4 hover:bg-gray-700'>
        <i className='fas fa-home fa-lg' />
      </button>
      <button className='w-full py-4 hover:bg-gray-700'>
        <i className='fas fa-coins fa-lg' />
      </button>
      <button className='w-full py-4 hover:bg-gray-700'>
        <i className='fas fa-cart-plus fa-lg'></i>
      </button>
      <button className='w-full py-4 hover:bg-gray-700'>
        <i className='fas fa-cog fa-lg' />
      </button>
    </nav>
  );
};

export default NavigationBar;
