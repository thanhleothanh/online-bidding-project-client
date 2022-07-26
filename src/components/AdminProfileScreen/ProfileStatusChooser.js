import React, { useState, useRef, useEffect } from 'react';

const ProfileStatusChooser = ({ choosenStatus, setChoosenStatus }) => {
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
        <i className='fas fa-filter' /> {choosenStatus || 'Status'}
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
            onClick={() => setChoosenStatus('')}
          >
            All
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenStatus('INACTIVE')}
          >
            INACTIVE
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenStatus('ACTIVE')}
          >
            ACTIVE
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenStatus('SUSPENDED')}
          >
            SUSPENDED
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenStatus('BANNED')}
          >
            BANNED
          </button>
        </div>
      </div>
    </span>
  );
};

export default ProfileStatusChooser;
