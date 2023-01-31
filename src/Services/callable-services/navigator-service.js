import { doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, collection, onSnapshot } from "firebase/firestore";
import firebase from '../../firebase'; //idk if i need these two lines yet
var db = firebase

// CRUD functions
//data in form {"name": "John"} for instance.
export const createNavigator = async (email, data) => {
    await setDoc(doc(db, "navigators", email), data).then(function () {
        console.log(`created new navigator`);
    }).catch(function (err) {
        alert(err.stack);
    });
}


export const fetchNavigator = async (email) => {
    const docRef = doc(db, "navigators", email);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        console.log("Navigator: ", docSnap.data());
        } else {
        console.log("Navigator ", email, " does not exist");
        }
    }
    catch (error) {
        console.log(error);
    }
}

// would be debug uses only:
//  export const fetchAllNavigators = async () => {
//     const colRef = collection(db, "navigators");
//     try {
//       const docsSnap = await getDocs(colRef);
//       return docsSnap;
//     } catch (error) {
//         console.log(error);
//     }
//   }

  
  export const updateNavigator = async (email, data) => {
    await updateDoc(doc(db, "navigators", email), data)
    .then(function () {
      console.log(`updated navigator `, email);
    }).catch(function (err) {
      alert(err.stack);
    });
  }

export const deleteNavigator = async (email) => {
    // make sure to use "read" to be sure the user exists in the database before calling delete
    // this function alone won't be able to confirm if account has been deleted or doesnt exist
    //i think its fine bc of try + catch.
    await deleteDoc(doc(db, "navigators", email)).then(() => {
        console.log("Navigator account ", email, " has been deleted successfully.")
    })
    .catch(error => {
        console.log(error);
    });
}