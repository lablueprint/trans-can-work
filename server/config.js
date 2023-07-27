const { initializeApp } = require('firebase/app');
const { getAuth, signInWithEmailAndPassword } = require('firebase/auth');
const {
  getFirestore, getDocs, collection,
} = require('firebase/firestore');
require('dotenv').config();

const adminEmail = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASS;

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
const auth = getAuth(app);
const db = getFirestore(app);

const getEmails = async () => {
  await signInWithEmailAndPassword(auth, adminEmail, password);
  const colRef = collection(db, 'users');
  try {
    const docsSnap = await getDocs(colRef);
    const emailList = [];
    const dataList = [];
    docsSnap.forEach(async (doc) => {
      // need to add a last milestone complete date
      // archived check too
      if (doc.data().role === 'jobseeker') {
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
