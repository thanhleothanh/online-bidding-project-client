import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  auctionDelete,
  auctionSubmit,
  auctionGetMyAuctions,
} from '../redux/actions/auctionActions';
import Header from '../components/Header';
import Alert from './../components/Alert';
import Message from './../components/Message';
import Loader from './../components/Loader';
import StatusChooser from '../components/MyAuctionsScreen/StatusChooser';
import ModalPostAuction from '../components/MyAuctionsScreen/ModalPostAuction';
import ModalEditAuction from '../components/MyAuctionsScreen/ModalEditAuction';
import ItemInfoSection from '../components/MyAuctionsScreen/ItemInfoSection';
import AuctionInfoSection from '../components/MyAuctionsScreen/AuctionInfoSection';
import { auctionGetById } from '../redux/actions/auctionActions';
import notify from '../utils/notify';

const WelcomeScreen = ({ history }) => {
  const dispatch = useDispatch();
  const currentAuctionId = useRef(null);
  const [modalPostAuction, setModalPostAuction] = useState(false);
  const [modalEditAuction, setModalEditAuction] = useState(false);
  const [choosenStatus, setChoosenStatus] = useState(null);
  const { userInfo } = useSelector((state) => state.userLogin);
  const {
    auctions: myAuctions,
    loading: loadingMyAuctions,
    error: errorMyAuctions,
  } = useSelector((state) => state.auctionGetMyAuctions);

  const {
    success: deleteAuction,
    loading: loadingDeleteAuction,
    error: errorDeleteAuction,
  } = useSelector((state) => state.auctionDelete);
  useEffect(() => {
    if (!loadingDeleteAuction && (deleteAuction || errorDeleteAuction)) {
      if (deleteAuction) {
        notify(false, 'Xoá bài đấu giá thành công!');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else notify(true, errorDeleteAuction);
      dispatch({ type: 'AUCTION_DELETE_RESET' });
    }
  }, [loadingDeleteAuction]);

  const {
    auction: submitAuction,
    loading: loadingSubmitAuction,
    error: errorSubmitAuction,
  } = useSelector((state) => state.auctionSubmit);
  useEffect(() => {
    if (
      !loadingSubmitAuction &&
      (submitAuction !== null || errorSubmitAuction)
    ) {
      if (submitAuction) {
        notify(
          false,
          'Submit bài đấu giá thành công! Admin sẽ duyệt bài đấu giá của bạn sớm!'
        );
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else notify(true, errorSubmitAuction);
      dispatch({ type: 'AUCTION_SUBMIT_RESET' });
    }
  }, [loadingSubmitAuction]);

  useEffect(() => {
    if (!userInfo) history.push('/entry');
  }, [userInfo]);

  useEffect(() => {
    dispatch(auctionGetMyAuctions());
  }, []);

  const editButtonClickedHandler = (auctionId) => {
    currentAuctionId.current = auctionId;
    dispatch(auctionGetById(auctionId));
    setModalEditAuction(true);
  };

  const submitButtonClickedHandler = (auctionId) => {
    if (window.confirm('Are you sure to submit this auction?')) {
      dispatch(auctionSubmit(auctionId));
    }
  };

  const deleteButtonClickedHandler = (auctionId) => {
    if (window.confirm('Are you sure to delete this auction?')) {
      dispatch(auctionDelete(auctionId));
    }
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
              <Header postAuctionButton={true} />
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
            <button
              className='genericButton'
              onClick={() => setModalPostAuction(true)}
            >
              <i className='fas fa-plus fa-lg' />
            </button>
          </div>
          {/* auctions table section */}
          <div className='w-full overflow-auto rounded-md scrollbar-thin'>
            <table className='w-full table-fixed overflow-x-scoll'>
              {userInfo && loadingMyAuctions ? (
                <Loader
                  className='mt-3'
                  loader={Math.floor(Math.random() * 10 + 1)}
                  color={Math.floor(Math.random() * 10 + 1)}
                />
              ) : errorMyAuctions ? (
                <Alert className='mt-3'>{errorMyAuctions}</Alert>
              ) : (
                <>
                  <thead className='text-gray-100 bg-orange-600'>
                    <tr className='border-2 border-orange-500'>
                      <th className='w-1/12 py-7'>ID</th>
                      <th className='w-5/12 py-7'>Auction Info</th>
                      <th className='w-5/12 py-7'>Auction Item</th>
                      <th className='w-1/12 py-7'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {myAuctions &&
                      myAuctions.length !== 0 &&
                      myAuctions.map((auction) => {
                        if (choosenStatus == null)
                          return (
                            <tr className='text-center text-gray-200 bg-gray-700 border-2 border-orange-500'>
                              <td className='py-10'>{auction.id}</td>
                              <td className='py-10 pr-5'>
                                <AuctionInfoSection auction={auction} />
                              </td>
                              <td className='px-5 py-10'>
                                <ItemInfoSection auction={auction} />
                              </td>
                              <td className='py-10 space-x-1'>
                                <button>
                                  <i
                                    onClick={() =>
                                      editButtonClickedHandler(auction.id)
                                    }
                                    className='fas fa-edit fa-lg hover:text-orange-500'
                                  />
                                </button>
                                <button>
                                  <i
                                    className='fas fa-cloud-upload fa-lg hover:text-orange-500'
                                    onClick={() =>
                                      submitButtonClickedHandler(auction.id)
                                    }
                                  />
                                </button>
                                <button>
                                  <i
                                    className='fas fa-trash fa-lg hover:text-orange-500'
                                    onClick={() =>
                                      deleteButtonClickedHandler(auction.id)
                                    }
                                  />
                                </button>
                              </td>
                            </tr>
                          );
                        else {
                          if (auction.status === choosenStatus)
                            return (
                              <tr className='text-center text-gray-200 bg-gray-700 border-2 border-orange-500'>
                                <td className='py-10'>{auction.id}</td>
                                <td className='py-10 pr-5'>
                                  <AuctionInfoSection auction={auction} />
                                </td>
                                <td className='px-5 py-10'>
                                  <ItemInfoSection auction={auction} />
                                </td>
                                <td className='py-10 space-x-1'>
                                  <button>
                                    <i
                                      onClick={() =>
                                        editButtonClickedHandler(auction.id)
                                      }
                                      className='fas fa-edit fa-lg hover:text-orange-500'
                                    />
                                  </button>
                                  <button>
                                    <i
                                      className='fas fa-cloud-upload fa-lg hover:text-orange-500'
                                      onClick={() =>
                                        submitButtonClickedHandler(auction.id)
                                      }
                                    />
                                  </button>
                                  <button>
                                    <i
                                      className='fas fa-trash fa-lg hover:text-orange-500'
                                      onClick={() =>
                                        deleteButtonClickedHandler(auction.id)
                                      }
                                    />
                                  </button>
                                </td>
                              </tr>
                            );
                        }
                      })}
                  </tbody>
                </>
              )}
            </table>
            {myAuctions && myAuctions.length === 0 && (
              <Message type='info' className='w-full '>
                You dont have any auction!
              </Message>
            )}
          </div>
        </div>
      </div>
      <ModalPostAuction
        isShow={modalPostAuction}
        closeModal={() => setModalPostAuction(false)}
      />
      <ModalEditAuction
        auctionId={currentAuctionId.current}
        isShow={modalEditAuction}
        closeModal={() => setModalEditAuction(false)}
      />
    </>
  );
};

export default WelcomeScreen;
