import React, { useState } from 'react';
import Box from '@mui/material/Box';
import {
  Tabs, Tab,
} from '@mui/material';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Back from '../../Assets/back.svg';
import './Header.css';
import hamburgerIcon from '../../Assets/Images/hamburger-icon.png';
import closeButton from '../../Assets/Images/close-button.png';
import notepadIcon from '../../Assets/Images/notepad.png';
import '../Navigation/NavMenu.css';

const style = {
  tabStyle: {
    fontFamily: 'Montserrat',
    textTransform: 'none',
    borderBottom: '1px solid #E7E0EC',
    height: '6px',
    color: '#000000',
    '&.Mui-selected': {
      color: '#000000',
    },
  },
  tabsStyle: {
    // borderRight: 1,
    // border: '2px dotted red',
    margin: '7vh  0 0 5vw',

  },
  tabIndicatorStyle: {
    left: 0,
    backgroundColor: '#F83DA6',
  },
  panelStyle: {
    alignSelf: 'start',
    width: '78vw',
    margin: '5vh 1vw',
    height: '100%',
    overflow: 'hidden',
    // border: '2px dotted blue',
  },
};

const tabs = [
  { title: 'Roadmap', link: 'roadmap' },
  { title: 'Assessment', link: 'assessment' },
  { title: 'Online Profiles', link: 'onlineprofiles' },
  { title: 'Training Programs', link: 'training' },
  { title: 'Workshops', link: 'workshops' },
  { title: 'Internships', link: 'internships' },
  { title: 'Job Fairs', link: 'jobfairs' },
  { title: 'Job Boards', link: 'jobboards' },
  { title: 'Resources', link: 'resources' },
  { title: 'Hired Info', link: 'hiredinfo' },
];

function Header() {
  const store = useSelector((state) => state.auth.value);

  const [navbar, toggleNavbar] = useState(false);

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [notes, toggleNotes] = useState(false);

  const handleClick = () => {
    toggleNavbar(!navbar);
  };

  const handleNotepadClick = () => {
    handleClick();
    toggleNotes(!notes);
  };

  const handleNotepadClickOnly = () => {
    toggleNotes(!notes);
  };

  return (
    <div>

      <div className={navbar ? 'mobileMenuOn' : 'mobileMenuOff'}>
        <button type="button" onClick={handleClick} className="close-button-container">
          <img className="close-button" src={closeButton} alt="Close button" />
        </button>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={style.tabsStyle}
          TabIndicatorProps={{
            sx: style.tabIndicatorStyle,
          }}
        >
          {tabs.map((x) => (
            <Tab
              sx={style.tabStyle}
              key={x.link}
              label={x.title}
              component={Link}
              to={x.link}
              onClick={handleClick}
            />
          ))}
        </Tabs>
        <button type="button" onClick={handleNotepadClick} className="notes-button-wrapper">
          <img className="note-button" src={notepadIcon} alt="Notepad icon" />
        </button>
      </div>

      <div className={notes ? 'notesPopupOn' : 'notesPopupOff'}>
        <div className="notes-text">
          <h1 className="notes-title">Notes</h1>
          <p className="notes-body">These are some notes that JobseekerJeff&#39;s navigator has written for him. We need to integrate this into the backend!</p>
        </div>
        <div className="notes-buttons">
          <button type="button" onClick={handleNotepadClickOnly} className="notes-button-cancel">
            Cancel
          </button>
          <button type="button" onClick={handleNotepadClickOnly} className="notes-button-save">
            Save
          </button>
        </div>
      </div>

      <div className="headers">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', boxShadow: '0 4px 4px #c9c9c9' }}>
          <div className="all-header-items">
            <div className="top-header-contents">
              <div className="go-back">
                <Link
                  to="/dashboard"
                  className="assessment-page-back-text"
                >
                  <img
                    src={Back}
                    alt="back-pointing arrow"
                    className="go-back-arrow"
                  />
                  Return to Clients List
                </Link>
              </div>

              <div className="align-helper">
                <div className="username-text">
                  {store.user.firstName + store.user.lastName}
                </div>
                <Avatar
                  facebookId="100008343750912"
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
            <div className="bottom-header-contents">
              <div className="username-text-roadmap">
                {store.user.firstName + store.user.lastName}
                &apos;s Roadmap
              </div>

              <button type="button" onClick={handleClick} className="menu-button-wrapper">
                <img className="menu-button" src={hamburgerIcon} alt="Hamburger menu icon" />
              </button>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
export default Header;
