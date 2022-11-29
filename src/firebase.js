// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const key = process.env.REACT_APP_FIREBASE_API_KEY;
console.log(process.env);

const firebaseConfig = {
  apiKey: "AIzaSyC84QEm_BT77ocIwq1FrmeOOkX1yuikJaU",
  authDomain: "trans-can-work.firebaseapp.com",
  projectId: "trans-can-work",
  storageBucket: "trans-can-work.appspot.com",
  messagingSenderId: "454640569499",
  appId: "1:454640569499:web:58a2ba7beb0e8f412f4a3e",
  measurementId: "G-K3V885RFK0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);