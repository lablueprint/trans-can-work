const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const {
  getFirestore, getDocs, collection,
} = require('firebase/firestore');
require('dotenv').config();
// eslint-disable-next-line import/no-extraneous-dependencies
const moment = require('moment');

const adminEmail = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASS;

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: 'trans-can-work.firebaseapp.com',
  projectId: 'trans-can-work',
  storageBucket: 'trans-can-work.appspot.com',
  messagingSenderId: '454640569499',
  appId: process.env.FIREBASE_APPID,
  measurementId: 'G-K3V885RFK0',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const getEmails = async () => {
  await signInWithEmailAndPassword(auth, adminEmail, password);
  const colRef = collection(db, 'users');
  try {
    const docsSnap = await getDocs(colRef);
    const emailList = [];
    const dataList = [];
    const today = moment();
    docsSnap.forEach(async (doc) => {
      // need to add a last milestone complete date
      if (doc.data().role === 'jobseeker' && doc.data().approved && !doc.data().complete && !doc.data().archived && today.diff(moment(new Date(doc.data().lastCompletion)), 'days') > 14) {
        emailList.push(doc.id);
        dataList.push(doc.data().firstName);
      }
    });
    return [emailList, dataList];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
module.exports = getEmails;
