import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Avatar } from '@material-ui/core';
import {
  Tab, Tabs,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PropTypes } from 'prop-types';
import SearchAndFilter from '../Components/SearchAndFiltering/searchAndFilter';
import FilterChips from '../Components/SearchAndFiltering/FilterChips';
import './Home.css';
import './Dashboard.css';
import ProfileButton from '../Components/Dashboard/profileButton';
import { fetchAllJobseekers } from '../Services/jobseeker-service';
import { fetchAllNavigators } from '../Services/navigator-service';
import DashError from '../Components/Dashboard/DashError';
import { skills, interests } from '../Components/SearchAndFiltering/FilterConstants';

// profile image imports
import skater from '../Assets/ProfileIcons/monogram.png';
import dog from '../Assets/ProfileIcons/monogram-2.png';

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

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    width: '100%',
    backgroundColor: '#1C1B1F',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    backgroundColor: 'transparent',

    fontFamily: 'Montserrat',
    color: '#1C1B1F',

    textTransform: 'none',
    fontSize: '.9rem',
    marginRight: theme.spacing(1),

    '&.Mui-selected': {
      color: '#1C1B1F',
    },

  }),
);

/* the current version of the dashboard will not work with the switch to the users table
    - need to consider the new object format
    - admin + navigators have different levels of access, so this will cause issues with user rules
      -> should only fetch the necessary + accessible info!
  other additions:
    - add bookmarked users to datamodel + get that data when you pull from backend
*/
export default function Dashboard({ profileName, role }) {
  const [tabValue, setValue] = useState(0);
  const [hasAssignments, setHasAssignments] = useState(false);

  // states for filtering
  const [checkedSkills, setCheckedSkills] = useState(new Array(skills.length).fill(false));
  const [checkedInterests, setCheckedInterests] = useState(new Array(interests.length).fill(false));

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

  // handle edits to different accounts - will change with new backend!
  const editField = (setState, id, field, value) => {
    setState((prev) => {
      const obj = { ...prev.find((el) => el.id === id) };
      const remaining = prev.filter((el) => el.id !== id);
      obj[field] = value;
      return [...remaining, obj];
    });
  };

  const editClient = (id, field, value) => { editField(setClients, id, field, value); };
  const editNavigator = (id, field, value) => { editField(setNavigators, id, field, value); };

  const deleteAccount = (setState, id) => {
    setState((prev) => prev.filter((el) => el.id !== id));
  };

  const deleteClient = (id) => { deleteAccount(setClients, id); };
  const deleteNavigator = (id) => { deleteAccount(setNavigators, id); };

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
          accountType: 'client',
        };
        clientsTemp.push(elem);
      });

      navProfiles.forEach((element) => {
        const elem = {
          id: element.id,
          name: element.data().name,
          archived: false,
          approval: element.data().approval,
          field: 'Navigator',
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
      setHasAssignments(role === 'Admin' || clientsTemp.length !== 0);

      const approvedClients = clientsTemp.filter((element) => element.approval === true);
      // unnapproved acts should include admin + navigators eventually
      const unapprovedClients = clientsTemp.filter((element) => !element.approval);

      const approvedNavigators = navTemp.filter((element) => element.approval === true);
      const unapprovedNavigators = navTemp.filter((element) => !element.approval);

      setClients(approvedClients);
      setNavigators(approvedNavigators);
      setUnapprovedAccounts([...unapprovedClients, ...unapprovedNavigators]);
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
          <div className="home-page-search-bar-container">
            <SearchAndFilter
              accounts={currentTabAccounts}
              checkedArr={checkedSkills}
              setCheckedArr={setCheckedSkills}
              checkedInterests={checkedInterests}
              setCheckedInterests={setCheckedInterests}
              setOutput={setFilteredAccounts}
              placeholder="Search Accounts"
            />
          </div>
        </div>
        <StyledTabs
          value={tabValue}
          onChange={handleChange}
          aria-label="Account type tabs"
        >
          {role === 'Admin' && <StyledTab label="Navigators" {...a11yProps(0)} />}
          <StyledTab label="Clients" {...a11yProps(1)} />
          <StyledTab label="Archive" {...a11yProps(2)} />
          {role === 'Admin' && <StyledTab label="Unapproved Accounts" {...a11yProps(3)} />}
        </StyledTabs>
      </div>
      {hasAssignments
        ? (
          <>
            <div className="profile-chip-container">
              <FilterChips
                checkedSkills={checkedSkills}
                setCheckedSkills={setCheckedSkills}
                checkedInterests={checkedInterests}
                setCheckedInterests={setCheckedInterests}
                skills={skills}
                interests={interests}
              />
            </div>
            {filteredAccounts && filteredAccounts.length !== 0
              ? (
                <div className="profile-grid">
                  {
              filteredAccounts
                .sort((a, b) => (+b.bookmarked) - (+a.bookmarked) || a.name.localeCompare(b.name))
                .map((element) => (
                  <ProfileButton
                    key={uuidv4()}
                    id={element.id}
                    profileName={element.name}
                    workField={element.field}
                    jobseekerEmail={element.email}
                    icon={icons[element.iconNumber]}
                    accountType={element.accountType}
                    bookmarked={element.bookmarked}
                    isArchived={element.archived}
                    isApproved={element.approval}
                    isAdmin={role === 'Admin'}
                    editField={element.accountType === 'client' ? editClient : editNavigator}
                    deleteAccount={element.accountType === 'client' ? deleteClient : deleteNavigator}
                  />
                ))
            }
                </div>
              ) : (
                <DashError
                  text="No clients meet the specified search criteria. Please modify the filters."
                />
              )}
          </>
        )
        : (
          <DashError
            text="You currently have no assigned clients. Please contact a TransCanWork administrator if you believe this is a mistake."
          />
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
