import React, {useState, useEffect} from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PropTypes } from 'prop-types';
import Avatar from 'react-avatar';
import {fetchByNavigator, fetchAllJobseekers, fetchJobseeker, updateJobseeker} from '../Services/jobseeker-service';
import {updateNavigator} from '../Services/navigator-service';
import {updateAdmin} from '../Services/admin-service';

const demographic_info = [{
  name: 'kaylee',
  title: 'slayer',
  pronouns: 'she/her',
  email: 'kaeleytran@gmail.com',
  phone: '714-420-6969',
  city: 'Orange County',
  state: 'California',
  ethnicity: 'vietnamese',
  age: 69,
  genderIdentity: 'baddie',
  sexuality: 'your mom',
  veteran: 'duh',
  disability: 'many',
  housingSituation: 'a shit show',
  employmentStatus: 'space place',
  priorConvictions: 'hundreds'
}]


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const initialValues = {
  name: demographic_info[0].name,
  pronouns: demographic_info[0].pronouns,
}

export default function ProfileOutline() {
  const [value, setValue] = React.useState(0);
  const [disableButton, setDisableButton] = React.useState(true) 
  const [values, setValues] = React.useState(initialValues);
  const [clients, setClients] = React.useState([]);

  //so since we are NOT reusing this component for both personal profiles
  //and looking at other account profiles, we would use userData
  //and would have different initialValues, but not a backend call for it.

  //another important point: the states, e.g. values and disable buttons being set to userData
  // and false mean that if changes are made and not saved, the changes are reverted. (desired behavior)

  //sample info from userData:
  const userType = "navigator"; // or navigator or jobseeker
  const isApproved = false;
  // const email = "nasser@bp.com";
  const email = "solia@test.edu";
  // const email = "tcw@slays.com"

  useEffect(() => {
    const logquery = async () => {
      const query = await fetchAllJobseekers();
      console.log(query);
    }
    logquery();
  }, []);



  useEffect(() => {
    const processNav = async () => {
      const clientList = await fetchByNavigator("solia@test.edu");
      console.log("clientList:");
      console.log(clientList);
      setClients(clientList);
    }

    const processAdmin = async () => {
      const clientList = await fetchAllJobseekers();
      console.log(clientList);
      setClients(clientList);
    }

    if (userType === "navigator"){
      console.log("hi nav");
      processNav();
    }
    else if (userType === "admin" && isApproved){
      console.log("hi admin");
      processAdmin();
    }

  }, []); 

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //i genuinely have no clue how this works:
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  };

  const handleToggle = (e) => {
    e.preventDefault();
    if (!disableButton){ //then we want to save changes.
      if (userType === "navigator"){
        //Since values is currently useless:
        //but when we do have a json of new fields, then this would work: 
        // console.log(values); 
        // updateNavigator(email, values);
      }
      else if (userType === "admin" && isApproved){
        // console.log(values);
        // updateAdmin(email, values);
      }
      else if (userType === "jobseeker"){        
        // updateJobseeker(email, values);
      }
    }

    setDisableButton(!disableButton)
  };

  if (userType === "navigator" || (userType === "admin" && isApproved) ) {
    return (
      <div className="App">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab label="My Profile" {...a11yProps(0)} />
            <Tab label="My Clients" {...a11yProps(1)} /> 
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} >
        <Avatar facebookId="100008343750912" size="150" />
          <header>
            MY PROFILE
          </header>
          <label>
            Name:
            <input
              defaultValue={demographic_info[0].name}
              onChange={handleInputChange}
              disabled={disableButton}
            />
          </label>
          <br></br>
          <label>
            Pronouns:
            <input
              defaultValue={demographic_info[0].pronouns}
              onChange={handleInputChange}
              disabled={disableButton}
            />
          </label>
          <br></br>
          <p>Email: {demographic_info[0].email}</p>
          <label>
            Bio:
            <input
              defaultValue={""}
              onChange={handleInputChange}
              disabled={disableButton}
            />
          </label>
          <br></br>
          <button onClick={() => setDisableButton(!disableButton)}>
            <i
              style={{ color: "blue" }}
            ></i>
          </button>
        </TabPanel>
        <TabPanel value={value} index={1}>
          clients go here 
        </TabPanel>

      </div>
    );
  } 
  else if (userType === "jobseeker") {
    return(
    <div className="App">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value}
            onChange={handleChange}
            aria-label="basic tabs example">
            <Tab label="My Profile" {...a11yProps(0)} /> 
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} >
        <Avatar facebookId="100008343750912" size="150" />
          <br></br>
          <label>
            Name:
            <input
              defaultValue={demographic_info[0].name}
              onChange={handleInputChange}
              disabled={disableButton}
            />
          </label>
          <br></br>
          <label>
            Pronouns:
            <input
              defaultValue={demographic_info[0].pronouns}
              onChange={handleInputChange}
              disabled={disableButton}
            />
          </label>
          <br></br>
          <p>Email: {demographic_info[0].email}</p>
          <p>My Navigator: You</p>
          <label>
            Bio:
            <input
              defaultValue={""}
              onChange={handleInputChange}
              disabled={disableButton}
            />
          </label>
          <br></br>
          <button onClick={handleToggle}>
            <i
              style={{ color: "blue" }}
            ></i>
          </button>
        </TabPanel>
  </div>
    )
  }
  else {
    //TODO: here would be the splash screen for "waiting for admin approval" 
    return(
      <div>
        Waiting for admin approval...
      </div>
    )
  }
}

ProfileOutline.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  pronouns: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
  ethnicity: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  genderIdentity: PropTypes.string.isRequired,
  sexuality: PropTypes.string.isRequired,
  veteran: PropTypes.string.isRequired,
  disability: PropTypes.string.isRequired,
  housingSituation: PropTypes.string.isRequired,
  employmentStatus: PropTypes.string.isRequired,
  priorConvictions: PropTypes.string.isRequired,
}