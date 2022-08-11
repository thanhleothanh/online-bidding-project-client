import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';
import notify from '../../utils/notify';
import Loader from '../../components/Loader';
import {
  profileUpdateInfo,
  profileChangePassword,
} from '../../redux/actions/profileActions';
import Alert from '../Alert';

const ModalUpdateProfile = ({ isShow, closeModal }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();
  const {
    register: passwordRegister,
    handleSubmit: passwordHandleSubmit,
    reset: passwordReset,
  } = useForm();

  const {
    profile: myProfile,
    loading: loadingMyProfile,
    error: errorMyProfile,
  } = useSelector((state) => state.profileGetMyProfile);

  const {
    profile: updatedProfile,
    loading: loadingUpdatedProfile,
    error: errorUpdatedProfile,
  } = useSelector((state) => state.profileUpdateInfo);
  useEffect(() => {
    if (
      !loadingUpdatedProfile &&
      (updatedProfile !== null || errorUpdatedProfile)
    ) {
      if (updatedProfile) {
        notify(false, 'Updated Profile info!');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else notify(true, errorUpdatedProfile);
      dispatch({ type: 'PROFILE_UPDATE_INFO_RESET' });
      closeModal();
    }
  }, [loadingUpdatedProfile]);

  const {
    success: successChangePassword,
    loading: loadingChangePassword,
    error: errorChangePassword,
  } = useSelector((state) => state.profileChangePassword);
  useEffect(() => {
    if (
      !loadingChangePassword &&
      (successChangePassword || errorChangePassword)
    ) {
      if (successChangePassword)
        notify(false, 'Bạn đã đổi mật khẩu thành công!');
      else notify(true, errorChangePassword);
      dispatch({ type: 'PROFILE_CHANGE_PASSWORD_RESET' });
      closeModal();
    }
  }, [loadingChangePassword]);

  const updateProfileHandler = (data) => {
    const payload = {
      bio: data.bio,
      name: data.name,
    };
    if (window.confirm('Are you sure to update your profile!')) {
      reset();
      dispatch(profileUpdateInfo(payload));
    }
    reset();
  };

  const changePasswordHandler = (data) => {
    if (data.newPassword !== data.confirmedNewPassword)
      window.alert('Make sure you confirm your password properly!');
    else if (!loadingChangePassword) {
      if (window.confirm('Bạn có chắc là muốn đổi mặt khẩu không!')) {
        passwordReset();
        dispatch(
          profileChangePassword({
            currentPassword: data.currentPassword,
            newPassword: data.newPassword,
            confirmedNewPassword: data.confirmedNewPassword,
          })
        );
      }
    }
  };

  return (
    <Modal show={isShow} onClose={closeModal}>
      {loadingMyProfile ? (
        <Loader
          className={'py-3'}
          loader={Math.floor(Math.random() * 10 + 1)}
          color={Math.floor(Math.random() * 10 + 1)}
        />
      ) : errorMyProfile ? (
        <Alert className={'mt-3'}>{errorMyProfile}</Alert>
      ) : (
        myProfile && (
          <div className='flex'>
            <form
              className='flex flex-col w-1/2 pr-2 bg-gray-700'
              onSubmit={handleSubmit(updateProfileHandler)}
            >
              <div className='text-xl font-bold text-left text-gray-200 lg:text-2xl'>
                Change your info
              </div>
              <label className='modalFormLabel'>Bio</label>
              <input
                className='modalFormField'
                type='text'
                defaultValue={myProfile.bio ?? null}
                autoComplete='off'
                {...register('bio')}
              />

              <label className='mt-2 modalFormLabel'>Name</label>
              <input
                className='modalFormField'
                type='text'
                defaultValue={myProfile.name ?? null}
                autoComplete='off'
                required
                {...register('name')}
              />

              {loadingMyProfile ? (
                <button
                  className='my-5 opacity-50 modalFormButton hover:bg-orange-600'
                  disabled
                >
                  Loading...
                </button>
              ) : (
                <button className='my-5 modalFormButton' type='submit'>
                  Update info
                </button>
              )}
            </form>

            <form
              className='flex flex-col justify-start w-1/2 pl-2 bg-gray-700'
              onSubmit={passwordHandleSubmit(changePasswordHandler)}
            >
              <div className='text-xl font-bold text-left text-gray-200 lg:text-2xl'>
                Change your password
              </div>

              <label className='modalFormLabel'>Current Password</label>
              <input
                className='modalFormField'
                name='currentPassword'
                type='password'
                required
                placeholder='Current password'
                {...passwordRegister('currentPassword')}
              />

              <label className='mt-2 modalFormLabel'>New password</label>
              <input
                className='modalFormField'
                name='newPassword'
                type='password'
                required
                placeholder='New password'
                {...passwordRegister('newPassword')}
              />

              <label className='mt-2 modalFormLabel'>
                Confirm your new password
              </label>
              <input
                className='modalFormField'
                name='confirmedNewPassword'
                type='password'
                required
                placeholder='Confirm password'
                {...passwordRegister('confirmedNewPassword')}
              />
              {loadingChangePassword ? (
                <button
                  className='my-5 opacity-50 modalFormButton hover:bg-orange-600'
                  disabled
                >
                  Loading...
                </button>
              ) : (
                <button className='my-5 modalFormButton' type='submit'>
                  Change password
                </button>
              )}
            </form>
          </div>
        )
      )}
    </Modal>
  );
};

export default ModalUpdateProfile;
