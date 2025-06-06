import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { signup } from '../redux/actions/userActions';
import notify from '../utils/notify';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const illegalChars = /^[a-z0-9_-]{5,15}$/gim; // allow letters, numbers, and underscores

const SignupScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { register, reset, handleSubmit } = useForm(); // initialize the hook
  const { userInfo } = useSelector((state) => state.userLogin);

  const { userSignup, loading, error } = useSelector(
    (state) => state.userSignup
  );
  useEffect(() => {
    if (!loading && (userSignup !== null || error)) {
      if (userSignup) {
        notify(
          false,
          `Đăng kí thành công tài khoản: ${userSignup.username}! Vui long xac nhan tai khoan qua mail da dang ky!!`
        );
        reset();
        history.push('/login');
      } else notify(true, error);
      dispatch({ type: 'USER_SIGNUP_RESET' });
    }
  }, [loading]);

  useEffect(() => {
    if (userInfo) history.push('/home');
  }, [userInfo, history]);

  const signupHandler = (data) => {
    if (!loading) {
      if (!data.username.match(illegalChars)) {
        window.alert(
          'Username không được chứa kí tự đặc biệt, ít nhất 5-30 kí tự!'
        );
      } else if (
        data.password &&
        data.confirmPassword &&
        data.password !== data.confirmPassword
      ) {
        window.alert('Xác nhận lại mật khẩu của bạn!');
      } else if (
        data.password &&
        data.confirmPassword &&
        data.password === data.confirmPassword
      ) {
        if (data.password.length < 8)
          window.alert('Mật khẩu phải ít nhất 8 kí tự!');
        else
          dispatch(
            signup({
              username: data.username,
              email: data.email,
              name: data.name,
              password: data.password,
            })
          );
      }
    }
  };

  return (
    <div className='flex flex-col items-center justify-center w-full mt-10'>
      <div className='w-11/12 max-w-lg md:w-full animate-leftToRight'>
        <div className='w-full py-5 text-2xl font-bold text-left text-white bg-orange-600 rounded-t-md md:text-3xl px-7'>
          Sign up <i className='fas fa-id-card-alt' />
        </div>
        <form
          className='flex flex-col w-full px-8 pb-3 shadow-lg dark:bg-gray-800 rounded-b-md'
          onSubmit={handleSubmit(signupHandler)}
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
          <div className='mt-3'>
            <label className='labelField'>Email</label>
            <input
              className='text-gray-200 bg-gray-700 modalFormField'
              type='email'
              {...register('email')}
              required
              placeholder='Your email'
            />
          </div>
          <div className='mt-3'>
            <label className='labelField'>Name</label>
            <input
              className='text-gray-200 bg-gray-700 modalFormField'
              type='text'
              {...register('name')}
              required
              placeholder='Your name'
            />
          </div>
          <div className='mt-3'>
            <label className='labelField'>Password</label>
            <input
              className='text-gray-200 bg-gray-700 modalFormField'
              type='password'
              {...register('password')}
              placeholder='Your password'
              required
            />
          </div>
          <div className='mt-3 mb-5'>
            <label className='labelField'>Confirm Password</label>
            <input
              className='text-gray-200 bg-gray-700 modalFormField'
              type='password'
              {...register('confirmPassword')}
              placeholder='Confirm your password'
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
                Sign up
              </button>
            )}
          </div>
          <div className='mt-3 labelField'>
            Already have an account?{' '}
            <Link to='/login' className='underline hover:text-orange-500'>
              Sign in!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupScreen;
