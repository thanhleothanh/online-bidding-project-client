import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  auctionAdminApprove,
  auctionAdminGetAll,
} from '../redux/actions/auctionActions';
import Header from '../components/Header';
import Alert from './../components/Alert';
import Message from './../components/Message';
import Loader from './../components/Loader';
import StatusChooser from '../components/MyAuctionsScreen/StatusChooser';
import PagingButtons from '../components/PagingButtons';
import ItemInfoSection from '../components/AdminAuctionScreen/ItemInfoSection';
import AuctionInfoSection from '../components/AdminAuctionScreen/AuctionInfoSection';
import notify from '../utils/notify';
import ReactTooltip from 'react-tooltip';
import UserInfoSection from '../components/AdminAuctionScreen/UserInfoSection';

const AdminAuctionScreen = ({ history }) => {
  const dispatch = useDispatch();
  const currentAuctionId = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [choosenStatus, setChoosenStatus] = useState(null);
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    auctions: allAuctions,
    page: pageAllAuctions,
    pageTotal: pageTotalAllAuctions,
    loading: loadingAllAuctions,
    error: errorAllAuctions,
  } = useSelector((state) => state.auctionAdminGetAll);

  const {
    auction: approvedAuction,
    loading: loadingApprovedAuction,
    error: errorApprovedAuction,
  } = useSelector((state) => state.auctionAdminApprove);
  useEffect(() => {
    if (
      !loadingApprovedAuction &&
      (approvedAuction !== null || errorApprovedAuction)
    ) {
      if (approvedAuction) {
        notify(false, 'Duyệt bài đấu giá thành công!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else notify(true, errorApprovedAuction);
      dispatch({ type: 'AUCTION_ADMIN_APPROVE_RESET' });
    }
  }, [loadingApprovedAuction]);

  useEffect(() => {
    if (!userInfo) history.push('/login');
    if (userInfo && userInfo.role !== 'ADMIN') history.push('/login');
  }, [userInfo]);

  useEffect(() => {
    dispatch(auctionAdminGetAll(currentPage, choosenStatus));
  }, [currentPage, choosenStatus]);

  const approveButtonClickedHandler = (auctionId) => {
    currentAuctionId.current = auctionId;
    if (window.confirm('Are you sure to appove this auction?'))
      dispatch(auctionAdminApprove(auctionId, { status: 'QUEUED' }));
  };

  const rejectButtonClickedHandler = (auctionId) => {
    currentAuctionId.current = auctionId;
    if (window.confirm('Are you sure to reject this auction?'))
      dispatch(auctionAdminApprove(auctionId, { status: 'CANCELED' }));
  };

  return (
    <>
      <div className='relative flex flex-col w-full h-auto min-h-screen p-5 space-y-5 animate-fadeIn'>
        <div className='flex w-full'>
          <div className='w-full h-full xl:w-2/3'>
            <div className='flex invisible xl:visible'>
              <input
                type='search'
                id='search'
                name='search'
                placeholder='Search...'
                className='font-bold rounded-md inputField'
              />
            </div>
          </div>
          <div className='w-full xl:w-1/3'>
            <div className='absolute top-0 right-0 flex justify-end p-5 xl:static xl:p-0'>
              <Header />
            </div>
          </div>
        </div>
        <div className='w-full my-5'>
          {/* buttons section */}
          <StatusChooser
            choosenStatus={choosenStatus}
            setChoosenStatus={setChoosenStatus}
          />
          <div className='my-3'>
            {currentPage != null && allAuctions && allAuctions.length !== 0 && (
              <PagingButtons
                setCurrentPage={setCurrentPage}
                page={pageAllAuctions}
                pageTotal={pageTotalAllAuctions}
              />
            )}
          </div>
          {/* auctions table section */}
          {userInfo && loadingAllAuctions ? (
            <Loader
              className={'py-3'}
              loader={Math.floor(Math.random() * 10 + 1)}
              color={Math.floor(Math.random() * 10 + 1)}
            />
          ) : errorAllAuctions ? (
            <Alert className={'mt-3'}>{errorAllAuctions}</Alert>
          ) : (
            <>
              <tr className='sticky top-0 flex w-full text-gray-100 bg-orange-600 rounded-t-md'>
                <th className='w-1/12 py-7'>ID</th>
                <th className='w-2/12 py-7'>User Info</th>
                <th className='w-8/12 py-7'>Auction Info</th>
                <th className='w-1/12 py-7'></th>
              </tr>
              <div className='w-full overflow-hidden rounded-md'>
                <table className='w-full overflow-x-auto table-fixed '>
                  <thead>
                    <tr>
                      <th className='w-1/12'></th>
                      <th className='w-2/12'></th>
                      <th className='w-8/12'></th>
                      <th className='w-1/12'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {allAuctions &&
                      allAuctions.length !== 0 &&
                      allAuctions.map((auction) => {
                        return (
                          <tr
                            className='text-center text-gray-200 bg-gray-700 border-orange-500 border-y-2'
                            key={auction.id}
                          >
                            <td className='py-10'>{auction.id}</td>
                            <td className='py-10 pr-1 xl:pr-5'>
                              <UserInfoSection auction={auction} />
                            </td>
                            <td className='flex flex-col py-10 lg:px-5'>
                              <AuctionInfoSection auction={auction} />
                              <br />
                              <ItemInfoSection auction={auction} />
                            </td>
                            <td className='py-10 space-x-1'>
                              {auction.status === 'PENDING' && (
                                <>
                                  <button data-for='approve' data-tip='Approve'>
                                    <i
                                      onClick={() =>
                                        approveButtonClickedHandler(auction.id)
                                      }
                                      className='fas fa-thumbs-up fa-lg hover:text-orange-500'
                                    />
                                  </button>
                                  <button data-for='reject' data-tip='Reject'>
                                    <i
                                      onClick={() =>
                                        rejectButtonClickedHandler(auction.id)
                                      }
                                      className='fas fa-thumbs-down fa-lg hover:text-orange-500'
                                    />
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <ReactTooltip id='reject' place='top' effect='float' />
              <ReactTooltip id='approve' place='top' effect='float' />
              <ReactTooltip id='reject' place='top' effect='float' />
            </>
          )}
          {allAuctions && allAuctions.length === 0 && (
            <Message type='info' className={'w-full'}>
              No auction with these criterias found!
            </Message>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminAuctionScreen;
