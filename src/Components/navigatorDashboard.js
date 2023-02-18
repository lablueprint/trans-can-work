import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { fetchJobseeker } from '../Services/jobseeker-service';
import Modal from '@material-ui/core/Modal';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebase from '../firebase';



function NavigatorDashboard() {
    let testemail = "bboy@tt.com";
  const [jobSeeker, setJobSeeker] = useState({name: '', pronouns: '', phone: '', email: '', address:'', ethnicity:''});
  const [name, setName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [ethinicity, setEthnicity] = useState('');
  const [mode, toggleMode] = useState(true);
  const [notes, setNotes] = useState('');
  const [open,setOpen] = useState (false);
  const [existingNotes, setExistingNotes] = useState('');

  var db = firebase;
  const docRef = doc(db, "jobseekers", testemail);

  useEffect(() => {
    const logquery = async () => {
      const query = await fetchJobseeker(testemail); 
      setJobSeeker({
        name: query.data()["name"], 
        pronouns: query.data()["pronouns"],
        phone:query.data()["phone"], 
        email: query.id, 
        address:query.data()["address"], 
        ethnicity:query.data()["ethnicity"],
      })
      if (query.data()["notes"] != null){
        setExistingNotes(query.data()["notes"])
      }
    }
  
    logquery()
  }, []);

  function onJobseekerClick(){
    console.log("reached");
    setName(jobSeeker.name);
    setPronouns(jobSeeker.pronouns);
    setPhone(jobSeeker.phone);
    setEmail(jobSeeker.email);
    setAddress(jobSeeker.address);
    setEthnicity(jobSeeker.ethnicity);
    toggleMode(!mode);
  }

  function handleOpen(){
    setOpen(true);
};

let data = {
  notes: notes 
};

function handleClose(){
  setDoc(docRef, data)
  .then(docRef => {
})
.catch(error => {
    console.log(error);
})
  setOpen(false);
  setExistingNotes(notes);
};

const handleInputChange = (e) => {
  setNotes(e.target.value);
}



if (mode){
  return (
    <div>
      <Button onClick={onJobseekerClick} style={{ width: "100px", height:"50px",borderColor: 'grey', text:"client af" }} >click af</Button>
      <Button onClick={handleOpen}>{existingNotes}</Button>
      <div>
      <Modal
        open = {open}
        onClose = {handleClose}
        >
        <input 
        onChange={handleInputChange}>
        </input>
      </Modal>
          </div>
    </div>
  );
}
else{
  return (
    <div>
      <Button onClick={onJobseekerClick} style={{ width: "100px", height:"50px",borderColor: 'grey', text:"client af" }} >click af</Button>
      <div>Name: {name}</div>
      <div>Pronouns: {pronouns}</div>
      <div>Phone: {phone}</div>
      <div>Email: {email}</div>
      <div>Address: {address}</div>
      <div>Ethinicity: {ethinicity}</div>
    </div>
  );
}
  
}

export default NavigatorDashboard;