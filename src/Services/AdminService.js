// import firebase from "../firebase";

// const db = firebase.collection("/admin");

// const getAll = () => {
//   // change filter method if possible
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

// const AdminService = {
//   getAll,
//   create,
//   update,
//   remove
// };

// export default AdminService;
import { useState } from 'react';
import { doc, setDoc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import firebase from '../firebase';
var db = firebase

const AdminService = () => {
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
  const createAdmin = async (event) => {
    event.preventDefault();
    await setDoc(doc(db, "admins", email), {
      name: name,
    }).then(function () {
      console.log(`created new admin`);
    }).catch(function (err) {
      alert(err.stack);
    });
  }

  const readAdmin = async (event) => {
    event.preventDefault();
    const docRef = doc(db, "admins", readEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Admin:", docSnap.data());
    } else {
      console.log("Admin", readEmail, "does not exist");
    }
  }

  const updateAdmin = async (event) => {
    event.preventDefault();
    await updateDoc(doc(db, "admins", updateEmail), {
      name: updateName,
    }).then(function () {
      console.log(`updated admin`);
    }).catch(function (err) {
      alert(err.stack);
    });
  }

  const deleteAdmin = async (event) => {
    event.preventDefault();

    // make sure to use "read" to be sure the user exists in the database before calling delete
    // this function alone won't be able to confirm if account has been deleted or doesnt exist
    await deleteDoc(doc(db, "admins", deleteEmail));
  }

  return (
    <section>
      <div className="create">
        <h1>Add Admin</h1>
        <form onSubmit={createAdmin}>
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
        <h1>Get Admin</h1>
        <form onSubmit={readAdmin}>
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
        <h1>Update Admin</h1>
        <form onSubmit={updateAdmin}>
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
        <h1>Delete Admin</h1>
        <form onSubmit={deleteAdmin}>
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

export default AdminService;