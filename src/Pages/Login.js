import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import {
  useAuthState,
} from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword, logout } from '../Components/firebase';
import { getApprovalStatus } from './Register';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const login = async () => {
    const loggedIn = await logInWithEmailAndPassword(email.toLowerCase(), password);
    if (loggedIn) {
      const approves = await getApprovalStatus(email);
      navigate(approves ? '/' : '/splash');
    }
  };
  const provider = new GoogleAuthProvider();
  function signInWithGoogle() {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const { user: googleUser } = result;
        console.log(googleUser);
      }).catch((e) => {
      // Handle Errors here.
        const errorCode = e.code;
        console.log(errorCode);

        const googleErrorMessage = e.message;
        console.log(googleErrorMessage);
      });
  }

  return (
    <div>
      {user !== null
          && (
          <div>
            <div>
              Hello
              {' '}
              {user.displayName}
              <button
                type="submit"
                onClick={() => logout()}
              >
                Sign Out

              </button>
            </div>
          </div>
          )}
      {user === null && (
        <div>
          <div>
            Hello
          </div>
        </div>
      )}
      <div className="login">
        <input
          className="loginInput"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          className="loginInput"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          type="button"
          className="loginInput"
          onClick={() => login()}
        >
          Login
        </button>
        <button type="button" onClick={signInWithGoogle}>Log in with Google</button>

        <div>
          <Link to="/reset">Forgot Password?</Link>
        </div>
        <div>
          Don&apos;t have an account?
          {' '}
          <Link to="/register">Register</Link>
          {' '}
          now.
        </div>
      </div>
    </div>
  );
}
export default Login;
