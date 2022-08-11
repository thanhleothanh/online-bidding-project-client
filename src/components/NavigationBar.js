import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { notificationGetMyNotifications } from '../redux/actions/notificationActions';
import { connect, disconnect } from '../utils/wsNotification';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPage = location.pathname.split('/');
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userInfo) connect(userInfo.username, getNewNotifications);
    else disconnect();
    return () => {
      disconnect();
    };
  }, [userInfo]);

  const getNewNotifications = () => {
    dispatch(notificationGetMyNotifications());
  };

  return (
    <nav className='sticky top-0 z-10 flex flex-col items-center justify-center w-12 h-screen text-gray-200 bg-gray-800'>
      {userInfo && userInfo.role === 'ADMIN' ? (
        <>
          <Link
            to={'/admin/users'}
            className='w-full'
            data-for='users'
            data-tip='Users management'
          >
            <button
              className={`${
                currentPage[2] === 'users'
                  ? 'text-gray-200'
                  : 'text-gray-600 hover:bg-gray-700'
              } w-full transition py-4 `}
            >
              <i className='fas fa-user-edit fa-lg' />
            </button>
          </Link>

          <Link
            to={'/admin/auctions'}
            className='w-full'
            data-for='auctions'
            data-tip='Auctions management'
          >
            <button
              className={`${
                currentPage[2] === 'auctions'
                  ? 'text-gray-200'
                  : 'text-gray-600 hover:bg-gray-700'
              } w-full transition py-4 `}
            >
              <i className='fas fa-coins fa-lg' />
            </button>
          </Link>

          <Link
            to={'/admin/reports'}
            className='w-full'
            data-for='reports'
            data-tip='Reports management'
          >
            <button
              className={`${
                currentPage[2] === 'reports'
                  ? 'text-gray-200'
                  : 'text-gray-600 hover:bg-gray-700'
              } w-full transition py-4 `}
            >
              <i className='fas fa-balance-scale-right fa-lg'></i>
            </button>
          </Link>
        </>
      ) : (
        <>
          <Link
            to={'/'}
            className='w-full'
            data-for='homescreen'
            data-tip='Home screen'
          >
            <button
              className={`${
                currentPage[1] === ''
                  ? 'text-gray-200'
                  : 'text-gray-600 hover:bg-gray-700'
              } w-full transition py-4 `}
            >
              <i className='fas fa-home fa-lg' />
            </button>
          </Link>

          <Link
            to={'/myAuctions'}
            className='w-full'
            data-for='myAuctions'
            data-tip='My Auctions'
          >
            <button
              className={`${
                currentPage[1] === 'myAuctions'
                  ? 'text-gray-200'
                  : 'text-gray-600 hover:bg-gray-700'
              } w-full transition py-4 `}
            >
              <i className='fas fa-piggy-bank fa-lg' />
            </button>
          </Link>

          <Link
            to={'/interestedAuctions'}
            className='w-full'
            data-for='interestedAuctions'
            data-tip='My Interested Auctions'
          >
            <button
              className={`${
                currentPage[1] === 'interestedAuctions'
                  ? 'text-gray-200'
                  : 'text-gray-600 hover:bg-gray-700'
              } w-full transition py-4 `}
            >
              <i className='fas fa-hourglass-end fa-lg'></i>
            </button>
          </Link>
        </>
      )}
      <ReactTooltip id='auctions' place='right' type='dark' effect='float' />
      <ReactTooltip id='users' place='right' type='dark' effect='float' />
      <ReactTooltip id='reports' place='right' type='dark' effect='float' />
      <ReactTooltip id='homescreen' place='right' type='dark' effect='float' />
      <ReactTooltip id='myAuctions' place='right' type='dark' effect='float' />
      <ReactTooltip
        id='interestedAuctions'
        place='right'
        type='dark'
        effect='float'
      />
    </nav>
  );
};

export default NavigationBar;
