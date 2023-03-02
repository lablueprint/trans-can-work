import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { fetchJobseeker } from '../Services/jobseeker-service';
import Modal from '@material-ui/core/Modal';
import { doc, setDoc } from "firebase/firestore";
import firebase from '../firebase';
import "./Notepad.css";

function Notepad() {
    let testemail = "bboy@tt.com";
  const [notes, setNotes] = useState('');
  const [open,setOpen] = useState (false);


  var db = firebase;
  const docRef = doc(db, "jobseekers", testemail);

  useEffect(() => {
    const logquery = async () => {
      const query = await fetchJobseeker(testemail); 
      if (query["notes"] != null){
        setNotes(query["notes"])
      }
    }
 
    logquery()
  }, []);


function handleOpen(){
    setOpen(true);
};

let data = {
  notes: notes 
};

function handleClose(){
  setDoc(docRef, data, { merge:true })
  .then(docRef => {
})
.catch(error => {
    console.log(error);
})
  setOpen(false);
  setNotes(notes);
};

const handleInputChange = (e) => {
  setNotes(e.target.value);
}



  return (
    <div className = "notes">
      <Button onClick={handleOpen}>
        {notes}
      </Button>
      <div>
      <Modal
        open = {open}
        onClose = {handleClose}
        >
        <input 
        onChange={handleInputChange}
        value = {notes}
        >
        </input>
      </Modal>
          </div>
    </div>
  );
}

export default Notepad;