const { initializeApp } = require('firebase/app');
// const { getAuth } = require('firebase/auth');
const { getFirestore, getDoc, doc } = require('firebase/firestore');
// const { initializeApp } = require('firebase-admin/app');

const firebaseConfig = {
  apiKey: 'AIzaSyC84QEm_BT77ocIwq1FrmeOOkX1yuikJaU',
  authDomain: 'trans-can-work.firebaseapp.com',
  projectId: 'trans-can-work',
  storageBucket: 'trans-can-work.appspot.com',
  messagingSenderId: '454640569499',
  appId: '1:454640569499:web:58a2ba7beb0e8f412f4a3e',
  measurementId: 'G-K3V885RFK0',
};

const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);
const docRef = doc(db, 'users', 'email@gmail.com');
const docSnap = getDoc(docRef);

console.log(docSnap);
// module.exports = jobseekers;
