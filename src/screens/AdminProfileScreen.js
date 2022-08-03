import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header';
import Alert from '../components/Alert';
import Message from '../components/Message';
import Loader from '../components/Loader';
import ProfileStatusChooser from '../components/AdminProfileScreen/ProfileStatusChooser';
import PagingButtons from '../components/PagingButtons';
import ProfileInfoSection from '../components/AdminProfileScreen/ProfileInfoSection';
import ReactTooltip from 'react-tooltip';
import notify from '../utils/notify';
import {
  profileAdminBan,
  profileAdminGetAll,
} from '../redux/actions/profileActions';

const AdminProfileScreen = ({ history }) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [choosenStatus, setChoosenStatus] = useState('');
  const { userInfo } = useSelector((state) => state.userLogin);

  const {
    profiles: allProfiles,
    page: pageAllProfiles,
    pageTotal: pageTotalAllProfiles,
    loading: loadingAllProfiles,
    error: errorAllProfiles,
  } = useSelector((state) => state.profileAdminGetAll);

  const {
    profile: changedStatusProfile,
    loading: loadingChangedStatusProfile,
    error: errorChangedStatusProfile,
  } = useSelector((state) => state.profileAdminBan);
  useEffect(() => {
    if (
      !loadingChangedStatusProfile &&
      (changedStatusProfile !== null || errorChangedStatusProfile)
    ) {
      if (changedStatusProfile) {
        notify(false, 'Sửa trạng thái người dùng thành công!');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else notify(true, errorChangedStatusProfile);
      dispatch({ type: 'PROFILE_ADMIN_BAN_PROFILE' });
    }
  }, [loadingChangedStatusProfile]);

  useEffect(() => {
    if (!userInfo) history.push('/login');
    if (userInfo && userInfo.role !== 'ADMIN') history.push('/login');
  }, [userInfo]);

  useEffect(() => {
    dispatch(profileAdminGetAll(currentPage, choosenStatus));
  }, [currentPage, choosenStatus]);

  const banButtonClickedHandler = (userId) => {
    if (window.confirm('Are you sure to ban this user?'))
      dispatch(profileAdminBan(userId, { status: 'BANNED' }));
  };

  const suspendButtonClickedHandler = (userId) => {
    if (window.confirm('Are you sure to suspend this user?'))
      dispatch(profileAdminBan(userId, { status: 'SUSPENDED' }));
  };

  const unlockButtonClickedHandler = (userId) => {
    if (window.confirm('Are you sure to open this users privileges?'))
      dispatch(profileAdminBan(userId, { status: 'ACTIVE' }));
  };

  return (
    <>
      <div className='relative flex flex-col w-full h-auto min-h-screen p-5 space-y-5 animate-fadeIn'>
        <div className='flex w-full'>
          <div className='w-full h-full xl:w-2/3'>
            <div className='flex invisible xl:visible'>
              <input
                onChange={(e) => setSearch(e.target.value)}
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
          <div className='flex justify-between'>
            <ProfileStatusChooser
              choosenStatus={choosenStatus}
              setChoosenStatus={setChoosenStatus}
            />
          </div>
          {/* users table section */}
          <div className='w-full overflow-auto rounded-md scrollbar-thin'>
            <div className='my-3'>
              {currentPage != null &&
                allProfiles &&
                allProfiles.length !== 0 && (
                  <PagingButtons
                    setCurrentPage={setCurrentPage}
                    page={pageAllProfiles}
                    pageTotal={pageTotalAllProfiles}
                  />
                )}
            </div>
            {/* users table section */}
            {userInfo && loadingAllProfiles ? (
              <Loader
                className='mt-3'
                loader={Math.floor(Math.random() * 10 + 1)}
                color={Math.floor(Math.random() * 10 + 1)}
              />
            ) : errorAllProfiles ? (
              <Alert className='mt-3'>{errorAllProfiles}</Alert>
            ) : (
              <>
                <tr className='sticky top-0 flex w-full text-gray-100 bg-orange-600 rounded-t-md'>
                  <th className='w-1/12 py-7'>ID</th>
                  <th className='w-9/12 py-7'>User Info</th>
                  <th className='w-1/12 py-7'></th>
                </tr>
                <div className='w-full overflow-hidden rounded-md '>
                  <table className='w-full table-fixed overflow-x-scoll '>
                    <thead>
                      <tr>
                        <th className='w-1/12'></th>
                        <th className='w-9/12'></th>
                        <th className='w-1/12'></th>
                      </tr>
                    </thead>
                    <tbody>
                      {userInfo &&
                        allProfiles &&
                        allProfiles.length !== 0 &&
                        allProfiles.map((profile) => {
                          if (search === '')
                            return (
                              <tr className='text-center text-gray-200 bg-gray-700 border-2 border-orange-500'>
                                <td className='py-10'>{profile.id}</td>
                                <td className='py-10 pr-1 xl:px-5'>
                                  <ProfileInfoSection profile={profile} />
                                </td>
                                <td className='py-10 space-x-1'>
                                  {profile.id !== userInfo.id && (
                                    <>
                                      {profile.status === 'ACTIVE' && (
                                        <>
                                          <button
                                            data-for='suspend'
                                            data-tip='Suspend user'
                                          >
                                            <i
                                              onClick={() =>
                                                suspendButtonClickedHandler(
                                                  profile.id
                                                )
                                              }
                                              className='fas fa-user-lock fa-lg hover:text-orange-500'
                                            />
                                          </button>
                                          <ReactTooltip
                                            id='suspend'
                                            place='top'
                                            effect='float'
                                          />

                                          <button
                                            data-for='ban'
                                            data-tip='Ban user'
                                          >
                                            <i
                                              onClick={() =>
                                                banButtonClickedHandler(
                                                  profile.id
                                                )
                                              }
                                              className='fas fa-user-slash fa-lg hover:text-orange-500'
                                            />
                                          </button>
                                          <ReactTooltip
                                            id='ban'
                                            place='top'
                                            effect='float'
                                          />
                                        </>
                                      )}
                                      {profile.status !== 'ACTIVE' && (
                                        <>
                                          <button
                                            data-for='unlock'
                                            data-tip='Unlock user'
                                          >
                                            <i
                                              onClick={() =>
                                                unlockButtonClickedHandler(
                                                  profile.id
                                                )
                                              }
                                              className='fas fa-user-check fa-lg hover:text-orange-500'
                                            />
                                          </button>
                                          <ReactTooltip
                                            id='unlock'
                                            place='top'
                                            effect='float'
                                          />
                                        </>
                                      )}
                                    </>
                                  )}
                                </td>
                              </tr>
                            );
                          else if (
                            search !== '' &&
                            (profile.username.includes(search) ||
                              profile.name.includes(search))
                          )
                            return (
                              <tr className='text-center text-gray-200 bg-gray-700 border-2 border-orange-500'>
                                <td className='py-10'>{profile.id}</td>
                                <td className='py-10 pr-1 xl:px-5'>
                                  <ProfileInfoSection profile={profile} />
                                </td>
                                <td className='py-10 space-x-1'>
                                  {profile.id !== userInfo.id && (
                                    <>
                                      {profile.status === 'ACTIVE' && (
                                        <>
                                          <button
                                            data-for='suspend'
                                            data-tip='Suspend user'
                                          >
                                            <i
                                              onClick={() =>
                                                suspendButtonClickedHandler(
                                                  profile.id
                                                )
                                              }
                                              className='fas fa-user-lock fa-lg hover:text-orange-500'
                                            />
                                          </button>
                                          <ReactTooltip
                                            id='suspend'
                                            place='top'
                                            effect='float'
                                          />

                                          <button
                                            data-for='ban'
                                            data-tip='Ban user'
                                          >
                                            <i
                                              onClick={() =>
                                                banButtonClickedHandler(
                                                  profile.id
                                                )
                                              }
                                              className='fas fa-user-slash fa-lg hover:text-orange-500'
                                            />
                                          </button>
                                          <ReactTooltip
                                            id='suspend'
                                            place='top'
                                            effect='float'
                                          />
                                        </>
                                      )}
                                      {profile.status !== 'ACTIVE' && (
                                        <>
                                          <button
                                            data-for='unlock'
                                            data-tip='Unlock user'
                                          >
                                            <i
                                              onClick={() =>
                                                unlockButtonClickedHandler(
                                                  profile.id
                                                )
                                              }
                                              className='fas fa-user-check fa-lg hover:text-orange-500'
                                            />
                                          </button>
                                          <ReactTooltip
                                            id='unlock'
                                            place='top'
                                            effect='float'
                                          />
                                        </>
                                      )}
                                    </>
                                  )}
                                </td>
                              </tr>
                            );
                        })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
            {allProfiles && allProfiles.length === 0 && (
              <Message type='info' className='w-full '>
                No profile with these criterias found!
              </Message>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProfileScreen;
