import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import firebase from '../firebase'; 
var db = firebase

// CRUD functions
// data in form {"name": "John"} for instance.
// need testing of what happens when user already exists: in both approved and unapproved states.
// the only route allowed by unapproved users.
export const createAdmin = async (email, data) => {
    data["approval status"] = false;
    await setDoc(doc(db, "admins", email), data).then(function () {
        console.log(`created new unapproved admin`);
    }).catch(function (err) {
        alert(err.stack);
    });
}

export const fetchAdmin = async (email) => {
    const docRef = doc(db, "admins", email);
    try {
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
        console.log("Admin: ", docSnap.data());
        } else {
        console.log("Admin ", email, " does not exist");
        }
    }
    catch (error) {
        console.log(error);
    }
}

//this may be limited to approved admin updating own profile details.
export const updateAdmin = async (email, data) => {
  //may be included to avoid admin making self unapproved; but puts extra pressure on security rules
  //data["approval status"] = true;
  await updateDoc(doc(db, "admins", email), data)
  .then(function () {
    console.log(`updated admin `, email);
  }).catch(function (err) {
    alert(err.stack);
  });
}

//super important that this is a protected route.
export const approveAdmin = async (email) => {
  await updateDoc(doc(db, "admins", email), {"approval status":true})
  .then(function () {
    console.log(`updated admin `, email);
  }).catch(function (err) {
    alert(err.stack);
  });
}

export const deleteAdmin = async (email) => {
  await deleteDoc(doc(db, "admins", email)).then(() => {
      console.log("Admin account ", email, " has been deleted successfully.")
  })
  .catch(error => {
      console.log(error);
  });
}