import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Modal from '@material-ui/core/Modal';
import { doc, setDoc } from 'firebase/firestore';
import { fetchJobseeker } from '../../Services/jobseeker-service';
import firebase from '../../firebase';
import './Notepad.css';

function Notepad() {
  const testemail = 'bboy@tt.com';
  const [notes, setNotes] = useState('');
  const [open, setOpen] = useState(false);

  const db = firebase;
  const docRef = doc(db, 'jobseekers', testemail);

  useEffect(() => {
    const logquery = async () => {
      const query = await fetchJobseeker(testemail);
      const data = query.data();
      if (data.notes != null) {
        setNotes(data.notes);
      }
    };

    logquery();
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const data = {
    notes,
  };

  const handleClose = () => {
    setDoc(docRef, data, { merge: true })
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
    setOpen(false);
    setNotes(notes);
  };

  const handleInputChange = (e) => {
    setNotes(e.target.value);
  };

  return (
    <div className="notes">
      <Button onClick={handleOpen}>
        {notes}
      </Button>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
        >
          <input
            onChange={handleInputChange}
            value={notes}
          />
        </Modal>
      </div>
    </div>
  );
}

export default Notepad;
