import React, { useState, useRef, useEffect } from 'react';

const categories = {
  1: 'Đồ điện tử',
  2: 'Thời trang',
  3: 'Đồ nội thất',
  4: 'Giải trí',
  5: 'Nhà cửa',
  6: 'Sức khoẻ',
  7: 'Thú cưng',
  8: 'Nghệ thuật',
  9: 'Trang sức',
  10: 'Thực phẩm',
  11: 'Khoa học',
};

const CategoryChooser = ({ choosenCategory, setChoosenCategory }) => {
  const [show, setShow] = useState(false);
  const container = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        container &&
        container.current &&
        !container.current.contains(event.target)
      ) {
        if (!show) return;
        setShow(false);
      }
    };
    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, [show, container]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (!show) return;
      if (event.key === 'Escape') {
        setShow(false);
      }
    };
    document.addEventListener('keyup', handleEscape);
    return () => document.removeEventListener('keyup', handleEscape);
  }, [show]);

  return (
    <span ref={container} className='relative'>
      <button className='genericButton' onClick={() => setShow(!show)}>
        <i className='fas fa-filter' />{' '}
        {categories[choosenCategory] || 'Category'}
      </button>

      <div
        style={{
          visibility: `${show ? 'visible' : 'hidden'}`,
          opacity: `${show ? '100%' : '0%'}`,
        }}
      >
        <div className='absolute left-0 z-10 flex flex-col mt-1 border-2 border-orange-500 rounded-md shadow-md w-44 overflow-hiddenbg-white'>
          <button
            className='w-full rounded-b-none genericButton'
            onClick={() => setChoosenCategory(null)}
          >
            All
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenCategory('1')}
          >
            Đồ điện tử
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenCategory('2')}
          >
            Thời trang
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenCategory('3')}
          >
            Đồ nội thất
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenCategory('4')}
          >
            Giải trí
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenCategory('5')}
          >
            Nhà cửa
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenCategory('6')}
          >
            Sức khoẻ
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenCategory('7')}
          >
            Thú cưng
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenCategory('8')}
          >
            Nghệ thuật
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenCategory('9')}
          >
            Trang sức
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenCategory('10')}
          >
            Thực phẩm
          </button>
          <button
            className='w-full rounded-t-none genericButton'
            onClick={() => setChoosenCategory('11')}
          >
            Khoa học
          </button>
        </div>
      </div>
    </span>
  );
};

export default CategoryChooser;
