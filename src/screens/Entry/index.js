import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../../redux/actions/userActions';
import * as Components from '../../components/Components';

export const Entry = ({ history }) => {
  const [signIn, setSignIn] = React.useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) history.push('/');
  }, [userInfo]);

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        width: '100%',
        maxHeight: window.innerHeight,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form onSubmit={(e) => loginHandler(e)}>
            <Components.Title>Create Account</Components.Title>
            <Components.Input type='text' placeholder='Name' />
            <Components.Input type='email' placeholder='Email' />
            <Components.Input type='password' placeholder='Password' />
            <Components.Input
              type='password'
              placeholder='Confirm your password'
            />
            <Components.Button>Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form onSubmit={(e) => loginHandler(e)}>
            <Components.Title>Sign in</Components.Title>
            <Components.Input
              onChange={(e) => setUsername(e.target.value)}
              type='text'
              placeholder='Username'
            />
            <Components.Input
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
            />
            <Components.Anchor href='#'>
              Forgot your password?
            </Components.Anchor>
            <Components.Button>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>

        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>

            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => setSignIn(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </div>
  );
};
