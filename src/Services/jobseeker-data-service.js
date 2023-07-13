import {
  doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, collection,
} from 'firebase/firestore';
import { db } from '../firebase';

/** *********** CRUD FUNCTIONS ************ */
export const createJobseekerData = async (email, data) => {
  await setDoc(doc(db, 'jobseekerData', email), data).then(() => {
    console.log('created new jobseeker');
  }).catch((err) => {
    alert(err.stack);
  });
};

export const fetchJobseekerData = async (email) => {
  const docRef = doc(db, 'jobseekerData', email);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('jobseeker: ', docSnap);
      return docSnap;
    }
    console.log('jobseeker ', email, ' does not exist');

    return null;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

// SHOULD NOT HAVE TO USE THIS FUNCTION
export const fetchAllJobseekerData = async () => {
  const colRef = collection(db, 'jobseekerData');
  try {
    const docsSnap = await getDocs(colRef);
    // use docsSnap.docs.map(doc => doc.data());
    return docsSnap;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateJobseekerData = async (email, data) => {
  await updateDoc(doc(db, 'jobseekerData', email), data)
    .then(() => {
      console.log('updated jobseeker ', email);
    }).catch((err) => {
      alert(err.stack);
    });
};

// could delete user record in the same step
export const deleteJobseekerData = async (email) => {
  await deleteDoc(doc(db, 'jobseekerData', email)).then(() => {
    console.log('Jobseeker account ', email, ' has been deleted successfully.');
  })
    .catch((error) => {
      console.log(error);
    });
};

/* May need to use these methods, depending on the implementation of milestones + emailing */
// MILESTONE ROUTES:
// depends on how userData is implemented. may not need to pass in JSemail; so waiting to implement.
// initial thought: would pull user data before calling this function;
// pass in email, milestoneIndex, and navigator email.
// reason not inside is bc we want to reuse this route
// in case a navigator or admin wants to call it.
// milestoneArray format:
// [”completed”, “completed”, “awaiting approval,” “completed, “incomplete”, “incomplete”]
// export const pingNavigator = async (JSemail, milestoneIndex, NavEmail, milestoneArray) => {
//   const updatedMilestoneArray = [...milestoneArray];
//   updatedMilestoneArray[milestoneIndex] = 'awaiting approval';
//   await updateDoc(doc(db, 'jobseekerData', JSemail), { milestoneArray: updatedMilestoneArray })
//     .then(() => {
//       // email NavEmail here; may potentially have multiple navigators(?)
//       console.log('pinged navigator for milestone approval ', JSemail);
//     }).catch((err) => {
//       alert(err.stack);
//     });
// };

// export const markComplete = async (JSemail, milestoneIndex, NavEmail, milestoneArray) => {
//   const updatedMilestoneArray = [...milestoneArray];
//   updatedMilestoneArray[milestoneIndex] = 'completed';
//   await updateDoc(doc(db, 'jobseekerData', JSemail), { milestoneArray: updatedMilestoneArray })
//     .then(() => {
//       console.log('marked milestone complete!', JSemail);
//     }).catch((err) => {
//       alert(err.stack);
//     });
// };

// export const markIncomplete = async (JSemail, milestoneIndex, NavEmail, milestoneArray) => {
//   await updateDoc(doc(db, 'jobseekerData', JSemail), { milestoneArray })
//     .then(() => {
//       console.log('reset milestone to incomplete ', JSemail);
//     }).catch((err) => {
//       alert(err.stack);
//     });
// };
// reasoning for 3 separate routes: 1) pingNav has unique permissioning; 2) simpler than combining
