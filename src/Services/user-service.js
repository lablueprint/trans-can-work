import {
  doc, setDoc, getDoc, updateDoc, collection, getDocs, query, where, deleteDoc,
} from 'firebase/firestore';
import {
  GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword,
  sendPasswordResetEmail, signOut, signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  jobseekerUserInit, navigatorUserInit, jobseekerDataObject,
} from './user-objects';
import { db, auth } from '../firebase';

const provider = new GoogleAuthProvider();

/** *********** CRUD FUNCTIONS ************ */
export const createUser = async (uid, email, role, firstName = '', lastName = '', pronouns = '', bio = '', phoneNumber = '') => {
  let userObject = {
    approved: false,
    uid,
    firstName,
    lastName,
    pronouns,
    role,
    bio,
    phoneNumber,
  };
  if (role === 'jobseeker') userObject = { ...userObject, ...jobseekerUserInit };
  else if (role === 'navigator') userObject = { ...userObject, ...navigatorUserInit };

  console.log(userObject);
  await setDoc(doc(db, 'users', email), userObject).then(async () => {
    if (role === 'jobseeker') {
      await setDoc(doc(db, 'jobseekerData', email), jobseekerDataObject);
    }
  });
};

export const fetchUser = async (email) => {
  const docRef = doc(db, 'users', email);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('user: ', docSnap);
      return docSnap;
    }
    console.log('user ', email, ' does not exist');
    return undefined;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const fetchAllUsers = async () => {
  const colRef = collection(db, 'users');
  try {
    const docsSnap = await getDocs(colRef);
    return docsSnap;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const fetchUsersByNavigator = async (email) => {
  const colRef = collection(db, 'users');
  const navRef = doc(db, 'users', email);
  try {
    const docsSnap = await getDocs(query(colRef, where('navigator', '==', navRef)));
    return docsSnap;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// update this method to accomodate changes into store!
export const updateUser = async (email, data) => {
  await setDoc(doc(db, 'users', email), data)
    .then(() => {
      console.log('updated user ', email);
    }).catch((err) => {
      alert(err.stack);
    });
};

// could add check for if the user is a jobseeker + deletion of their record if necessary
export const deleteUser = async (email) => {
  await deleteDoc(doc(db, 'users', email)).then(() => {
    console.log('User account ', email, ' has been deleted successfully.');
  })
    .catch((error) => {
      console.log(error);
    });
};

/** *********** SIGN IN FUNCTIONS ************ */

export const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

// this function doesn't properly handle the case if the user had not previously been created!
// we couldn't know from the login screen what role the user wants
export const handleGoogleSignIn = async () => {
  await signInWithPopup(auth, provider).then(async (result) => {
    const { user } = result;
    console.log(user);
    // handle the issue here!
  });
};

/** *********** SIGN UP FUNCTIONS ************ */
export const register = async (data) => {
  const res = await createUserWithEmailAndPassword(auth, data.email, data.password);
  const { user } = res;
  await createUser(user.uid, data.email, data.role, data.firstName, data.lastName);
};

export const handleGoogleSignUp = async (role) => {
  await signInWithPopup(auth, provider).then(async (result) => {
    const { user } = result;
    console.log(user);
    await createUser(user.uid, user.email, role, user.displayName);
  });
};

/** *********** SIGN OUT FUNCTIONS ************ */
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

/** *********** ACCOUNT FUNCTIONS ************ */
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (err) {
    alert('sendPasswordReset Error');
    console.error(err);
  }
};
