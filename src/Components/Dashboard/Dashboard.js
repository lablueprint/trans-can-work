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

export default function Dashboard({ profileName, role }) {
  const [value, setValue] = useState(0);
  const [archivedProfiles, setArchivedProfiles] = useState([]);
  const [notArchivedProfiles, setNotArchivedProfiles] = useState([]);
  const [currentAccounts, setCurrentAccounts] = useState([]);
  const [navigatorAccounts, setNavigatorAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [unapprovedAccounts, setUnapprovedAccounts] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (role === 'Admin') {
      if (value === 0) {
        setCurrentAccounts(navigatorAccounts);
        setFilteredAccounts(navigatorAccounts);
      } else if (value === 1) {
        setCurrentAccounts(notArchivedProfiles);
        setFilteredAccounts(notArchivedProfiles);
      } else if (value === 2) {
        setCurrentAccounts(archivedProfiles);
        setFilteredAccounts(archivedProfiles);
      } else if (value === 3) {
        setCurrentAccounts(unapprovedAccounts);
        setFilteredAccounts(unapprovedAccounts);
      }
    } else if (role === 'Navigator') {
      if (value === 0) {
        setCurrentAccounts(notArchivedProfiles);
        setFilteredAccounts(notArchivedProfiles);
      } else if (value === 1) {
        setCurrentAccounts(archivedProfiles);
        setFilteredAccounts(archivedProfiles);
      }
    }
  }, [value]);

  useEffect(() => {
    const info = [];
    const navInfo = [];
    async function loadData() {
      const docs = await fetchAllJobseekers();
      const navProfiles = await fetchAllNavigators();

      docs.forEach((element) => {
        const elem = {
          name: element.data().name, archived: element.data().archived, field: element.data()['field of work'], email: element.id, interests: element.data().interests, skills: element.data().skills,
        };
        info.push(elem);
      });

      navProfiles.forEach((element) => {
        const elem = {
          name: element.data().name, archived: element.data().archived, field: element.data()['field of work'], email: element.id, interests: element.data().interests, skills: element.data().skills,
        };
        navInfo.push(elem);
        console.log(element.data());
      });

      const archivedAccounts = info.filter((element) => element.archived);
      const unarchivedAccounts = info.filter((element) => !element.archived);
      const unapprovedAccs = info.filter((element) => !element.approval);

      setArchivedProfiles(archivedAccounts);
      setNotArchivedProfiles(unarchivedAccounts);
      setNavigatorAccounts(navInfo);
      setCurrentAccounts(navInfo);
      setFilteredAccounts(navInfo);
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
            <div className="home-page-search-bar-container"><SearchAndFilter names={currentAccounts} setOutput={setFilteredAccounts} placeholder="Search Accounts" /></div>
          </div>
          <Tabs
            value={value}
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
      <TabPanel value={value} index={0}>
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
      <TabPanel value={value} index={role === 'Admin' ? 1 : 0}>
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
      <TabPanel value={value} index={role === 'Admin' ? 2 : 1}>
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
      <TabPanel value={value} index={3}>
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
  role: 'Navigator',
};
