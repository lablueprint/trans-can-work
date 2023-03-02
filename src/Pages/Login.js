import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword, logout } from '../Components/firebase';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user] = useAuthState(auth);
  const login = async () => {
    const loggedIn = await logInWithEmailAndPassword(email.toLowerCase(), password);
    if (loggedIn) window.location.reload(true);
  };
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
