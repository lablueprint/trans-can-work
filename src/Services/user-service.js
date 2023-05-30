// do we want to id records by email?? or id - use addDoc if so
import {
  doc, setDoc, getDoc, updateDoc,
} from 'firebase/firestore';
import {
  GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  sendPasswordResetEmail, signOut,
} from 'firebase/auth';
import { jobseekerInit, navigatorInit, adminInit } from './user-objects';
import { db, auth } from '../firebase';

// fetch + update
export const fetchUser = async (email) => {
  const docRef = doc(db, 'users', email);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('user: ', docSnap);
      return docSnap;
    }
    console.log('user ', email, ' does not exist');
    return null;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateNavigator = async (email, data) => {
  await updateDoc(doc(db, 'users', email), data)
    .then(() => {
      console.log('updated navigator ', email);
    }).catch((err) => {
      alert(err.stack);
    });
};

// edit this method to use store eventually!

/** Login Methods */
export const login = async (email, password) => {
  signInWithEmailAndPassword(auth, email.toLowerCase(), password)
    .then((userCredential) => {
      const { user } = userCredential;
      return user;
    })
    .catch((error) => error);
};

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const { user } = result;
      console.log(user);
      // save to store!!
      //   const approves = await getApprovalStatus(googleUser.email);
      //   navigate(approves ? '/' : '/splash');
    }).catch((e) => {
      // Handle Errors here.
      const errorCode = e.code;
      console.log(errorCode);
      const googleErrorMessage = e.message;
      console.log(googleErrorMessage);
    });
};

/** Sign up Methods */
const addUser = async (uid, email, authenticName, pronouns, accountType) => {
  let userObject = {
    uid,
    fullname: authenticName,
    bio: '',
    approved: false,
    pronouns,
    accountType,
    authProvider: 'local',
    email,
  };
  if (accountType === 'jobseeker') userObject = { ...userObject, ...jobseekerInit };
  else if (accountType === 'navigator') userObject = { ...userObject, ...navigatorInit };
  else if (accountType === 'admin') userObject = { ...userObject, ...adminInit };
  console.log(userObject);
  await setDoc(doc(db, 'users', email), userObject).then(() => {
    // save to store!
    // fix this in register.js, to authenticName
    // updateProfile(auth.currentUser, {
    //   displayName: firstName,
    // });
  }).catch((error) => console.error(error));
};

export const register = async (data) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
    const { user } = res;
    await addUser(user.uid, data.email, data.name, data.pronouns, data.role);
    // save token to store!
  } catch (err) {
    alert('Register failed: Account already exists');
    console.error(err);
  }
};

export const handleGoogleSignUp = async (accountType) => {
  const provider = new GoogleAuthProvider();

  try {
    const result = signInWithPopup(auth, provider);
    // Signed in successfully with Google
    // The signed-in user info.
    const { user } = result;
    await addUser(user.uid, user.displayName, accountType);
    // save token to store!
  } catch (error) {
    alert('GoogleSignUp Error');
    console.error(error);
  }
};

/** Sign Out Methods */
export const logout = () => {
  console.log('logging out');
  signOut(auth).then(() => {
    console.log('success');
    // Sign-out successful. update store
  }).catch((error) => {
    alert(error);
    console.error(error);
  });
};

/** Account Fixes */
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    alert('sendPasswordReset Error');
    console.error(err);
  }
};

/** Delete Account */
// add later!
