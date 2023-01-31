import { initializeApp } from "firebase/app";
import {
getAuth,
updateProfile,
signInWithEmailAndPassword,
createUserWithEmailAndPassword,
sendPasswordResetEmail,
signOut,
} from "firebase/auth";
import {
getFirestore,
collection,
addDoc,
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC84QEm_BT77ocIwq1FrmeOOkX1yuikJaU",
    authDomain: "trans-can-work.firebaseapp.com",
    projectId: "trans-can-work",
    storageBucket: "trans-can-work.appspot.com",
    messagingSenderId: "454640569499",
    appId: "1:454640569499:web:58a2ba7beb0e8f412f4a3e",
    measurementId: "G-K3V885RFK0"
  };

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
  };

  //const getSnapshot = async
  const addToAdminPool = async (firstName, lastName, email, password) => {
    console.log(firstName)
    try {
      await addDoc(collection(db, "potentialAdmins"), {
        firstName, 
        lastName,
        authProvider: "local",
        email,
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
      return
    }
    alert("Applied to be an Admin");
  };

  const registerWithEmailAndPassword = async (firstName, lastName, accountType, email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      await addDoc(collection(db, "allUsers"), {
        uid: user.uid,
        firstName, 
        lastName,
        accountType,
        authProvider: "local",
        email,
      }).then(() => {
        updateProfile(auth.currentUser, {
          displayName: firstName,
        })
      });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = () => {
    signOut(auth)
  };

  export {
    auth,
    db,
    addToAdminPool,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,
  };