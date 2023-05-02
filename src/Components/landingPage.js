import React, { useEffect } from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PropTypes } from 'prop-types';
import {
  fetchByNavigator, fetchAllJobseekers,
} from '../Services/jobseeker-service';

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

export default function LandingPage() {
  const [value, setValue] = React.useState(0);

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
    };

    const processAdmin = async () => {
      const clientList = await fetchAllJobseekers();
      console.log(clientList);
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

  if (userType === 'navigator') {
    return (
      <div className="App">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Clients" {...a11yProps(0)} />
            <Tab label="Archive" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} />
        <TabPanel value={value} index={1}>
          penis
        </TabPanel>

      </div>
    );
  }
  if (userType === 'admin' && isApproved) {
    return (
      <div className="App">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Navigators" {...a11yProps(0)} />
            <Tab label="Clients" {...a11yProps(1)} />
            <Tab label="Archive" {...a11yProps(2)} />
            <Tab label="Unapproved Accounts" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0} />
        <TabPanel value={value} index={1} />
        <TabPanel value={value} index={2} />
        <TabPanel value={value} index={3} />
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

LandingPage.propTypes = {
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
