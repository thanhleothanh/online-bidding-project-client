import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { auctionGetUsersAuctions } from '../../redux/actions/auctionActions';
import Alert from '../../components/Alert';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import ModalPostReport from '../../components/ProfileScreen/ModalPostReport';
import ItemInfoSection from '../../components/AdminAuctionScreen/ItemInfoSection';
import AuctionInfoSection from '../../components/AdminAuctionScreen/AuctionInfoSection';
import UserInfoSection from '../../components/AdminAuctionScreen/UserInfoSection';

const ProfileAuctions = ({ userId }) => {
  const dispatch = useDispatch();
  const [modalPostReport, setModalPostReport] = useState(false);

  const {
    auctions: usersAuctions,
    loading: loadingUsersAuctions,
    error: errorUsersAuctions,
  } = useSelector((state) => state.auctionGetUsersAuctions);

  useEffect(() => {
    dispatch(auctionGetUsersAuctions(userId));
  }, [userId]);

  return (
    <div className='w-full bg-gray-800 rounded-md'>
      <h1 className='py-5 text-lg font-bold text-left text-gray-200 pl-7 xl:text-xl'>
        <i className='fas fa-coins' /> This person's auctions
      </h1>
      {loadingUsersAuctions ? (
        <Loader
          className={'py-3'}
          loader={Math.floor(Math.random() * 10 + 1)}
          color={Math.floor(Math.random() * 10 + 1)}
        />
      ) : errorUsersAuctions ? (
        <Alert>{errorUsersAuctions}</Alert>
      ) : (
        <>
          <tr className='sticky top-0 flex w-full text-gray-100 bg-orange-600 rounded-t-md'>
            <th className='w-3/12 py-7'>User Info</th>
            <th className='w-4/12 py-7'>Auction Info</th>
            <th className='w-5/12 py-7'>Auction Item</th>
          </tr>
          <div className='w-full overflow-hidden rounded-md'>
            <table className='w-full overflow-x-auto table-fixed'>
              <thead>
                <tr>
                  <th className='w-3/12'></th>
                  <th className='w-4/12'></th>
                  <th className='w-5/12'></th>
                </tr>
              </thead>
              <tbody>
                {usersAuctions &&
                  usersAuctions.length !== 0 &&
                  usersAuctions.map((auction) => {
                    return (
                      <tr
                        className='text-center text-gray-200 bg-gray-700 border-orange-500 border-y-2'
                        key={auction.id}
                      >
                        <td className='py-10 lg:px-5'>
                          <UserInfoSection auction={auction} />
                        </td>
                        <td className='py-10 lg:px-5'>
                          <AuctionInfoSection auction={auction} />
                        </td>
                        <td className='py-10 lg:px-5'>
                          <ItemInfoSection auction={auction} />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {usersAuctions && usersAuctions.length === 0 && (
              <Message type='info' className={'w-full'}>
                This person havent had any auction!
              </Message>
            )}
          </div>
        </>
      )}
      <ModalPostReport
        userId={userId}
        isShow={modalPostReport}
        closeModal={() => setModalPostReport(false)}
      />
    </div>
  );
};

export default ProfileAuctions;
