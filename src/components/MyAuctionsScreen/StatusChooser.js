import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const StatusChooser = ({ choosenStatus, setChoosenStatus }) => {
  const [show, setShow] = useState(false);
  const container = useRef(null);
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

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
            onClick={() => setChoosenStatus(null)}
          >
            All
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenStatus('CANCELED')}
          >
            CANCELED
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenStatus('DRAFT')}
          >
            DRAFT
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenStatus('PENDING')}
          >
            PENDING
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenStatus('QUEUED')}
          >
            QUEUED
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenStatus('OPENING')}
          >
            OPENING
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenStatus('ENDED')}
          >
            ENDED
          </button>
          <button
            className='w-full rounded-none genericButton'
            onClick={() => setChoosenStatus('SUCCESSFUL')}
          >
            SUCCESSFUL
          </button>
        </div>
      </div>
    </span>
  );
};

export default StatusChooser;
