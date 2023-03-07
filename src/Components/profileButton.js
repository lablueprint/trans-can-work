import React, { useState, useEffect } from 'react';
import { Modal, Avatar, Button } from '@material-ui/core';
// import { doc } from 'firebase/firestore';
// import firebase from '../firebase';
import { fetchJobseeker } from '../Services/jobseeker-service';
import './profileButton.css';
// import ProfileOutline from './profileOutline';

function ProfileButton() {
  const testemail = 'solia@gmail.com';
  // const db = firebase;
  const [name, setName] = useState('');
  const [field, setField] = useState('');
  const [viewProfile, setViewProfile] = useState(false);

  useEffect(() => {
    const logquery = async () => {
      const query = await fetchJobseeker(testemail);
      setName(query.data().name);
      setField(query.data()['field of work']);
    };

    logquery();
  }, []);

  const handleOpen = () => {
    setViewProfile(true);
  };
  const handleClose = () => {
    setViewProfile(false);
  };

  return (
    <div className="outer-container">
      <div className="container">
        <Avatar
          facebookId="100008343750912"
          style={{
            height: '68px',
            width: '68px',
            marginTop: '6px',
            marginBottom: '6px',
            marginLeft: '6px',
          }}
        />
      </div>
      <br />
      <div className="container2">
        <text>{name}</text>
        <text>{field}</text>
        <Button onClick={handleOpen}>View Profile</Button>
        <Modal
          open={viewProfile}
          onClose={handleClose}
        >
          <Button onClick={handleClose}>close</Button>
        </Modal>
      </div>
    </div>
  );
}

export default ProfileButton;
