import React, {useEffect, useState} from 'react';
import { Button } from 'react-bootstrap';
import { fetchJobseeker } from '../Services/jobseeker-service';
import Modal from '@material-ui/core/Modal';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebase from '../firebase';
import localStorage from 'redux-persist/es/storage';
import navDashJobseeker from '../store/jobseeker/navDashRedux';
import { useDispatch, useSelector } from 'react-redux';
import { getJobseeker } from '../store/jobseeker/navDashRedux';


function NavigatorDashboard() {
    let testemail = "bboy@tt.com";
  const [jobSeeker, setJobSeeker] = useState({name: '', pronouns: '', phone: '', email: '', address:'', ethnicity:''});
  const [name, setName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [ethnicity, setEthnicity] = useState('');
  const [notes, setNotes] = useState('');
  const [open,setOpen] = useState (false);
  const [existingNotes, setExistingNotes] = useState('');
  const [show, setShow] = useState('');

  const jobseeker = useSelector(state => state.jobseeker);
  const dispatch = useDispatch();


  var db = firebase;
  const docRef = doc(db, "jobseekers", testemail);

  useEffect(() => {
    const logquery = async () => {
      const query = await fetchJobseeker(testemail); 
      // setJobSeeker({
      //   name: query.data()["name"], 
      //   pronouns: query.data()["pronouns"],
      //   phone:query.data()["phone"], 
      //   email: query.id, 
      //   address:query.data()["address"], 
      //   ethnicity:query.data()["ethnicity"],
      // })
      if (query.data()["notes"] != null){
        setExistingNotes(query.data()["notes"])
      }
      setName(query.data()["name"]);
      setPronouns(query.data()["pronouns"]);
      setPhone(query.data()["phone"]);
      setEmail(query.id);
      setAddress(query.data()["address"]);
      setEthnicity(query.data()["ethnicity"]);

    }
 
    logquery()
  }, []);


  function onJobseekerClick(){
    // setClickedJobSeeker({
    //   name: name, 
    //   pronouns: pronouns,
    //   phone:phone, 
    //   email: email, 
    //   address: address, 
    //   ethnicity: ethnicity,
    // })
    setName(jobSeeker.name);
    console.log(name);
    setPronouns(jobSeeker.pronouns);
    setPhone(jobSeeker.phone);
    setEmail(jobSeeker.email);
    setAddress(jobSeeker.address);
    setEthnicity(jobSeeker.ethnicity);


    setShow("false");
    // dispatch(getJobseeker(clickedJobSeeker));
  } 

  function onJobseekerClose(){
    setShow("true");
  }

  useEffect(()=>{
    localStorage.setItem('name', JSON.stringify((name)));
    localStorage.setItem('pronouns', JSON.stringify((pronouns)));
    localStorage.setItem('phone', JSON.stringify((phone)));
    localStorage.setItem('email', JSON.stringify((email)));
    localStorage.setItem('address', JSON.stringify((address)));
    localStorage.setItem('ethnicity',JSON.stringify((ethnicity)));
    localStorage.setItem('showBanner', JSON.stringify(show));
  },[name,pronouns,phone,email,address,ethnicity,show])


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
  setExistingNotes(notes);
};

const handleInputChange = (e) => {
  setNotes(e.target.value);
}



if (show =="true"){
  return (
    <div>
      <Button onClick={onJobseekerClick} style={{ width: "100px", height:"50px",borderColor: 'grey' }} >jobseeker af</Button>
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
    {/* <Button onClick={onJobseekerClick} style={{ width: "100px", height:"50px",borderColor: 'grey', text:"client af" }} >jobseeker af</Button> */}
    {/* {jobseeker.map(seeker => (
            <h3>{seeker.name}</h3>
        ))}
        console.log(jobseeker); */}
      <div>Name: {name}</div>
      <div>Pronouns: {pronouns}</div>
      <div>Phone: {phone}</div>
      <div>Email: {email}</div>
      <div>Address: {address}</div>
      <div>Ethinicity: {ethnicity}</div>
      
      <Button onClick={handleOpen}>{existingNotes}</Button>
      <Modal
        open = {open}
        onClose = {handleClose}
        >
        <input 
        onChange={handleInputChange}>
        </input>
      </Modal>
      <Button onClick={onJobseekerClose}>close</Button>
    </div>
  );
}
  
}

export default NavigatorDashboard;