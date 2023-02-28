import React from "react";
import { Avatar } from "@material-ui/core";
import firebase from '../firebase';
import {doc, setDoc } from "firebase/firestore";
import { fetchJobseeker } from '../Services/jobseeker-service';
import { useState,useEffect } from "react";


function ProfileButton() {
    let testemail = "solia@gmail.com";
    var db = firebase;
    const docRef = doc(db, "jobseekers", testemail);
    const [name, setName] = useState('');
    const [field, setField] = useState('');


    useEffect(() => {
        const logquery = async () => {
          const query = await fetchJobseeker(testemail);
          setName(query.data()["name"]);
          setField (query.data()["field of work"]);
        }
     
        logquery()
      }, []);
console.log(name);
    return (
      <div>
        <Avatar facebookId="100008343750912" size="150" />
        {name} <br/>
        {field}
      </div>
    );
  }
  
  export default ProfileButton;