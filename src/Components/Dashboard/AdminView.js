import React, { useState, useEffect } from 'react';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore';
import AvatarCard from './AvatarCard';
import { db } from '../../firebase';
import './AdminView.css';

export default function AdminView() {
  // query all seekers
  const [archivedUsers, setArchivedUsers] = useState([]);

  const getArchived = async () => {
    const archived = [];
    try {
      const Ref = collection(db, 'jobseekers');
      const q = query(Ref, where('archived', '==', true));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const { id } = doc;
        const js = {
          data,
          id,
        };
        archived.push(js);
      });
    } catch (error) {
      console.log(error);
    }
    setArchivedUsers(archived);
  };
  useEffect(() => {
    getArchived(setArchivedUsers);
  }, []);
  return (
    <div className="Cards">
      {archivedUsers.map((user) => (
        <div className="Card">
          <AvatarCard
            user={user}
            archivedUsers={archivedUsers}
            setArchivedUsers={setArchivedUsers}
          />

        </div>
      ))}
    </div>

  );
}
