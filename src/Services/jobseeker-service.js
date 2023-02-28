import { doc, setDoc, query, where, getDoc, getDocs, updateDoc, deleteDoc, collection } from "firebase/firestore";
import firebase from '../firebase';
var db = firebase

// CRUD functions
//data in form {"name": "John"} for instance; remember event.preventDefault() when using.
export const createJobseeker = async (email, data) => {
  await setDoc(doc(db, "jobseekers", email), data).then(function () {
    console.log(`created new jobseeker`);
  }).catch(function (err) {
    alert(err.stack);
  });
}

export const fetchJobseeker = async (email) => {
  const docRef = doc(db, "jobseekers", email);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("jobseeker: ", docSnap.data());
      return docSnap.data();
    } else {
      console.log("jobseeker ", email, " does not exist");
    }
  }
  catch (error) {
    console.log(error);
  }
}

export const fetchAllJobseekers = async () => {
  const colRef = collection(db, "jobseekers");
  try {
    const docsSnap = await getDocs(colRef);
    return docsSnap.docs.map(doc => doc.data());
  } catch (error) {
    console.log(error);
  }
}

export const fetchByNavigator = async (email) => {
  const colRef = collection(db, "jobseekers");
  const navRef = doc(db, "navigator", email)
  try {
    const docsSnap = await getDocs(query(colRef, where("navigator", "==", navRef)));
    return docsSnap.docs.map(doc => doc.data());
  } catch (error) {
    console.log(error);
  }
}

export const updateJobseeker = async (email, data) => {
  await updateDoc(doc(db, "jobseekers", email), data)
    .then(function () {
      console.log(`updated jobseeker `, email);
    }).catch(function (err) {
      alert(err.stack);
    });
}

export const deleteJobseeker = async (email) => {
  await deleteDoc(doc(db, "jobseekers", email)).then(() => {
    console.log("Jobseeker account ", email, " has been deleted successfully.")
  })
    .catch(error => {
      console.log(error);
    });
}

//MILESTONE ROUTES:
//depends on how userData is implemented. may not need to pass in JSemail; so waiting to implement.
// initial thought: would pull user data before calling this function; pass in email, milestoneIndex, and navigator email. 
// reason not inside is bc we want to reuse this route in case a navigator or admin wants to call it.
// milestoneArray format: [”completed”, “completed”, “awaiting approval,” “completed, “incomplete”, “incomplete”]
export const pingNavigator = async (JSemail, milestoneIndex, NavEmail, milestoneArray) => {
  milestoneArray[milestoneIndex] = "awaiting approval";
  await updateDoc(doc(db, "jobseekers", JSemail), { "milestoneArray": milestoneArray })
    .then(function () {
      //email NavEmail here; may potentially have multiple navigators(?)
      console.log(`pinged navigator for milestone approval `, JSemail);
    }).catch(function (err) {
      alert(err.stack);
    });
}

export const markComplete = async (JSemail, milestoneIndex, NavEmail, milestoneArray) => {
  milestoneArray[milestoneIndex] = "completed";
  await updateDoc(doc(db, "jobseekers", JSemail), { "milestoneArray": milestoneArray })
    .then(function () {
      console.log(`marked milestone complete!`, JSemail);
    }).catch(function (err) {
      alert(err.stack);
    });
}

export const markIncomplete = async (JSemail, milestoneIndex, NavEmail, milestoneArray) => {
  await updateDoc(doc(db, "jobseekers", JSemail), { "milestoneArray": milestoneArray })
    .then(function () {
      console.log(`reset milestone to incomplete `, JSemail);
    }).catch(function (err) {
      alert(err.stack);
    });
}
  //reasoning for 3 separate routes: 1) pingNav has unique permissioning; 2) simpler than combining
