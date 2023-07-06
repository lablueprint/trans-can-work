import React, { useState, useEffect } from 'react';
import {
  collection, query, where, getDocs,
} from 'firebase/firestore';
import AvatarCard from '../Components/Dashboard/AvatarCard';
import { db } from '../firebase';

function Landing() {
  // query all seekers
  const [unapprovedUsers, setunapprovedUsers] = useState([]);

  const getUnapprovedUsers = async () => {
    const unapproved = [];
    try {
      const Ref = collection(db, 'jobseekers');
      const q = query(Ref, where('approval', '==', false));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const { id } = doc;
        const js = {
          data,
          id,
        };
        unapproved.push(js);
      });
    } catch (error) {
      console.log(error);
    }
    setunapprovedUsers(unapproved);
  };
  useEffect(() => {
    getUnapprovedUsers(setunapprovedUsers);
  }, []);
  return (
    <div className="Cards">
      {unapprovedUsers.map((user) => (
        <div className="Card">
          <AvatarCard
            user={user}
            archivedUsers={unapprovedUsers}
            setArchivedUsers={setunapprovedUsers}
          />

        </div>
      ))}
    </div>

  );
}
export default Landing;
