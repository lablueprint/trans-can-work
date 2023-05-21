import React/* , { useEffect } */ from 'react';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { PropTypes } from 'prop-types';
import Avatar from 'react-avatar';
import Button from '@mui/material/Button';
import { Dialog } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import Pencil from '../Assets/pencil.svg';
import Eye from '../Assets/eye.svg';
import Back from '../Assets/back.svg';
import {
// fetchJobseeker,
} from '../Services/jobseeker-service';
import './profileOutline.css';
import { logout } from './firebase';
import LogoutLogo from '../Assets/logout.svg';
import BlueLogoutLogo from '../Assets/bluelogout.svg';
import ProfilePicPlaceholder from '../Assets/profilephotoplaceholder.svg';
import firebase from '../firebase';

const demographicInfo = [{
  name: 'kaylee',
  title: 'slayer',
  pronouns: 'she/her',
  email: 'kaeleytran@gmail.com',
  password: 'poop',
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

const testemail = 'bboy@tt.com';

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

const backgroundColors = ['#FF968A', '#FFCCB6', '#FFFFB5', '#CCE2CB', '#A2E1DB', '#D4F0F0', '#CBAACB', '#FEE1E8'];

export default function ProfileOutline() {
  const [value, setValue] = React.useState(0);
  const [disableButton, setDisableButton] = React.useState(true);
  const [passwordShown, setPasswordShown] = React.useState(false);
  const [logoutPress, setLogoutPress] = React.useState(false);
  const [editProfilePic, setEditProfilePic] = React.useState(false);
  // const [bg, setBg] = React.useState('');
  const db = firebase;
  const docRef = doc(db, 'jobseekers', testemail);
  const userType = 'navigator';
  const isApproved = false;

  // add backend call to dynamically get navigator info

  // useEffect(() => {
  //   const logquery = async () => {
  //     const query = await fetchJobseeker(testemail);
  //     const data = query.data();
  //     if (data.color != null) {
  //       setBg(data.color);
  //       console.log('background', data.color);
  //     }
  //   };
  //   logquery();
  // }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const logoutButton = () => {
    setLogoutPress(!logoutPress);
    logout();
  };

  const handleEdit = () => {
    setDisableButton(!disableButton);
  };

  const showPassword = () => {
    setPasswordShown(!passwordShown);
  };

  const handleClick = (color) => {
    const data = {
      color,
    };
    setDoc(docRef, data, { merge: true })
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
    // setBg(color);
    setEditProfilePic(!editProfilePic);
  };

  if (userType === 'navigator' || (userType === 'admin' && isApproved)) {
    return (
      <div className="background">
        <div className="header">
          <Box sx={{ borderBottom: 1, borderColor: 'divider', boxShadow: '0 4px 4px #c9c9c9' }}>
            <div className="profile-page-headers-container">
              <div className="profile-page-header-name-and-icon-container">
                <div className="profile-page-back-empty-block" />
                <div className="header-image-container">
                  <div className="back-button">
                    <Link to="/">
                      <Button
                        style={{
                          color: 'black',
                        }}
                      >
                        <img
                          src={Back}
                          alt="back-pointing arrow"
                          style={{
                            marginRight: '12px',
                            width: '7.41px',
                            height: '12px',
                          }}
                        />
                        Back
                      </Button>
                    </Link>
                  </div>
                </div>
                <div className="profile-page-header-empty-block" />
                <p className="profile-page-header-profile-text">{demographicInfo[0].name}</p>
                <div className="header-image-container">
                  <Avatar
                    src={ProfilePicPlaceholder}
                    size="40"
                    styles={{
                      height: '2em',
                      width: '2em',
                      marginTop: '6px',
                      marginBottom: '6px',
                      marginLeft: '6px',
                    }}
                    round
                  />
                </div>
              </div>
              <div className="profile-page-welcome-block-header">
                <div style={{ flex: '0 0 75%' }}>
                  <p className="profile-page-title">
                    Profile Page
                  </p>
                </div>
              </div>
            </div>

          </Box>
        </div>
        <div className="top-container">
          <div className="profile-photo-container">
            <Avatar src={ProfilePicPlaceholder} size="150" sx={{ borderRadius: '100px' }} round />
            {/* <div
              className="imageSection"
              style={{
                backgroundColor: bg,
                width: 100,
                height: 100,
              }}
            /> */}
            <div
              className="profilePicButton"
            >
              <button
                type="button"
                className="editProfilePicButton"
                onClick={() => setEditProfilePic(true)}
                style={{
                  background: '#FFFFFF',
                  borderColor: 'black',
                  color: 'black',
                  borderRadius: '50%',
                  alignSelf: 'flex-end',
                  height: 41,
                  width: 41,
                  padding: 10,
                  position: 'absolute',
                  bottom: 20,
                  right: 20,
                }}
              >
                <Edit sx={{
                  height: 18,
                  width: 18,
                }}
                />
              </button>

            </div>
            <Dialog open={editProfilePic} onClose={() => setEditProfilePic(false)}>
              <div>
                <h3>Choose Profile Picture</h3>
                {backgroundColors.map((color) => (
                  <Button
                    onClick={() => handleClick(color)}
                    key={color}
                    style={{
                      backgroundColor: color,
                      width: 50,
                      height: 65,
                      borderRadius: '50%',
                      margin: 5,
                    }}
                  />
                ))}
              </div>
              <Button onClick={() => setEditProfilePic(false)}>Save</Button>
            </Dialog>
            <p className="name-display">
              {demographicInfo[0].name}
            </p>
          </div>
          <div className="edit-button">
            <Button
              variant="outlined"
              onClick={handleEdit}
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
                    borderColor: 'black',
                    color: 'black',
                  }
            }
            >
              {disableButton ? (
                <img
                  src={Pencil}
                  alt="pencil icon next to edit button"
                  style={{ marginRight: '12px' }}
                />
              ) : null}
              {disableButton ? 'Edit Profile' : 'Save Changes'}
            </Button>
            {/* <div className="cancel-button">
              {disableButton ? null : (
                <Button
                  variant="outlined"
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

            </div> */}
          </div>
        </div>
        <div className="outermost-container">
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
                <br />
                <input
                  className={disableButton ? 'non-editable-field' : 'editable-email-password'}
                  readOnly
                  id="Email"
                  defaultValue={demographicInfo[0].email}
                  disabled={disableButton}
                />
              </label>
            </div>
            <div className="right-column">
              <label htmlFor="LastName">
                Last Name:
                <br />
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
                <div className="eyeContainer">
                  <img
                    src={Eye}
                      // eslint-disable-next-line max-len
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                    role="button"
                    alt="eye icon in password field"
                    onClick={showPassword}
                    readOnly
                    className={disableButton ? 'eyeNone' : 'eye'}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        showPassword();
                      }
                    }}
                  />
                  <input
                    className={disableButton ? 'non-editable-field' : 'editable-email-password'}
                    type={passwordShown ? 'text' : 'password'}
                    readOnly
                    id="Password"
                    defaultValue={demographicInfo[0].password}
                    disabled={disableButton}
                  />
                </div>
              </label>
            </div>
          </div>
          <br />
          <div className="bio">
            <label htmlFor="Bio">
              Bio:
              <br />
              <textarea
                className={disableButton ? 'non-editable-field-large' : 'editable-field-large'}
                id="Bio"
                defaultValue=""
                disabled={disableButton}
              />
            </label>
            <br />
            <div className="logout">
              <Button
                variant="text"
                onClick={logoutButton}
                sx={
                logoutPress ? {
                  marginRight: '2%',
                  background: '#F5F5F5',
                  borderColor: 'black',
                  color: '#000DC8',
                }
                  : {
                    marginRight: '2%',
                    background: '#F5F5F5',
                    borderColor: '#F5F5F5',
                    color: 'black',
                  }
            }
              >
                {logoutPress ? (
                  <img
                    src={BlueLogoutLogo}
                    alt="og logout"
                    style={{
                      marginRight: '12px',
                      color: '#000DC8',
                    }}
                  />
                )
                  : (
                    <img
                      src={LogoutLogo}
                      alt="blue logout logo"
                      style={{ marginRight: '12px' }}
                    />
                  )}
                Logout
              </Button>
            </div>
          </div>
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
              type="bio"
              id="Bio"
              defaultValue=""
              disabled={disableButton}
            />
          </label>
          <br />
          <Button
            onClick={handleEdit}
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
  password: PropTypes.string.isRequired,
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
