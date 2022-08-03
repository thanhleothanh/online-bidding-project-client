import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader';
import { useForm } from 'react-hook-form';
import notify from '../../utils/notify';
import { profileChangePassword } from '../../redux/actions/profileActions';

const ProfileForm = () => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm(); // initialize the hook

  const { userInfo } = useSelector((state) => state.userLogin);
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
    }
  }, [loadingChangePassword]);

  const changePassword = (data) => {
    if (data.newPassword !== data.confirmedNewPassword)
      window.alert('Make sure you confirm your password properly!');
    else if (!loadingChangePassword) {
      if (window.confirm('Bạn có chắc là muốn đổi mặt khẩu không!')) {
        reset();
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
    <div className='sticky top-5'>
      <div className='w-full py-5 text-lg font-bold text-left text-gray-200 bg-orange-600 shadow-md xl:text-xl rounded-t-md pl-7'>
        About you
      </div>
      <form
        className='flex flex-col w-full px-8 pt-6 pb-8 mb-3 bg-gray-800 shadow-sm rounded-b-md'
        onSubmit={handleSubmit(changePassword)}
      >
        <div>
          <label className='labelField'>Username</label>
          <input
            className='bg-opacity-25 inputField'
            id='username'
            value={userInfo.username}
            type='text'
            disabled
            readOnly
          />
        </div>
        <div className='mt-2'>
          <label className='labelField'>Name</label>
          <input
            className='bg-opacity-25 inputField'
            id='name'
            value={userInfo.name}
            type='text'
            disabled
            readOnly
          />
        </div>
        <div className='mt-2'>
          <label className='labelField'>Email</label>
          <input
            className='bg-opacity-25 inputField'
            id='email'
            value={userInfo.email ?? 'n/a'}
            type='text'
            disabled
            readOnly
          />
        </div>
        <div className='mt-2'>
          <label className='labelField'>Status</label>
          <input
            className='bg-opacity-25 inputField'
            id='status'
            value={userInfo.status}
            type='text'
            disabled
            readOnly
          />
        </div>
        <div className='mt-2'>
          <label className='labelField'>Password</label>
          <input
            className='inputField'
            name='currentPassword'
            type='password'
            required
            placeholder='Current password'
            {...register('currentPassword')}
          />
        </div>
        <div className='mt-2'>
          <label className='labelField'>New password</label>
          <input
            className='inputField'
            name='newPassword'
            type='password'
            required
            placeholder='New password'
            {...register('newPassword')}
          />
        </div>
        <div className='mt-2'>
          <label className='labelField'>Confirm your new password</label>
          <input
            className='inputField'
            name='confirmedNewPassword'
            type='password'
            required
            placeholder='Confirm password'
            {...register('confirmedNewPassword')}
          />
        </div>
        <div className='flex items-center justify-between mt-5 outline-none'>
          <button
            className='w-full font-semibold bg-orange-600 genericButton hover:bg-orange-700'
            type='submit'
          >
            Change Password
          </button>
        </div>
        <div>
          {loadingChangePassword && (
            <Loader
              className={'py-3'}
              loader={Math.floor(Math.random() * 10 + 1)}
              color={Math.floor(Math.random() * 10 + 1)}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
