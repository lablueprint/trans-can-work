import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Avatar } from '@material-ui/core';
import {
  Tab, Tabs, Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PropTypes } from 'prop-types';
import TabPanel from '../TabPanel';
import SearchAndFilter from '../SearchAndFiltering/searchAndFilter';
import '../../Pages/Home.css';
import './Dashboard.css';
import ProfileButton from '../ProfileButton/profileButton';
import { fetchAllJobseekers } from '../../Services/jobseeker-service';
import { fetchAllNavigators } from '../../Services/navigator-service';
import NoAccounts from './NoAccounts';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const HomeTab = styled((props) => <Tab disableRipple {...props} />)(() => ({
  textTransform: 'none',
}));

/* the current version of the dashboard will not work with the switch to the users table
    - need to consider the new object format
    - admin + navigators have different levels of access, so this will cause issues with user rules
      -> should only fetch the necessary + accessible info!
*/
export default function Dashboard({ profileName, role }) {
  const [tabValue, setValue] = useState(0);

  // data from firebase
  const [clients, setClients] = useState([]);
  const [archivedClients, setArchivedProfiles] = useState([]);
  const [navigators, setNavigators] = useState([]);
  const [unapprovedAccounts, setUnapprovedAccounts] = useState([]);

  // data for display
  const [currentTabAccounts, setCurrentTabAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  // handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // set the current accounts display (depending on the role type)
  useEffect(() => {
    if (role === 'Admin') {
      if (tabValue === 0) {
        setCurrentTabAccounts(navigators);
      } else if (tabValue === 1) {
        setCurrentTabAccounts(clients);
      } else if (tabValue === 2) {
        setCurrentTabAccounts(archivedClients);
      } else if (tabValue === 3) {
        setCurrentTabAccounts(unapprovedAccounts);
      }
    } else if (role === 'Navigator') {
      if (tabValue === 0) {
        setCurrentTabAccounts(clients);
      } else if (tabValue === 1) {
        setCurrentTabAccounts(archivedClients);
      }
    }
  }, [tabValue, navigators, clients, archivedClients, unapprovedAccounts, role]);

  useEffect(() => {
    // eventually change this to just get each record listed in the user record
    const clientsTemp = [];
    const navTemp = [];
    async function loadData() {
      const docs = await fetchAllJobseekers();
      const navProfiles = await fetchAllNavigators();

      docs.forEach((element) => {
        const elem = {
          name: element.data().name, archived: element.data().archived, field: element.data()['field of work'], email: element.id, interests: element.data().interests, skills: element.data().skills,
        };
        clientsTemp.push(elem);
      });

      navProfiles.forEach((element) => {
        const elem = {
          name: element.data().name, archived: element.data().archived, field: element.data()['field of work'], email: element.id, interests: element.data().interests, skills: element.data().skills,
        };
        navTemp.push(elem);
        console.log(element.data());
      });

      const archivedAccounts = clientsTemp.filter((element) => element.archived);
      const unarchivedAccounts = clientsTemp.filter((element) => !element.archived);
      const unapprovedAccs = clientsTemp.filter((element) => !element.approval);

      setArchivedProfiles(archivedAccounts);
      setClients(unarchivedAccounts);
      setNavigators(navTemp);
      setUnapprovedAccounts(unapprovedAccs);
    }
    loadData();
  }, []);

  return (
    <div className="home-page-container">
      <Box sx={{ borderBottom: 1, borderColor: 'divider', boxShadow: '0 4px 4px #c9c9c9' }}>
        <div className="home-page-headers-container">
          <div className="home-page-header-name-and-icon-container">
            <div className="home-page-header-empty-block" />
            <p className="home-page-header-profile-text">{profileName}</p>
            <Avatar
              facebookId="100008343750912"
              className="profile-avatar"
            />
          </div>
          <div className="home-page-welcome-block-header">
            <div className="home-page-welcome-container">
              <p className="home-page-title">
                Welcome,
                {' '}
                {profileName.split(' ')[0]}
              </p>
            </div>
            <div className="home-page-search-bar-container"><SearchAndFilter names={currentTabAccounts} setOutput={setFilteredAccounts} placeholder="Search Accounts" /></div>
          </div>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {role === 'Admin' && <HomeTab label="Navigators" {...a11yProps(0)} />}
            <HomeTab label="Clients" {...a11yProps(1)} />
            <HomeTab label="Archive" {...a11yProps(2)} />
            {role === 'Admin' && <HomeTab label="Unapproved Accounts" {...a11yProps(3)} />}
          </Tabs>
        </div>
      </Box>
      {role === 'Admin' && (
      <TabPanel value={tabValue} index={0}>
        <div>
          {filteredAccounts && filteredAccounts.length
            ? (
              <div className="tab-panel-grid-layout">
                {
                filteredAccounts.map((element) => (
                  <ProfileButton
                    key={uuidv4()}
                    profileName={element.name}
                    profileArchived={element.archived}
                    workField={element.field}
                    jobseekerEmail={element.email}
                  />
                ))
              }
              </div>
            ) : <NoAccounts />}
        </div>
      </TabPanel>
      )}
      <TabPanel value={tabValue} index={role === 'Admin' ? 1 : 0}>
        <div>
          {filteredAccounts && filteredAccounts.length
            ? (
              <div className="tab-panel-grid-layout">
                {
                filteredAccounts.map((element) => (
                  <ProfileButton
                    key={uuidv4()}
                    profileName={element.name}
                    profileArchived={element.archived}
                    workField={element.field}
                    jobseekerEmail={element.email}
                  />
                ))
              }
              </div>
            ) : <NoAccounts />}
        </div>
      </TabPanel>
      <TabPanel value={tabValue} index={role === 'Admin' ? 2 : 1}>
        <div>
          {filteredAccounts && filteredAccounts.length
            ? (
              <div className="tab-panel-grid-layout">
                {
                filteredAccounts.map((element) => (
                  <ProfileButton
                    key={uuidv4()}
                    profileName={element.name}
                    profileArchived={element.archived}
                    workField={element.field}
                    jobseekerEmail={element.email}
                  />
                ))
              }
              </div>
            ) : <NoAccounts />}
        </div>
      </TabPanel>
      {role === 'Admin' && (
      <TabPanel value={tabValue} index={3}>
        <div>
          {filteredAccounts && filteredAccounts.length
            ? (
              <div className="tab-panel-grid-layout">
                {
                filteredAccounts.map((element) => (
                  <ProfileButton
                    key={uuidv4()}
                    profileName={element.name}
                    profileArchived={element.archived}
                    workField={element.field}
                    jobseekerEmail={element.email}
                  />
                ))
              }
              </div>
            ) : <NoAccounts />}
        </div>
      </TabPanel>
      )}

    </div>
  );
}

Dashboard.propTypes = {
  profileName: PropTypes.string,
  role: PropTypes.string,
};

Dashboard.defaultProps = {
  profileName: 'Nasser Elhajjaoui',
  role: 'Admin',
};
