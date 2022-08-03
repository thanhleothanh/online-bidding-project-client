import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileInfo from '../components/ProfileScreen/ProfileInfo';
import Header from '../components/Header';
import ProfileAuctions from '../components/ProfileScreen/ProfileAuctions';
import ModalPostReport from '../components/ProfileScreen/ModalPostReport';
import { profileGetById } from '../redux/actions/profileActions';

const ProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [modalPostReport, setModalPostReport] = useState(false);

  const location = useLocation();
  const userId = location.pathname
    ? location.pathname.split('profiles/')[1]
    : undefined;

  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) history.push('/login');
    if (userInfo && userInfo.id == userId) history.push('/myProfile');
    if (userInfo && userId) dispatch(profileGetById(userId));
  }, [userInfo, userId]);

  return (
    <div className='animate-fadeIn relative flex flex-col w-full h-auto min-h-screen p-5 space-y-5'>
      <div className='flex w-full'>
        <div className='w-full h-full xl:w-2/3'>
          <div>
            <button className='genericButton' onClick={history.goBack}>
              <i className='fas fa-arrow-left' />
            </button>
          </div>
        </div>
        <div className='w-full xl:w-1/3'>
          <div className='absolute top-0 right-0 flex justify-end p-5 xl:static xl:p-0'>
            <Header />
          </div>
        </div>
      </div>
      <div className='flex flex-col w-full h-auto my-5 space-y-5 xl:flex-row xl:space-x-5 xl:space-y-0 '>
        <div className='w-full xl:w-3/4'>
          <ProfileAuctions userId={userId} />
        </div>
        <div className='w-full xl:w-1/4'>
          <div className='sticky top-5'>
            <ProfileInfo />
            {userInfo && userInfo.role === 'USER' && (
              <button
                className='w-full font-semibold genericButton'
                onClick={() => setModalPostReport(true)}
              >
                Report this user
              </button>
            )}
          </div>
        </div>
      </div>
      <ModalPostReport
        userId={userId}
        isShow={modalPostReport}
        closeModal={() => setModalPostReport(false)}
      />
    </div>
  );
};

export default ProfileScreen;
