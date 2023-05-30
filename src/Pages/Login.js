import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import {
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { logout } from '../Services/user-service';
import { auth } from '../firebase';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const user = useSelector((state) => state.auth.value);
  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email.toLowerCase(), password)
      .then((userCredential) => {
        // edit store
        const userTemp = userCredential.user;
        console.log(userTemp);
        navigate('/');
      })
      .catch((error) => {
        // add proper error handling
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log('An error occured: ', errorCode, errorMessage);
      });
  };

  return (
    <div>
      {/* user !== undefined
          &&  ( */
        <div>
          <div>
            <button
              type="submit"
              onClick={() => logout()}
            >
              Sign Out

            </button>
          </div>
        </div>
          /* ) */}
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
          type="submit"
          className="loginInput"
          onClick={onLogin}
        >
          Login
        </button>
        {/* <button type="submit" onClick={(event) =>
          onSubmit(event, signInWithGoogle())}>Log in with Google</button> */}
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
