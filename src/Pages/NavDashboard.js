import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Avatar } from '@material-ui/core';
import {
  Tab, Tabs,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import SearchAndFilter from '../Components/SearchAndFiltering/searchAndFilter';
import FilterChips from '../Components/SearchAndFiltering/FilterChips';
import './Home.css';
import './Dashboard.css';
import ProfileButton from '../Components/Dashboard/ProfileButton';
import { fetchUsersByNavigator } from '../Services/user-service';
import DashError from '../Components/Dashboard/DashError';
import { skillsChecklistOptions, industryInterestOptions } from '../Services/objects-service';
// profile image imports
import skater from '../Assets/ProfileIcons/monogram.png';
import dog from '../Assets/ProfileIcons/monogram-2.png';
import { fetchJobseekerData } from '../Services/jobseeker-data-service';
import Loading from '../Components/Loading/Loading';

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
export default function NavDashboard() {
  const store = useSelector((state) => state.auth.value);

  const [tabValue, setValue] = useState(0);
  const [hasAssignments, setHasAssignments] = useState(false);

  // states for filtering
  const [checkedSkills, setCheckedSkills] = useState(
    new Array(skillsChecklistOptions.length).fill(false),
  );
  const [checkedInterests, setCheckedInterests] = useState(
    new Array(industryInterestOptions.length).fill(false),
  );

  // data from firebase
  const [clients, setClients] = useState([]);

  // data for display
  const [currentTabAccounts, setCurrentTabAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  // handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // handle frontend edits to different accounts
  // - backend calls occur in the profile button component!
  const editField = (setState, id, field, value) => {
    setState((prev) => {
      const obj = { ...prev.find((el) => el.id === id) };
      const remaining = prev.filter((el) => el.id !== id);
      obj[field] = value;
      return [...remaining, obj];
    });
  };

  const editClient = (id, field, value) => { editField(setClients, id, field, value); };

  const deleteAccount = (setState, id) => {
    setState((prev) => prev.filter((el) => el.id !== id));
  };

  const deleteClient = (id) => { deleteAccount(setClients, id); };

  // set the change accounts displayed depending on tab
  useEffect(() => {
    // unarchived clients
    if (tabValue === 0) {
      setCurrentTabAccounts(clients.filter((element) => !element.archived));

      // archived clients
    } else if (tabValue === 1) {
      setCurrentTabAccounts(clients.filter((element) => element.archived));
    }
  }, [tabValue, clients]);

  // pull navigators clients upon page launch
  useEffect(() => {
    const clientsTemp = [];
    async function loadData() {
      const docs = await fetchUsersByNavigator(store.email);

      await Promise.all(docs.map(async (doc) => {
        if (doc.data().approved) {
          const seeker = await fetchJobseekerData(doc.id);
          const seekerData = seeker.data();
          const data = doc.data();
          const elem = {
            email: doc.id,
            id: data.uid,
            name: `${data.firstName} ${data.lastName}`,
            archived: data.archived,
            approved: data.approved,
            accountType: data.role,
            field: seekerData.clientInfo['Dream Job'],
            skills: seekerData.skillsChecklist,
            interests: seekerData.industryInterest,
            // get bookmarked and iconNumber from data somehow! eventually!
            bookmarked: store.user.bookmarked.includes(doc.id),
            iconNumber: 0,
          };
          clientsTemp.push(elem);
        }
      }));

      setHasAssignments(clientsTemp.length !== 0);
      setClients(clientsTemp.filter((element) => element.approved === true));
    }
    if (store !== undefined) {
      loadData();
    }
  }, [store]);

  // if the user's information is loading, diplay loading component
  if (store === undefined) {
    return (<Loading />);
  }

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-page-headers-container">
        <div className="dashboard-page-header-name-and-icon-container">
          <p className="dashboard-page-header-profile-text">{`${store.user.firstName} ${store.user.lastName}`}</p>
          <Avatar
            facebookId="100008343750912"
            className="profile-button-avatar"
          />
        </div>
        <div className="dashboard-page-welcome-block-header">
          <p className="dashboard-page-title">
            Welcome,
            {' '}
            {store.user.firstName}
          </p>
          <div className="dashboard-page-search-bar-container">
            <SearchAndFilter
              accounts={currentTabAccounts}
              checkedSkills={checkedSkills}
              setCheckedSkills={setCheckedSkills}
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
          <StyledTab label="Clients" {...a11yProps(1)} />
          <StyledTab label="Archive" {...a11yProps(2)} />
        </StyledTabs>
      </div>
      {hasAssignments
        ? (
          <>
            <div className="dashboard-page-chip-container">
              <FilterChips
                checkedSkills={checkedSkills}
                setCheckedSkills={setCheckedSkills}
                checkedInterests={checkedInterests}
                setCheckedInterests={setCheckedInterests}
                skills={skillsChecklistOptions}
                interests={industryInterestOptions}
              />
            </div>
            {filteredAccounts && filteredAccounts.length !== 0
              ? (
                <div className="dashboard-page-profile-grid">
                  {
              filteredAccounts
                .sort((a, b) => (+b.bookmarked) - (+a.bookmarked) || a.name.localeCompare(b.name))
                .map((element) => (
                  <ProfileButton
                    key={uuidv4()}
                    id={element.id}
                    profileName={element.name}
                    workField={element.field}
                    email={element.email}
                    icon={icons[element.iconNumber]}
                    accountType={element.accountType}
                    bookmarked={element.bookmarked}
                    isArchived={element.archived}
                    isApproved={element.approved}
                    isAdmin={false}
                    editField={editClient}
                    deleteAccount={deleteClient}
                    userEmail={store.email}
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
