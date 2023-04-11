import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { registerWithEmailAndPassword, logout } from '../Components/firebase';
import { createNavigator } from '../Services/navigator-service';
import { createJobseeker, fetchJobseeker } from '../Services/jobseeker-service';
import { createAdmin } from '../Services/admin-service';

import './Register.css';

const auth = getAuth();
// Sample data
const data = {
  name: 'Solia',
  paper: 'ayub',
  'fun fact': 'ableist',
  'helen keller': 'does not exist',
  approval: false,
};

export const getApprovalStatus = async (email) => {
  const docSnap = await fetchJobseeker(email);
  if (docSnap) {
    const approveData = docSnap.data();
    const approvalStatus = approveData.approval;
    return approvalStatus;
  }
  alert(`Jobseeker ${email} not found`);
  return null;
};

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  // We will use display name later, on the landing page
  // eslint-disable-next-line no-unused-vars
  const [displayName, setDisplayName] = useState('');
  // If we want to see if user is logged in
  useEffect(() => {
    if (!loading && user) {
      setDisplayName(user.displayName);
    }
  }, [user, loading]);

  const logoutUser = () => {
    logout();
    setDisplayName('');
  };
  const register = async () => {
    if (accountType !== 'navigator' && accountType !== 'jobseeker' && accountType !== 'admin') {
      alert('Please select a role');
      return;
    }
    const registered = await registerWithEmailAndPassword(
      firstName,
      lastName,
      accountType,
      email,
      password,
      setDisplayName,
    );
    if (accountType === 'navigator') {
      await createNavigator(email, data);
    } else if (accountType === 'jobseeker') {
      await createJobseeker(email, data);
    } else {
      await createAdmin(email, data);
    }
    if (registered === true) {
      const approves = await getApprovalStatus(email);
      navigate(approves ? '/' : '/splash');
    }
  };
  const provider = new GoogleAuthProvider();

  const handleGoogleSignUp = async () => {
    if (accountType !== 'navigator' && accountType !== 'jobseeker' && accountType !== 'admin') {
      alert('Please select a role');
      return;
    }
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // Signed in successfully with Google
        // The signed-in user info.
        const { user: googleUser } = result;
        if (accountType === 'navigator') {
          createNavigator(googleUser.email, data);
        } else if (accountType === 'jobseeker') {
          createJobseeker(googleUser.email, data);
        } else {
          createAdmin(googleUser.email, data);
        }
      })
      .catch((error) => {
        alert(error);
        // Sign-in with Google failed
      });
  };
  return (
    <div>
      <h3>TransCanWork</h3>
      <h2>Create Account</h2>
      {user !== null
          && (
          <div>
            <div>
              <button
                type="button"
                onClick={() => logoutUser()}
              >
                Sign Out

              </button>
            </div>
          </div>
          )}
      <div className="registerForm">
        <p>Full Name</p>
        <input
          className="registerFormItem"
          onChange={(e) => {
            const [newFirstName, newLastName] = e.target.value.split(' ');
            setFirstName(newFirstName);
            setLastName(newLastName);
          }}
          value={`${firstName} ${lastName}`}
        />

        <p>What best describes you?</p>
        <label htmlFor="administrator">
          <input
            id="administrator"
            type="checkbox"
            name="accountType"
            value="administrator"
            checked={accountType === 'administrator'}
            onChange={() => setAccountType('administrator')}
          />
          Administrator
        </label>
        <label htmlFor="navigator">
          <input
            id="navigator"
            type="checkbox"
            name="accountType"
            value="navigator"
            checked={accountType === 'navigator'}
            onChange={() => setAccountType('navigator')}
          />
          Navigator
        </label>
        <label htmlFor="jobseeker">
          <input
            id="jobseeker"
            type="checkbox"
            name="accountType"
            value="jobseeker"
            checked={accountType === 'jobseeker'}
            onChange={() => setAccountType('jobseeker')}
          />
          Jobseeker
        </label>
        {/* </div> */}

        <input
          className="registerFormItem"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <input
          className="registerFormItem"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          className="registerFormItem"
          type="submit"
          onClick={() => { register(firstName, lastName, accountType, email, password); }}
        >
          Sign Up
          {' '}
        </button>
        <button
          type="button"
          className="loginInput"
          onClick={() => handleGoogleSignUp()}
        >
          Sign in with Google
        </button>
      </div>
      <div>
        Already have an account?
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
export default Register;
