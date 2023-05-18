import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Avatar } from '@material-ui/core';
import {
  Tab, Tabs,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PropTypes } from 'prop-types';
import SearchAndFilter from '../SearchAndFiltering/searchAndFilter';
import '../../Pages/Home.css';
import './Dashboard.css';
import ProfileButton from '../ProfileButton/profileButton';
import { fetchAllJobseekers } from '../../Services/jobseeker-service';
import { fetchAllNavigators } from '../../Services/navigator-service';
import NoAccounts from './NoAccounts';

// profile image imports
import skater from '../../Assets/ProfileIcons/monogram.png';
import dog from '../../Assets/ProfileIcons/monogram-2.png';

const icons = [
  skater,
  dog,
];

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
  other additions:
    - add bookmarked users to datamodel + get that data when you pull from backend
*/
export default function Dashboard({ profileName, role }) {
  const [tabValue, setValue] = useState(0);

  // data from firebase
  const [clients, setClients] = useState([]);
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
      // navigators
      if (tabValue === 0) {
        setCurrentTabAccounts(navigators);

      // unarchived clients
      } else if (tabValue === 1) {
        setCurrentTabAccounts(clients.filter((element) => !element.archived));

      // archived clients
      } else if (tabValue === 2) {
        setCurrentTabAccounts(clients.filter((element) => element.archived));

      // unapproved accounts
      } else if (tabValue === 3) {
        setCurrentTabAccounts(unapprovedAccounts);
      }
    } else if (role === 'Navigator') {
      // unarchived clients
      if (tabValue === 0) {
        setCurrentTabAccounts(clients.filter((element) => !element.archived));

      // archived clients
      } else if (tabValue === 1) {
        setCurrentTabAccounts(clients.filter((element) => element.archived));
      }
    }
  }, [tabValue, navigators, clients, unapprovedAccounts, role]);

  useEffect(() => {
    // eventually change this to just get each record listed in the user record
    const clientsTemp = [];
    const navTemp = [];
    async function loadData() {
      const docs = await fetchAllJobseekers();
      const navProfiles = await fetchAllNavigators();

      docs.forEach((element) => {
        const elem = {
          id: element.id,
          name: element.data().name,
          archived: element.data().archived,
          approval: element.data().approval,
          field: element.data()['field of work'],
          email: element.id,
          interests: element.data().interests,
          skills: element.data().skills,
          // get bookmarked and iconNumber from data somehow! eventually!
          bookmarked: false,
          iconNumber: 0,
          accountType: 'jobseeker',
        };
        clientsTemp.push(elem);
      });

      navProfiles.forEach((element) => {
        const elem = {
          id: element.id,
          name: element.data().name,
          archived: element.data().archived,
          approval: element.data().approval,
          field: element.data()['field of work'],
          email: element.id,
          interests: element.data().interests,
          skills: element.data().skills,
          // get bookmarked and iconNumber from data somehow! eventually!
          bookmarked: false,
          iconNumber: 1,
          accountType: 'navigator',
        };
        navTemp.push(elem);
      });

      const approvedClients = clientsTemp.filter((element) => element.approval === true);
      // unnapproved acts should include admin + navigators eventually
      const unapprovedAccs = clientsTemp.filter((element) => !element.approval);

      setClients(approvedClients);
      setNavigators(navTemp);
      setUnapprovedAccounts(unapprovedAccs);
    }
    loadData();
  }, []);

  return (
    <div className="home-page-container">
      <div className="home-page-headers-container">
        <div className="home-page-header-name-and-icon-container">
          <p className="home-page-header-profile-text">{profileName}</p>
          <Avatar
            facebookId="100008343750912"
            className="profile-avatar"
          />
        </div>
        <div className="home-page-welcome-block-header">
          <p className="home-page-title">
            Welcome,
            {' '}
            {profileName.split(' ')[0]}
          </p>
          <div className="home-page-search-bar-container"><SearchAndFilter names={currentTabAccounts} setOutput={setFilteredAccounts} placeholder="Search Accounts" /></div>
        </div>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="Account type tabs"
        >
          {role === 'Admin' && <HomeTab label="Navigators" {...a11yProps(0)} />}
          <HomeTab label="Clients" {...a11yProps(1)} />
          <HomeTab label="Archive" {...a11yProps(2)} />
          {role === 'Admin' && <HomeTab label="Unapproved Accounts" {...a11yProps(3)} />}
        </Tabs>
      </div>
      {filteredAccounts && filteredAccounts.length !== 0
        ? (
          <div className="profile-grid">
            {
                filteredAccounts.map((element) => (
                  <ProfileButton
                    key={uuidv4()}
                    profileName={element.name}
                    profileArchived={element.archived}
                    workField={element.field}
                    jobseekerEmail={element.email}
                    icon={icons[element.iconNumber]}
                    accountType={element.accountType}
                  />
                ))
              }
          </div>
        ) : <NoAccounts />}
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
