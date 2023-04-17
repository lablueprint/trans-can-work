import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  Tab, Tabs, Box,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import TabPanel from '../Components/TabPanel';
import SearchBar from '../Components/SearchBar/SearchBar';
import './Home.css';
import ProfileButton from '../Components/ProfileButton/profileButton';
import { fetchAllJobseekers } from '../Services/jobseeker-service';
import { fetchAllNavigators } from '../Services/navigator-service';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const HomeTab = styled((props) => <Tab disableRipple {...props} />)(() => ({
  textTransform: 'none',

}));

export default function Home() {
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
  }, [value]);

  useEffect(() => {
    const info = [];
    const navInfo = [];
    async function loadData() {
      const docs = await fetchAllJobseekers();
      const navProfiles = await fetchAllNavigators();

      docs.forEach((element) => {
        const elem = {
          name: element.data().name, archived: element.data().archived, field: element.data()['field of work'], email: element.id,
        };
        info.push(elem);
      });

      navProfiles.forEach((element) => {
        const elem = {
          name: element.data().name, archived: element.data().archived, field: element.data()['field of work'], email: element.id,
        };
        navInfo.push(elem);
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
    <div style={{ marginTop: '5em' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginLeft: '7em' }}>
        <div style={{
          display: 'flex', flexDirection: 'row', height: '3em', marginBottom: '2.5em',
        }}
        >
          <div style={{ flex: '0 0 75%' }}><p className="home-page-title">Welcome, Nasser</p></div>
          <div style={{ display: 'flex', alignItems: 'end', flex: '1 0 25%' }}><SearchBar names={currentAccounts} setOutput={setFilteredAccounts} placeholder="Search Accounts" /></div>
        </div>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          style={{ marginLeft: '1em' }}
        >
          <HomeTab label="Navigators" {...a11yProps(0)} />
          <HomeTab label="Clients" {...a11yProps(1)} />
          <HomeTab label="Archive" {...a11yProps(0)} />
          <HomeTab label="Unapproved Accounts" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="tab-panel-grid-layout">
          {filteredAccounts
        && filteredAccounts.map((element) => (
          <ProfileButton
            key={uuidv4()}
            profileName={element.name}
            profileArchived={element.archived}
            workField={element.field}
            jobseekerEmail={element.email}
          />
        ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="tab-panel-grid-layout">
          {filteredAccounts
        && filteredAccounts.map((element) => (
          <ProfileButton
            key={uuidv4()}
            profileName={element.name}
            profileArchived={element.archived}
            workField={element.field}
            jobseekerEmail={element.email}
          />
        ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="tab-panel-grid-layout">
          {filteredAccounts
        && filteredAccounts.map((element) => (
          <ProfileButton
            key={uuidv4()}
            profileName={element.name}
            profileArchived={element.archived}
            workField={element.field}
            jobseekerEmail={element.email}
          />
        ))}
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="tab-panel-grid-layout">
          {filteredAccounts
        && filteredAccounts.map((element) => (
          <ProfileButton
            key={uuidv4()}
            profileName={element.name}
            profileArchived={element.archived}
            workField={element.field}
            jobseekerEmail={element.email}
          />
        ))}
        </div>
      </TabPanel>

    </div>
  );
}
