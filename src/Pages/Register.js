import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { registerWithEmailAndPassword, logout } from '../Components/firebase';
import { createNavigator } from '../Services/navigator-service';
import { createJobseeker } from '../Services/jobseeker-service';
import { createAdmin } from '../Services/admin-service';

import './Register.css';

const auth = getAuth();
const data = {
  name: 'Solia',
  paper: 'ayub',
  'fun fact': 'ableist',
  'helen keller': 'does not exist',
  approved: false,
};

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [user, loading] = useAuthState(auth);
  // const [googleLoggedIn, setGoogleLoggedIn] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [displayName, setDisplayName] = useState('');
  // const [registeredAsAdmin, setRegisteredAsAdmin] = useState(false);
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
    if (firstName === '' || lastName === '') {
      alert('Please enter your name');
      return;
    }
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
      createNavigator(email, data);
    } else if (accountType === 'jobseeker') {
      createJobseeker(email, data);
    } else {
      createAdmin(email, data);
    }
    if (registered === true) window.location.reload(true);
  };
  const provider = new GoogleAuthProvider();

  const handleGoogleSignUp = async () => {
    if (firstName === '' || lastName === '') {
      alert('Please enter your name');
      return;
    }
    if (accountType !== 'navigator' && accountType !== 'jobseeker' && accountType !== 'admin') {
      alert('Please select a role');
      return;
    }
    signInWithPopup(auth, provider)
      .then(async (result) => {
        // Signed in successfully with Google
        console.log('SC');
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log('credential: ', credential);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const { user: googleUser } = result;
        console.log(googleUser);
        console.log('email', googleUser.email);
        if (accountType === 'navigator') {
          createNavigator(googleUser.email, data);
        } else if (accountType === 'jobseeker') {
          createJobseeker(googleUser.email, data);
        } else {
          createAdmin(googleUser.email, data);
        }
      }).then(() => {
        console.log('waiting for approval');
      })
      .catch((error) => {
        alert(error);
        // Sign-in with Google failed
      });
  };
  useEffect(() => {
    const userRef = firebase.firestore().collection('users').doc(email);
    const unsubscribe = userRef.onSnapshot((doc) => {
      if (doc.exists && doc.data().status === 'approved') {
        useNavigate('/'); // Redirect to home page once user is approved
      }
    });

    return () => unsubscribe(); // Unsubscribe from listener when component unmounts
  }, [email, history]);
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
                type="button"
                onClick={() => logoutUser()}
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
