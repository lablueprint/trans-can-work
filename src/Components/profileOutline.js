import React, { useEffect } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PropTypes } from 'prop-types';
import Avatar from 'react-avatar';
import Button from '@mui/material/Button';
import {
  fetchByNavigator, fetchAllJobseekers,
} from '../Services/jobseeker-service';
import './profileOutline.css';

const demographicInfo = [{
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
  priorConvictions: 'hundreds',
}];

function TabPanel(props) {
  const {
    children, value, index, ...other
  } = props;

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

export default function ProfileOutline() {
  const [value, setValue] = React.useState(0);
  const [disableButton, setDisableButton] = React.useState(true);
  // const [values, setValues] = React.useState(initialValues);
  // const [clients, setClients] = React.useState([]);

  // so since we are NOT reusing this component for both personal profiles
  // and looking at other account profiles, we would use userData
  // and would have different initialValues, but not a backend call for it.

  // another important point: the states, e.g. values and disable buttons being set to userData
  // and false mean that if changes are made and not saved, the changes are reverted.

  // sample info from userData:
  const userType = 'navigator'; // or navigator or jobseeker
  const isApproved = false;

  useEffect(() => {
    const logquery = async () => {
      const query = await fetchAllJobseekers();
      console.log(query);
    };
    logquery();
  }, []);

  useEffect(() => {
    const processNav = async () => {
      const clientList = await fetchByNavigator('solia@test.edu');
      console.log('clientList:');
      console.log(clientList);
      // setClients(clientList);
    };

    const processAdmin = async () => {
      const clientList = await fetchAllJobseekers();
      console.log(clientList);
      // setClients(clientList);
    };

    if (userType === 'navigator') {
      processNav();
    } else if (userType === 'admin' && isApproved) {
      processAdmin();
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // i genuinely have no clue how this works:
  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  // };

  const handleToggle = (e) => {
    e.preventDefault();
    if (!disableButton) { // then we want to save changes.
      if (userType === 'navigator') {
        // Since values is currently useless:
        // but when we do have a json of new fields, then this would work:
        // console.log(values);
        // updateNavigator(email, values);
      } else if (userType === 'admin' && isApproved) {
        // console.log(values);
        // updateAdmin(email, values);
      } else if (userType === 'jobseeker') {
        // updateJobseeker(email, values);
      }
    }

    setDisableButton(!disableButton);
  };

  // hey alan ! new updates!
  if (userType === 'navigator' || (userType === 'admin' && isApproved)) {
    return (
      <div className="background">
        <div className="top-container">
          <div className="profile-photo-container">
            <Avatar facebookId="100008343750912" size="150" sx={{ borderRadius: '100px' }} />
            <h1>
              MY PROFILE
            </h1>
          </div>
          <div className="edit-button">
            <Button
              variant="outlined"
              onClick={handleToggle}
              sx={
                disableButton ? {
                  marginRight: '2%',
                  background: '#FFFFFF',
                  borderColor: 'black',
                  color: 'black',
                }
                  : {
                    marginRight: '2%',
                    background: '#E4E6FF',
                    borderColor: '#E4E6FF',
                    color: 'black',
                  }
            }
            >
              {disableButton ? 'EDIT' : 'SAVE'}
            </Button>
            <div className="cancel-button">
              {disableButton ? null : (
                <Button
                  onClick={handleToggle}
                  sx={{
                    marginTop: '2%',
                    marginRight: '2%',
                    background: '#FFFFFF',
                    borderColor: 'black',
                    color: 'black',
                  }}
                >
                  CANCEL
                </Button>
              )}

            </div>
          </div>
        </div>
        <div className="outer-container">
          <div className="left-column">
            <label htmlFor="FirstName">
              First Name:
              <br />
              <input
                className={disableButton ? 'non-editable-field' : 'editable-field'}
                id="FirstName"
                defaultValue={demographicInfo[0].name}
                disabled={disableButton}
              />
            </label>
            <br />
            <label htmlFor="Pronouns">
              Pronouns:
              <br />
              <input
                className={disableButton ? 'non-editable-field' : 'editable-field'}
                id="Pronouns"
                defaultValue={demographicInfo[0].pronouns}
                disabled={disableButton}
              />
            </label>
            <br />
            <label htmlFor="Email">
              Email:
              <input
                className={disableButton ? 'non-editable-field' : 'editable-email-password'}
                id="Pronouns"
                defaultValue={demographicInfo[0].email}
                disabled={disableButton}
              />
            </label>
          </div>
          <div className="right-column">
            <label htmlFor="LastName">
              Last Name:
              <input
                className={disableButton ? 'non-editable-field' : 'editable-field'}
                id="Name"
                defaultValue={demographicInfo[0].name}
                disabled={disableButton}
              />
            </label>
            <br />
            <label htmlFor="Phone">
              Phone Number:
              <br />
              <input
                className={disableButton ? 'non-editable-field' : 'editable-field'}
                id="Phone"
                defaultValue={demographicInfo[0].phone}
                disabled={disableButton}
              />
            </label>
            <br />
            <label htmlFor="Password">
              Password:
              <br />
              <input
                className={disableButton ? 'non-editable-field' : 'editable-email-password'}
                id="Password"
                defaultValue=""
                disabled={disableButton}
              />
            </label>
          </div>
        </div>
        <br />
        <div className="bio">
          <label htmlFor="Bio">
            Bio:
            <br />
            <input
              className={disableButton ? 'non-editable-field' : 'editable-field'}
              id="Bio"
              defaultValue=""
              disabled={disableButton}
            />
          </label>
          <br />
        </div>
      </div>
    );
  }

  // STOP!
  if (userType === 'jobseeker') {
    return (
      <div className="App">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="My Profile" {...a11yProps(0)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Avatar facebookId="100008343750912" size="150" />
          <br />
          <label htmlFor="First Name">
            First Name:
            <input
              className={disableButton ? 'non-editable-field' : 'editable-field'}
              id="Name"
              defaultValue={demographicInfo[0].name}
              disabled={disableButton}
            />
          </label>
          <br />
          <label htmlFor="Last Name">
            Last Name:
            <input
              className={disableButton ? 'non-editable-field' : 'editable-field'}
              id="Name"
              defaultValue={demographicInfo[0].name}
              disabled={disableButton}
            />
          </label>
          <br />
          <label htmlFor="Pronouns">
            Pronouns:
            <input
              className={disableButton ? 'non-editable-field' : 'editable-field'}
              id="Pronouns"
              defaultValue={demographicInfo[0].pronouns}
              disabled={disableButton}
            />
          </label>
          <br />
          <p>
            Email:
            {demographicInfo[0].email}
          </p>
          <p>My Navigator: You</p>
          <label htmlFor="Bio">
            Bio:
            <input
              className={disableButton ? 'non-editable-field' : 'editable-field'}
              id="Bio"
              defaultValue=""
              disabled={disableButton}
            />
          </label>
          <br />
          <Button
            onClick={handleToggle}
          />
        </TabPanel>
      </div>
    );
  }

  // TODO: here would be the splash screen for "waiting for admin approval"
  return (
    <div>
      Waiting for admin approval...
    </div>
  );
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
};
TabPanel.propTypes = {
  value: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.string.isRequired,
};
