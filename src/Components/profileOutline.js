import React from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import useState from "react";
import { PropTypes } from 'prop-types';
import Avatar from 'react-avatar';
import beyonce from '.././Assets/beyonce.png'


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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
  };

  const isJobseeker = false;

  if (!isJobseeker) {

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
          <Avatar sx={{ width: 200, height: 200 }} alt="Remy Sharp" src={beyonce} />
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
  else {
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
          <Avatar sx={{ width: 200, height: 200 }} alt="Remy Sharp" src={beyonce} />
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
          <button onClick={() => setDisableButton(!disableButton)}>
            <i
              style={{ color: "blue" }}
            ></i>
          </button>
        </TabPanel>
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