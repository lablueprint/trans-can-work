import {
  doc, setDoc, getDoc, deleteDoc, collection, getDocs,
} from 'firebase/firestore';
import { db } from '../firebase';

// CRUD functions
// data in form {"name": "John"} for instance.
export const createNavigator = async (email, data) => {
  await setDoc(doc(db, 'navigators', email), data).then(() => {
    console.log('created new navigator');
  }).catch((err) => {
    alert(err.stack);
  });
};

export const fetchNavigator = async (email) => {
  const docRef = doc(db, 'navigators', email);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Navigator: ', docSnap);
      return docSnap;
    }
    console.log('Navigator ', email, ' does not exist');
    return null;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

export const updateNavigator = async (email, data) => {
  await setDoc(doc(db, 'navigators', email), data, { merge: true })
    .then(() => {
      console.log('updated navigator ', email);
    }).catch((err) => {
      alert(err.stack);
    });
};

export const deleteNavigator = async (email) => {
  await deleteDoc(doc(db, 'navigators', email)).then(() => {
    console.log('Navigator account ', email, ' has been deleted successfully.');
  })
    .catch((error) => {
      console.log(error);
    });
};

export const fetchAllNavigators = async () => {
  const colRef = collection(db, 'navigators');
  try {
    const docsSnap = await getDocs(colRef);
    return docsSnap;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
