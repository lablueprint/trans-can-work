import React, { useState } from 'react';
// import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import { sendPasswordReset } from '../firebase';
import './Reset.css';

function Reset() {
  const [email, setEmail] = useState('');
  // const [user, loading, error] = useAuthState(auth);

  return (
    <div>
      <div className="reset">
        <p>Forgot Password</p>
        <p>Enter your email to receive a reset link</p>
        <input
          type="text"
          className="resetInput"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          type="submit"
          className="resetInput"
          onClick={() => sendPasswordReset(email)}
        >
          Send
        </button>
        <div>
          {' '}
          <Link to="/login">
            {' '}
            Back to login page
          </Link>
          {' '}
        </div>
      </div>
    </div>
  );
}
export default Reset;
