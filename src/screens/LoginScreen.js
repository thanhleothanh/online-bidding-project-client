import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../redux/actions/userActions';
import notify from '../utils/notify';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const LoginScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const { userInfo, loading, error } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (!loading && (userInfo !== null || error)) {
      if (userInfo) {
        notify(false, 'Đăng nhập thành công!');
        reset();
      } else {
        notify(true, error);
        dispatch({ type: 'USER_LOGIN_RESET' });
      }
    }
  }, [loading]);

  useEffect(() => {
    if (userInfo) history.push('/');
  }, [userInfo, history]);

  const loginHandler = (data) => {
    dispatch(login(data.username, data.password));
  };

  return (
    <div className='flex flex-col items-center justify-center w-full mt-10'>
      <div className='w-11/12 max-w-lg md:w-full animate-leftToRight'>
        <div className='w-full py-5 text-2xl font-bold text-left text-gray-200 bg-orange-600 rounded-t-md md:text-3xl px-7'>
          Login <i className='fas fa-fingerprint' />
        </div>
        <form
          className='flex flex-col w-full px-8 pb-3 shadow-lg dark:bg-gray-800 rounded-b-md'
          onSubmit={handleSubmit(loginHandler)}
          id='loginForm'
        >
          <div className='mt-3'>
            <label className='labelField'>Username</label>
            <input
              className='text-gray-200 bg-gray-700 modalFormField'
              type='text'
              {...register('username')}
              required
              placeholder='Your username'
            />
          </div>
          <div className='mt-3 mb-5'>
            <label className='labelField'>Password</label>
            <input
              className='text-gray-200 bg-gray-700 modalFormField'
              type='password'
              {...register('password')}
              placeholder='Your password'
              required
            />
          </div>
          <div className='flex items-center justify-between outline-none'>
            {loading ? (
              <button
                className='font-semibold bg-orange-600 opacity-50 hover:bg-orange-600 genericButton'
                disabled
                type='submit'
              >
                Loading...
              </button>
            ) : (
              <button
                className='font-semibold bg-orange-600 hover:bg-orange-700 genericButton'
                type='submit'
              >
                Sign In
              </button>
            )}
          </div>
          <div className='mt-3 labelField'>
            Don't have an account?{' '}
            <Link to='/signup' className='underline hover:text-orange-500'>
              Sign up here!
            </Link>
          </div>
        </form>
        <div className='w-full mt-6'></div>
      </div>
    </div>
  );
};

export default LoginScreen;
