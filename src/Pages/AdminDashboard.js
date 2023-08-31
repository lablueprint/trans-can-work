import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Avatar } from '@material-ui/core';
import {
  Tab, Tabs,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import SearchBar from '../Components/SearchAndFiltering/SearchBar';
import './Home.css';
import './Dashboard.css';
import ProfileButton from '../Components/Dashboard/ProfileButton';
import { fetchAllUsers } from '../Services/user-service';
import DashError from '../Components/Dashboard/DashError';

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
export default function AdminDashboard() {
  const store = useSelector((state) => state.auth.value);

  // data from firebase
  const [users, setUsers] = useState([]);

  // user input
  const [tabValue, setValue] = useState(0);
  const [searchTerms, setSearchTerms] = useState('');

  // data for display
  const [currentTabAccounts, setCurrentTabAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);

  // handle tab change
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const search = (items) => {
    if (searchTerms.length > 0) {
      const searchQuery = searchTerms.toLowerCase();
      return items.filter((element) => element.name.toLowerCase().includes(searchQuery));
    }
    return items;
  };

  useEffect(() => {
    setFilteredAccounts(search(currentTabAccounts));
  }, [searchTerms, currentTabAccounts]);

  // handle edits to different accounts - will change with new backend!
  const editField = (id, field, value) => {
    setUsers((prev) => {
      const obj = { ...prev.find((el) => el.id === id) };
      const remaining = prev.filter((el) => el.id !== id);
      obj[field] = value;
      return [...remaining, obj];
    });
  };

  const deleteAccount = (id) => {
    setUsers((prev) => prev.filter((el) => el.id !== id));
  };

  // set the current accounts display (depending on the role type)
  useEffect(() => {
    // navigators
    if (tabValue === 0) {
      setCurrentTabAccounts(users.filter((element) => element.role === 'navigator' && element.approved));
      // unarchived clients
    } else if (tabValue === 1) {
      setCurrentTabAccounts(users.filter((element) => element.role === 'jobseeker' && element.approved && !element.archived));

      // archived clients
    } else if (tabValue === 2) {
      setCurrentTabAccounts(users.filter((element) => element.role === 'jobseeker' && element.approved && element.archived));

      // unapproved accounts
    } else if (tabValue === 3) {
      setCurrentTabAccounts(users.filter((element) => !element.approved));
    }
  }, [tabValue, users]);

  useEffect(() => {
    // eventually change this to just get each record listed in the user record
    const usersTemp = [];
    async function loadData() {
      const docs = await fetchAllUsers();

      docs.forEach((doc) => {
        const data = doc.data();
        const elem = {
          email: doc.id,
          id: data.uid,
          name: `${data.firstName} ${data.lastName}`,
          archived: data.archived !== undefined ? data.archived : false,
          approved: data.approved !== undefined ? data.approved : true,
          role: data.role,

          // get bookmarked and iconNumber from data somehow! eventually!
          bookmarked: store.user.bookmarked.includes(doc.id),
          iconNumber: 0,
        };
        usersTemp.push(elem);
      });
      setUsers(usersTemp);
    }

    if (store !== undefined) {
      loadData();
    }
  }, [store]);

  // if the user's information is loading, diplay loading component
  if (store === undefined) {
    // eventually replace with appropriate loading component
    return (<div>loading</div>);
  }

  return (
    <div className="dashboard-page-container">
      <div className="dashboard-page-headers-container">
        <div className="dashboard-page-headers-main">
          <div className="dashboard-page-header-name-and-icon-container">
            <p className="dashboard-page-header-profile-text">{`${store.user.firstName} ${store.user.lastName}`}</p>
            <Avatar
              facebookId="100008343750912"
              className="profile-button-avatar"
            />
          </div>

          <div className="dashboard-page-headers-middle">
            <p className="dashboard-page-title">
              Welcome,
              {' '}
              {store.user.firstName}
            </p>

            <div className="dash-admin-searchbar">
              <SearchBar
                value={searchTerms}
                setValue={setSearchTerms}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>
        <StyledTabs
          value={tabValue}
          onChange={handleChange}
          aria-label="Account type tabs"
        >
          <StyledTab label="Navigators" {...a11yProps(0)} />
          <StyledTab label="Clients" {...a11yProps(1)} />
          <StyledTab label="Archive" {...a11yProps(2)} />
          <StyledTab label="Unapproved Accounts" {...a11yProps(3)} />
        </StyledTabs>
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
                    email={element.email}
                    icon={icons[element.iconNumber]}
                    accountType={element.role}
                    bookmarked={element.bookmarked}
                    isArchived={element.archived}
                    isApproved={element.approved}
                    isAdmin
                    editField={editField}
                    deleteAccount={deleteAccount}
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
    </div>
  );
}
