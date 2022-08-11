import React from 'react';

const ItemInfoSection = ({ auction }) => {
  return (
    <div className='flex flex-col w-full space-y-2'>
      <div className='flex justify-between space-x-10'>
        <div className='font-semibold text-left'>Item Name:</div>
        <div className='text-right'>
          {auction.item
            ? auction.item.name ?? null
            : 'You havent added an item to this auction!'}
        </div>
      </div>
      <div className='flex justify-between space-x-10'>
        <div className='font-semibold text-left'>Item Description:</div>
        <div className='text-right'>
          {auction.item
            ? auction.item.description ?? null
            : 'You havent added an item to this auction!'}
        </div>
      </div>
      <div className='flex justify-between space-x-10'>
        <div className='font-semibold text-left'>Amount:</div>
        <div className='text-right'>
          {auction.item
            ? auction.item.amount ?? null
            : 'You havent added an item to this auction!'}
        </div>
      </div>
      <div className='flex flex-col'>
        <div className='font-semibold text-left'>Item Images:</div>
        <div className='flex space-x-2 overflow-x-auto scrollbar-thin'>
          {auction.item
            ? auction.item.itemImages.length !== 0 &&
              auction.item.itemImages.map((itemImage, i) => {
                return (
                  <img
                    key={itemImage.imageUrl}
                    src={itemImage.imageUrl}
                    onError={({ currentTarget }) => {
                      currentTarget.onerror = null;
                      currentTarget.src = '/images/auction_img.jpg';
                    }}
                    className='object-cover rounded-md w-80 h-80'
                  />
                );
              })
            : 'You havent added an item to this auction!'}
          {auction.item &&
            auction.item.itemImages.length === 0 &&
            'No item images added!'}
        </div>
      </div>
    </div>
  );
};

export default ItemInfoSection;
