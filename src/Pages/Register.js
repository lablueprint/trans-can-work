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
  try {
    const docSnap = await fetchJobseeker(email);
    if (docSnap.exists()) {
      return docSnap.data().approval;
    }
    console.log(`Jobseeker ${email} not found`);
  } catch (error) {
    console.log(`Error getting approval status for ${email}: ${error.message}`);
  }
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
      console.log(user.displayName);
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
    if (firstName === '' || lastName !== '') {
      alert('Please enter a valid name');
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
    if (firstName === '' || lastName !== '') {
      alert('Please enter a valid name');
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
        const approves = await getApprovalStatus(googleUser.email);
        navigate(approves ? '/' : '/splash');
      })
      .catch((error) => {
        alert(error);
        // Sign-in with Google failed
      });
  };
  return (
    <div>

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
        <input
          className="registerFormItem"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          className="registerFormItem"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <select
          name="accountType"
          className="registerFormItem"
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option disabled selected value> -- Select Account Type -- </option>
          <option value="administrator">Administrator</option>
          <option value="navigator">Navigator</option>
          <option value="jobseeker">Jobseeker</option>
        </select>
        <input
          className="registerFormItem"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
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
          Submit
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
        Have an account? Sign in here!
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
export default Register;
