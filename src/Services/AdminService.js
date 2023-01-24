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
import { doc, setDoc } from "firebase/firestore";
import firebase from '../firebase';
var db = firebase

const AdminService = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }
  const handleNameChange = (event) => {
    setName(event.target.value);
  }

  const addAdmin = async (event) => {
    event.preventDefault();
    await setDoc(doc(db, "admins", email), {
      name: name,
    }).then(function () {
      console.log(`saved navigator`);
    }).catch(function (err) {
      alert(err.stack);
    });
  }

  return (
    <div>
      <h1>Add Admin</h1>
      <form onSubmit={addAdmin}>
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
  );

}