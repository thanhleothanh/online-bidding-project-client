import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NotificationCard from '../components/NotificationCard';
import { notificationGetMyNotifications } from '../redux/actions/notificationActions';
import Alert from '../components/Alert';
import Message from '../components/Message';
import Loader from '../components/Loader';

const NotificationDropdown = () => {
  const [show, setShow] = useState(false);
  const container = useRef(null);
  const dispatch = useDispatch();

  const {
    seen: seenNotifications,
    notifications: notifications,
    loading: loadingNotifications,
    error: errorNotifications,
  } = useSelector((state) => state.notificationGetMyNotifications);

  useEffect(() => {
    if (notifications == null) {
      dispatch(notificationGetMyNotifications());
    }
  }, [notifications]);

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
      <button
        className='relative font-bold genericButton'
        onClick={() => {
          setShow(!show);
          dispatch({ type: 'NOTIFICATION_GET_MY_NOTIFICATIONS_SEEN' });
        }}
      >
        <i
          className={`fas fa-bell fa-lg relative ${
            !seenNotifications && 'animate-pulse'
          }`}
        />
        {!seenNotifications && (
          <i className='absolute top-0 right-0 text-orange-600 fas fa-bahai' />
        )}
      </button>
      <div
        style={{
          visibility: `${show ? 'visible' : 'hidden'}`,
          opacity: `${show ? '100%' : '0%'}`,
        }}
      >
        <div className='absolute right-0 z-10 flex flex-col w-64 mt-1 overflow-hidden overflow-y-auto bg-gray-800 border-2 border-orange-500 rounded-md shadow-md max-h-96 lg:w-72 xl:w-80'>
          {loadingNotifications ? (
            <Loader
              className={'py-3'}
              loader={Math.floor(Math.random() * 10 + 1)}
              color={Math.floor(Math.random() * 10 + 1)}
            />
          ) : errorNotifications ? (
            <Alert>{errorNotifications}</Alert>
          ) : (
            <>
              {notifications && notifications.length === 0 ? (
                <Message type='info'>You don't have any notification!</Message>
              ) : (
                notifications &&
                notifications.length !== 0 && (
                  <>
                    {notifications.map((notification) => {
                      return (
                        <NotificationCard
                          notification={notification}
                          key={notification.id}
                        />
                      );
                    })}
                  </>
                )
              )}
            </>
          )}
        </div>
      </div>
    </span>
  );
};

export default NotificationDropdown;
