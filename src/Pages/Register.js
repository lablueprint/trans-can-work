import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
// import { registerWithEmailAndPassword, logout } from '../Components/firebase';
import { fetchJobseeker } from '../Services/jobseeker-service';
import { register, logout, handleGoogleSignUp } from '../Services/user-service';

import './Register.css';

// cases:
//   - if email already if use
//   - if password is invalid
//   - if fields are blank

const auth = getAuth();

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
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [firstName, setFirstName] = useState('');
  // const [lastName, setLastName] = useState('');
  const [accountType, setAccountType] = useState('');
  const [user, loading] = useAuthState(auth);
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

  const data = {
    name: fullName,
    email,
    password,
    approval: false,
    pronouns,
    role: accountType,
  };

  const logoutUser = () => {
    logout(); // should set auth to make user null and disappear as well
    setDisplayName('');
  };

  const registeration = async () => {
    await register(data);

    // i think register is incomplete on my end
    // await setDoc(doc(db, 'users', email), data).then(() => {
    //   console.log('create new user');
    // }).catch((err) => {
    //   alert(err.stack);
    // });
  };

  // const registeration = async () => {
  //   if (accountType !== 'navigator' && accountType !== 'jobseeker' && accountType !== 'admin') {
  //     alert('Please select a role');
  //     return;
  //   }
  //   const registered = await register(fullName, accountType, email, password);

  //   // const registered = await registerWithEmailAndPassword(
  //   //   firstName,
  //   //   lastName,
  //   //   accountType,
  //   //   email,
  //   //   password,
  //   //   setDisplayName,
  //   // );
  //   data = {
  //     name: fullName,
  //     approval: false,
  //     pronouns,
  //     role: accountType,
  //   };

  //   if (accountType === 'navigator') {
  //     await createNavigator(email, data);
  //   } else if (accountType === 'jobseeker') {
  //     await createJobseeker(email, data);
  //   } else {
  //     await createAdmin(email, data);
  //   }

  //   if (registered === true) {
  //     const approves = await getApprovalStatus(email);
  //     navigate(approves ? '/' : '/splash');
  //   }
  // };
  // const provider = new GoogleAuthProvider();

  const handleGoogle = async () => {
    if (accountType !== 'navigator' && accountType !== 'jobseeker' && accountType !== 'admin') {
      alert('Please select a role'); // eslint-disable-line no-alert
      return;
    }
    handleGoogleSignUp(accountType)
      .then(async (result) => {
        // Signed in successfully with Google
        // The signed-in user info.
        const { user: googleUser } = result;
        registeration(email, data);
        const approves = await getApprovalStatus(googleUser.email);
        navigate(approves ? '/' : '/splash');
      })
      .catch((error) => {
        alert(error);
        // Sign-in with Google failed
      });
    // signInWithPopup(auth, provider)
    //   .then(async (result) => {
    //     // Signed in successfully with Google
    //     // The signed-in user info.
    //     const { user: googleUser } = result;
    //     if (accountType === 'navigator') {
    //       createNavigator(googleUser.email, data);
    //     } else if (accountType === 'jobseeker') {
    //       createJobseeker(googleUser.email, data);
    //     } else {
    //       createAdmin(googleUser.email, data);
    //     }
    //     const approves = await getApprovalStatus(googleUser.email);
    //     navigate(approves ? '/' : '/splash');
    //   })
    //   .catch((error) => {
    //     alert(error);
    //     // Sign-in with Google failed
    //   });
  };
  return (
    <div>
      <section>
        <div>
          <h3>Welcome to</h3>
          <h2>TransCanWork</h2>
        </div>
        <div>
          <p>
            Trans Can Work (TCW) is a nonprofit organization committed to advancing
            workplace inclusion through innovative training strategies and workforce development.
          </p>
          <div>
            <p>
              <b>Sign up</b>
              {' '}
              for an Employment Roadmap today!
            </p>
            {/* insert image */}
          </div>
        </div>
      </section>
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
              <h2>
                welcome
                {' '}
                {fullName}
              </h2>
            </div>
          </div>
        )}
      <div className="registerForm">
        <select
          name="accountType"
          className="registerFormItem"
          onChange={(e) => setAccountType(e.target.value)}
        >
          <option disabled selected value>What best describes you?</option>
          <option value="navigator">Navigator</option>
          <option value="jobseeker">Jobseeker</option>
          <option value="administrator">Administrator</option>
        </select>
        <input
          className="registerFormItem"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
        />
        <input
          className="registerFormItem"
          value={pronouns}
          onChange={(e) => setPronouns(e.target.value)}
          placeholder="Pronouns"
        />
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
          onClick={() => { registeration(); }}
        >
          Submit
          {' '}
        </button>
        <button
          type="button"
          className="loginInput"
          onClick={() => handleGoogle()}
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
