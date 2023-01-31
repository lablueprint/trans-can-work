import { doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, collection, onSnapshot } from "firebase/firestore";
import firebase from '../../firebase'; //idk if i need these two lines yet
var db = firebase

// CRUD functions
//data in form {"name": "John"} for instance.
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
      return docsSnap;
      // if(docsSnap.docs.length > 0) {
      //    docsSnap.forEach(doc => {
      //       console.log(doc.data());
      //       console.log(doc.id);
      //    })
      // }
    } catch (error) {
        console.log(error);
    }

  }

//  export const displayRTJobseekers = async (event) => {
//     const dbRef = collection(db, "jobseekers");
//     try {
//         onSnapshot(dbRef, docsSnap => {
//             docsSnap.forEach(doc => {
//                 console.log(doc.data());
//             })
//         });
//       } catch (error) {
//           console.log(error);
//       }
  
//   }

  export const updateJobseeker = async (email, data) => {
    await updateDoc(doc(db, "jobseekers", email), data)
    .then(function () {
      console.log(`updated jobseeker `, email);
    }).catch(function (err) {
      alert(err.stack);
    });
  }

export const deleteJobseeker = async (email) => {
    // make sure to use "read" to be sure the user exists in the database before calling delete
    // this function alone won't be able to confirm if account has been deleted or doesnt exist
    //i think its fine bc of try + catch.
    await deleteDoc(doc(db, "jobseekers", email)).then(() => {
        console.log("Jobseeker account ", email, " has been deleted successfully.")
    })
    .catch(error => {
        console.log(error);
    });
}