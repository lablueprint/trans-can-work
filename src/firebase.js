// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  updateProfile,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
} from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// eslint-disable-next-line no-unused-vars
const key = process.env.REACT_APP_FIREBASE_API_KEY;
console.log(process.env);

const firebaseConfig = {
  apiKey: 'AIzaSyC84QEm_BT77ocIwq1FrmeOOkX1yuikJaU',
  authDomain: 'trans-can-work.firebaseapp.com',
  projectId: 'trans-can-work',
  storageBucket: 'trans-can-work.appspot.com',
  messagingSenderId: '454640569499',
  appId: '1:454640569499:web:58a2ba7beb0e8f412f4a3e',
  measurementId: 'G-K3V885RFK0',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  return true;
};

const registerWithEmailAndPassword = async (
  firstName,
  lastName,
  accountType,
  email,
  password,
  setDisplayName,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const { user } = res;
    setDisplayName(firstName);
    await addDoc(collection(db, 'allUsers'), {
      uid: user.uid,
      firstName,
      lastName,
      accountType,
      authProvider: 'local',
      email,
    }).then(() => {
      updateProfile(auth.currentUser, {
        displayName: firstName,
      });
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
  return true;
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logout = () => {
  signOut(auth);
};

// export const db = getFirestore(app);
export default getFirestore(app);
export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
