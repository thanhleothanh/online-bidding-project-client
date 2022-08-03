import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

const NavigationBar = () => {
  const location = useLocation();
  const currentPage = location.pathname.split('/');
  const { userInfo } = useSelector((state) => state.userLogin);

  return (
    <nav className='sticky top-0 flex flex-col items-center justify-center w-16 h-screen text-gray-200 bg-gray-800 z-10'>
      {userInfo && userInfo.role === 'ADMIN' ? (
        <>
          <Link to={'/admin/users'} className='w-full'
            data-for="users"
            data-tip="Users management"
          >
            <button
              className={`${currentPage[2] === 'users'
                ? 'text-gray-200'
                : 'text-gray-600 hover:bg-gray-700'
                } w-full transition py-4 `}
            >
              <i className='fas fa-user-edit fa-lg' />
            </button>
          </Link>
          <ReactTooltip
            id="users"
            place="right"
            type="dark"
            effect="float"
          />

          <Link to={'/admin/auctions'} className='w-full'
            data-for="auctions"
            data-tip="Auctions management"
          >
            <button
              className={`${currentPage[2] === 'auctions'
                ? 'text-gray-200'
                : 'text-gray-600 hover:bg-gray-700'
                } w-full transition py-4 `}
            >
              <i className='fas fa-money-bill fa-lg' />
            </button>
          </Link>
          <ReactTooltip
            id="auctions"
            place="right"
            type="dark"
            effect="float"
          />

          <Link to={'/admin/reports'} className='w-full'
            data-for="reports"
            data-tip="Reports management"
          >
            <button
              className={`${currentPage[2] === 'reports'
                ? 'text-gray-200'
                : 'text-gray-600 hover:bg-gray-700'
                } w-full transition py-4 `}
            >
              <i className='fas fa-balance-scale-right fa-lg'></i>
            </button>
          </Link>
          <ReactTooltip
            id="reports"
            place="right"
            type="dark"
            effect="float"
          />
        </>
      ) : (
        <>
          <Link to={'/'} className='w-full'
            data-for="homescreen"
            data-tip="Home screen"
          >
            <button
              className={`${currentPage[1] === ''
                ? 'text-gray-200'
                : 'text-gray-600 hover:bg-gray-700'
                } w-full transition py-4 `}
            >
              <i className='fas fa-home fa-lg' />
            </button>
          </Link>
          <ReactTooltip
            id="homescreen"
            place="right"
            type="dark"
            effect="float"
          />

          <Link to={'/myAuctions'} className='w-full'
            data-for="myAuctions"
            data-tip="My Auctions"
          >
            <button
              className={`${currentPage[1] === 'myAuctions'
                ? 'text-gray-200'
                : 'text-gray-600 hover:bg-gray-700'
                } w-full transition py-4 `}
            >
              <i className='fas fa-piggy-bank fa-lg' />
            </button>
          </Link>
          <ReactTooltip
            id="myAuctions"
            place="right"
            type="dark"
            effect="float"
          />

          <Link to={'/interestedAuctions'} className='w-full'
            data-for="interestedAuctions"
            data-tip="Interested Auctions"
          >
            <button
              className={`${currentPage[1] === 'interestedAuctions'
                ? 'text-gray-200'
                : 'text-gray-600 hover:bg-gray-700'
                } w-full transition py-4 `}
            >
              <i className='fas fa-hourglass-end fa-lg'></i>
            </button>
          </Link>
          <ReactTooltip
            id="interestedAuctions"
            place="right"
            type="dark"
            effect="float"
          />
        </>
      )}
    </nav>
  );
};

export default NavigationBar;
