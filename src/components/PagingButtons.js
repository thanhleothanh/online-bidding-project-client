import React from 'react';

const renderButton = (page, pageTotal, setCurrentPage) => {
  let buttons = [];
  for (let i = 0; i < pageTotal; i++) {
    if (page === i) {
      buttons.push(
        <button key={i} className='genericButton hover:bg-gray-800'>
          {i + 1}
        </button>
      );
    } else
      buttons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className='genericButton'
        >
          {i + 1}
        </button>
      );
  }
  return buttons;
};

const PagingButtons = ({ page, pageTotal, setCurrentPage }) => {
  return (
    <div className='flex items-center w-full h-12 space-x-2'>
      {renderButton(page, pageTotal, setCurrentPage).map((button) => {
        return button;
      })}
    </div>
  );
};

export default PagingButtons;
