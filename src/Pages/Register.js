import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { registerWithEmailAndPassword, logout, addToAdminPool } from '../Components/firebase';
import './Register.css';

const auth = getAuth();

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [user, loading] = useAuthState(auth);
  const [googleLoggedIn, setGoogleLoggedIn] = useState(false);

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
    if (accountType === 'administrator') {
      console.log(firstName);
      addToAdminPool(firstName, lastName, email, password);
    } else {
      const registered = await registerWithEmailAndPassword(
        firstName,
        lastName,
        accountType,
        email,
        password,
        setDisplayName,
      );
      if (registered === true) window.location.reload(true);
    }
  };
  const provider = new GoogleAuthProvider();

  function signUpWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log('SC');
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log('credential: ', credential);
        const token = credential.accessToken;
        console.log(token);
        // The signed-in user info.
        const { user: googleUser } = result;
        console.log(googleUser);
        setGoogleLoggedIn(true);
        console.log(googleLoggedIn);
        setEmail(googleUser.email);
        // setUsername(googleUser.displayName);
      // ...
      }).catch((error) => {
      // Handle Errors here.
        const errorCode = error.code;
        console.log(errorCode);

        const googleErrorMessage = error.message;
        console.log(googleErrorMessage);

        // The email of the user's account used.
        // const { email } = error.customData;
        // The AuthCredential type that was used.
        // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
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
          onClick={() => signUpWithGoogle()}
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
