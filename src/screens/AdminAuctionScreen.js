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
        }, 1500);
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
      <div className='relative flex flex-col w-full h-auto min-h-screen p-5 space-y-5'>
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
          <div className='flex justify-between mb-5'>
            <StatusChooser
              choosenStatus={choosenStatus}
              setChoosenStatus={setChoosenStatus}
            />
          </div>
          {/* auctions table section */}
          <div className='w-full overflow-auto rounded-md scrollbar-thin'>
            <div className='mb-5'>
              {currentPage != null && (
                <PagingButtons
                  setCurrentPage={setCurrentPage}
                  page={pageAllAuctions}
                  pageTotal={pageTotalAllAuctions}
                />
              )}
            </div>
            {/* auctions table section */}
            <div className='w-full overflow-hidden rounded-md'>
              <table className='w-full overflow-x-auto table-fixed '>
                {userInfo && loadingAllAuctions ? (
                  <Loader
                    className='mt-3'
                    loader={Math.floor(Math.random() * 10 + 1)}
                    color={Math.floor(Math.random() * 10 + 1)}
                  />
                ) : errorAllAuctions ? (
                  <Alert className='mt-3'>{errorAllAuctions}</Alert>
                ) : (
                  <>
                    <thead className='text-gray-100 bg-orange-600'>
                      <tr className='border-2 border-orange-500'>
                        <th className='w-1/12 py-7'>ID</th>
                        <th className='w-3/12 py-7'>User Info</th>
                        <th className='w-5/12 py-7'>Auction Info</th>
                        <th className='w-4/12 py-7'>Auction Item</th>
                        <th className='w-1/12 py-7'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allAuctions &&
                        allAuctions.length !== 0 &&
                        allAuctions.map((auction) => {
                          return (
                            <tr className='text-center text-gray-200 bg-gray-700 border-2 border-orange-500'>
                              <td className='py-10'>{auction.id}</td>
                              <td className='py-10 pr-1 xl:pr-5'>
                                <UserInfoSection auction={auction} />
                              </td>
                              <td className='py-10 pr-1 lg:px-5'>
                                <AuctionInfoSection auction={auction} />
                              </td>
                              <td className='py-10 pl-1 lg:px-5'>
                                <ItemInfoSection auction={auction} />
                              </td>
                              <td className='py-10 space-x-1'>
                                {auction.status === 'PENDING' && (
                                  <>
                                    <button>
                                      <i
                                        onClick={() =>
                                          approveButtonClickedHandler(
                                            auction.id
                                          )
                                        }
                                        className='fas fa-thumbs-up fa-lg hover:text-orange-500'
                                      />
                                    </button>
                                    <button>
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
                  </>
                )}
              </table>
            </div>
            {allAuctions && allAuctions.length === 0 && (
              <Message type='info' className='w-full '>
                No auction with these criterias found!
              </Message>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminAuctionScreen;
