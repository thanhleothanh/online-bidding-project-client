import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions/userActions';
import * as EntryComponents from '../../components/EntryComponents';
import notify from '../../utils/notify';

export const Entry = ({ history }) => {
  const dispatch = useDispatch();
  const [signIn, setSignIn] = React.useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo, loading, error } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (!loading && (userInfo !== null || error)) {
      if (userInfo) notify(false, 'Đăng nhập thành công!');
      else notify(true, error);
    }
  }, [loading]);

  useEffect(() => {
    if (userInfo) history.push('/');
  }, [userInfo]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div className='flex flex-col w-full h-screen'>
      <div className='flex items-center justify-center w-full h-full'>
        <EntryComponents.Container className='relative'>
          <EntryComponents.SignUpContainer signingIn={signIn}>
            <EntryComponents.Form onSubmit={(e) => loginHandler(e)}>
              <EntryComponents.Title>Create Account</EntryComponents.Title>
              <EntryComponents.Input type='text' placeholder='Username' />
              <EntryComponents.Input type='email' placeholder='Email' />
              <EntryComponents.Input type='text' placeholder='Name' />
              <EntryComponents.Input type='password' placeholder='Password' />
              <EntryComponents.Input
                type='password'
                placeholder='Confirm your password'
              />
              <EntryComponents.Button>Sign Up</EntryComponents.Button>
            </EntryComponents.Form>
          </EntryComponents.SignUpContainer>
          <EntryComponents.SignInContainer signingIn={signIn}>
            <EntryComponents.Form onSubmit={(e) => loginHandler(e)}>
              <EntryComponents.Title>Sign in</EntryComponents.Title>
              <EntryComponents.Input
                onChange={(e) => setUsername(e.target.value)}
                type='text'
                placeholder='Username'
              />
              <EntryComponents.Input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                placeholder='Password'
              />
              <EntryComponents.Button>Sign In</EntryComponents.Button>
            </EntryComponents.Form>
          </EntryComponents.SignInContainer>

          <EntryComponents.OverlayContainer signingIn={signIn}>
            <EntryComponents.Overlay signingIn={signIn}>
              <EntryComponents.LeftOverlayPanel signingIn={signIn}>
                <EntryComponents.Title>Welcome Back!</EntryComponents.Title>
                <EntryComponents.Paragraph>
                  To keep connected with us please login with your personal info
                </EntryComponents.Paragraph>
                <EntryComponents.GhostButton onClick={() => setSignIn(true)}>
                  Sign In
                </EntryComponents.GhostButton>
              </EntryComponents.LeftOverlayPanel>

              <EntryComponents.RightOverlayPanel signingIn={signIn}>
                <EntryComponents.Title>Hello, Friend!</EntryComponents.Title>
                <EntryComponents.Paragraph>
                  Enter your personal details and start journey with us
                </EntryComponents.Paragraph>
                <EntryComponents.GhostButton onClick={() => setSignIn(false)}>
                  Sign Up
                </EntryComponents.GhostButton>
              </EntryComponents.RightOverlayPanel>
            </EntryComponents.Overlay>
          </EntryComponents.OverlayContainer>
        </EntryComponents.Container>
      </div>
    </div>
  );
};
