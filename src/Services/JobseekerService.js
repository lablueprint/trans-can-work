// import firebase from "../firebase";

// const db = firebase.collection("/jobseeker");

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

// const JobseekerService = {
//   getAll,
//   create,
//   update,
//   remove
// };

// export default JobseekerService;

import { useState } from 'react';
import { doc, setDoc, getDoc, getDocs, updateDoc, deleteDoc, collection, onSnapshot } from "firebase/firestore";
import firebase from '../firebase';
var db = firebase

const JobseekerService = () => {
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
  const createJobseeker = async (event) => {
    event.preventDefault();
    await setDoc(doc(db, "jobseekers", email), {
      name: name,
    }).then(function () {
      console.log(`created new jobseeker`);
    }).catch(function (err) {
      alert(err.stack);
    });
  }

  const readJobseeker = async (event) => {
    event.preventDefault();
    const docRef = doc(db, "jobseekers", readEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("jobseeker:", docSnap.data());
    } else {
      console.log("jobseeker", readEmail, "does not exist");
    }
  }

  const fetchAllJobseekers = async (event) => {
    event.preventDefault();
    const colRef = collection(db, "jobseekers");
    try {
      const docsSnap = await getDocs(colRef);
      if(docsSnap.docs.length > 0) {
         docsSnap.forEach(doc => {
            console.log(doc.data());
            console.log(doc.id);
         })
      }
    } catch (error) {
        console.log(error);
    }

  }


  const updateJobseeker = async (event) => {
    event.preventDefault();
    await updateDoc(doc(db, "jobseekers", updateEmail), {
      name: updateName,
    }).then(function () {
      console.log(`updated jobseeker`);
    }).catch(function (err) {
      alert(err.stack);
    });
  }

  const deleteJobseeker = async (event) => {
    event.preventDefault();

    // make sure to use "read" to be sure the user exists in the database before calling delete
    // this function alone won't be able to confirm if account has been deleted or doesnt exist
    await deleteDoc(doc(db, "jobseekers", deleteEmail));
  }


  return (
    <section>
      <div className="create">
        <h1>Add Jobseeker</h1>
        <form onSubmit={createJobseeker}>
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
        <h1>Get Jobseeker</h1>
        <form onSubmit={readJobseeker}>
          <input
            type="text"
            placeholder="email"
            value={readEmail}
            onChange={handleReadEmail}
          />
          <button type="submit">Get</button>
        </form>
      </div>
      <div className="readAll">
        <h1>Get All Jobseekers</h1>
        <form onSubmit={fetchAllJobseekers}>
          <button type="submit">GetAll</button>
        </form>
      </div>
      <div className="update">
        <h1>Update Jobseeker</h1>
        <form onSubmit={updateJobseeker}>
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
        <h1>Delete Jobseeker</h1>
        <form onSubmit={deleteJobseeker}>
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

export default JobseekerService;