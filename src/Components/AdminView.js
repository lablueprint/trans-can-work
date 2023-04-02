import AvatarCard from "./AvatarCard";
import { Card, CardContent, Typography, Paper, Avatar } from '@mui/material';
import { collection, query, where, getDocs, doc, update } from "firebase/firestore";
import { db } from "../Components/firebase";
import "./AdminView.css";
import { useState } from "react";
import { useEffect } from "react";

function AdminView(props) {    
  // query all seekers
    const [archivedUsers, setArchivedUsers] = useState([])

    const getArchived = async (setArchivedUsers) => {
      let archived = []
      try {
          const Ref = collection(db, "jobseekers");
      const q = query(Ref, where("archived", "==", true));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          const js = {
            data,
            id,
          }
          archived.push(js)
      });
      } catch (error) {
          console.log(error)
      }
      setArchivedUsers(archived)
    }
    useEffect(() => {
      getArchived(setArchivedUsers)
    }, [])
    return (
      <div className="Cards">
        {archivedUsers.map(user => {
          return (<div className="Card">
            <AvatarCard user={user} archivedUsers={archivedUsers} setArchivedUsers={setArchivedUsers} />
        
          </div>)
      })}
      </div>
      
    );
  }
  export default AdminView;