// import firebase from "../firebase";

// const db = firebase.collection("/test2");

// const getAll = () => {
//   return db;
// };

// const create = (data) => {
//   return db.add(data);
// };

// const update = (id, value) => {
//   return db.doc(id).update(value);
// };

// const remove = (id) => {
//   return db.doc(id).delete();
// };

// const NavigatorService = {
//   getAll,
//   create,
//   update,
//   remove
// };

// export default NavigatorService;

import { useState } from 'react';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import firebase from '../firebase';
var db = firebase

const NavigatorService = () => {
  const [email, setEmail] = useState(''); // should we use this for both create and read?
  const [name, setName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [readEmail, setReadEmail] = useState('');
  const [deleteEmail, setDeleteEmail] = useState('');

  // handle create
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  // handle read
  const handleReadEmail = (event) => {
    setReadEmail(event.target.value);
  }

  // handle update
  const handleUpdateEmail = (event) => {
    setUpdateEmail(event.target.value)
  }
  const handleUpdateName = (event) => {
    setUpdateName(event.target.value)
  }

  // handle delete
  const handleDeleteEmail = (event) => {
    setDeleteEmail(event.target.value)
  }


  // CRUD functions
  const createNavigator = async (event) => {
    event.preventDefault();
    await setDoc(doc(db, "navigators", email), {
      name: name,
    }).then(function () {
      console.log(`created new navigator`);
    }).catch(function (err) {
      alert(err.stack);
    });
  }

  const readNavigator = async (event) => {
    event.preventDefault();
    const docRef = doc(db, "navigators", readEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("navigator:", docSnap.data());
    } else {
      console.log("navigator", readEmail, "does not exist");
    }
  }

  const updateNavigator = async (event) => {
    event.preventDefault();
    await updateDoc(doc(db, "navigators", updateEmail), {
      name: updateName,
    }).then(function () {
      console.log(`updated navigator`);
    }).catch(function (err) {
      alert(err.stack);
    });
  }

  const deleteNavigator = async (event) => {
    event.preventDefault();

    // make sure to use "read" to be sure the user exists in the database before calling delete
    // this function alone won't be able to confirm if account has been deleted or doesnt exist
    await deleteDoc(doc(db, "navigators", deleteEmail));
  }

  return (
    <section>
      <div className="create">
        <h1>Add Navigator</h1>
        <form onSubmit={createNavigator}>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={handleNameChange}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="read">
        <h1>Get Navigator</h1>
        <form onSubmit={readNavigator}>
          <input
            type="text"
            placeholder="email"
            value={readEmail}
            onChange={handleReadEmail}
          />
          <button type="submit">Get</button>
        </form>
      </div>
      <div className="update">
        <h1>Update Navigator</h1>
        <form onSubmit={updateNavigator}>
          <input
            type="text"
            placeholder="email"
            value={updateEmail}
            onChange={handleUpdateEmail}
          />
          <input
            type="text"
            placeholder="name"
            value={updateName}
            onChange={handleUpdateName}
          />
          <button type="submit">Update</button>
        </form>
      </div>
      <div className="delete">
        <h1>Delete Navigator</h1>
        <form onSubmit={deleteNavigator}>
          <input
            type="text"
            placeholder="email"
            value={deleteEmail}
            onChange={handleDeleteEmail}
          />
          <button type="submit">Delete</button>
        </form>
      </div>
    </section>
  );
}

export default NavigatorService;