import {
  doc, setDoc, query, where, getDoc, getDocs, updateDoc, deleteDoc, collection,
} from 'firebase/firestore';
import { db } from '../firebase';

// CRUD functions
// data in form {"name": "John"} for instance; remember event.preventDefault() when using.
export const createJobseeker = async (email, data) => {
  await setDoc(doc(db, 'jobseekers', email), data).then(() => {
    console.log('created new jobseeker', email, data);
  }).catch((err) => {
    alert(err.stack);
  });
};

export const fetchJobseeker = async (email) => {
  const docRef = doc(db, 'jobseekers', email);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap;
    }
    console.log('jobseeker ', email, ' does not exist');
    return null;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const fetchAllJobseekers = async () => {
  const colRef = collection(db, 'jobseekers');
  try {
    const docsSnap = await getDocs(colRef);
    // use docsSnap.docs.map(doc => doc.data());
    return docsSnap;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const fetchByNavigator = async (email) => {
  const colRef = collection(db, 'jobseekers');
  const navRef = doc(db, 'navigator', email);
  try {
    const docsSnap = await getDocs(query(colRef, where('navigator', '==', navRef)));
    return docsSnap;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateJobseeker = async (email, data) => {
  await setDoc(doc(db, 'jobseekers', email), data, { merge: true })
    .then(() => {
      console.log('updated jobseeker ', email);
    }).catch((err) => {
      alert(err.stack);
    });
};

export const deleteJobseeker = async (email) => {
  await deleteDoc(doc(db, 'jobseekers', email)).then(() => {
    console.log('Jobseeker account ', email, ' has been deleted successfully.');
  })
    .catch((error) => {
      console.log(error);
    });
};

// MILESTONE ROUTES:
// depends on how userData is implemented. may not need to pass in JSemail; so waiting to implement.
// initial thought: would pull user data before calling this function;
// pass in email, milestoneIndex, and navigator email.
// reason not inside is bc we want to reuse this route
// in case a navigator or admin wants to call it.
// milestoneArray format:
// [”completed”, “completed”, “awaiting approval,” “completed, “incomplete”, “incomplete”]
export const pingNavigator = async (JSemail, milestoneIndex, NavEmail, milestoneArray) => {
  const updatedMilestoneArray = [...milestoneArray];
  updatedMilestoneArray[milestoneIndex] = 'awaiting approval';
  await updateDoc(doc(db, 'jobseekers', JSemail), { milestoneArray: updatedMilestoneArray })
    .then(() => {
      // email NavEmail here; may potentially have multiple navigators(?)
      console.log('pinged navigator for milestone approval ', JSemail);
    }).catch((err) => {
      alert(err.stack);
    });
};

export const markComplete = async (JSemail, milestoneIndex, NavEmail, milestoneArray) => {
  const updatedMilestoneArray = [...milestoneArray];
  updatedMilestoneArray[milestoneIndex] = 'completed';
  await updateDoc(doc(db, 'jobseekers', JSemail), { milestoneArray: updatedMilestoneArray })
    .then(() => {
      console.log('marked milestone complete!', JSemail);
    }).catch((err) => {
      alert(err.stack);
    });
};

export const markIncomplete = async (JSemail, milestoneIndex, NavEmail, milestoneArray) => {
  await updateDoc(doc(db, 'jobseekers', JSemail), { milestoneArray })
    .then(() => {
      console.log('reset milestone to incomplete ', JSemail);
    }).catch((err) => {
      alert(err.stack);
    });
};
// reasoning for 3 separate routes: 1) pingNav has unique permissioning; 2) simpler than combining
