import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import {
  Tabs, Tab, ButtonBase,
} from '@mui/material';
import PropTypes from 'prop-types';
import Avatar from 'react-avatar';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Back from '../../Assets/back.svg';
import './Header.css';
import { fetchJobseekerData, updateJobseekerData } from '../../Services/jobseeker-data-service';
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

function Header({
  jobseekerEmail, value, setValue, fullName,
}) {
  const store = useSelector((state) => state.auth.value);

  const navigate = useNavigate();

  const [navbar, toggleNavbar] = useState(false);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    setValue(newValue);
  };

  const handleClick = () => {
    toggleNavbar(!navbar);
  };

  const [jobseekerData, setJobseekerData] = useState();
  const [notes, toggleNotes] = useState(false);
  const [notesBody, setNotesBody] = useState('');
  const [prev, setPrev] = useState('');
  const [loaded, setLoaded] = useState(false);
  // const jobseekerEmail = 'alannguyen711@gmail.com';

  const handleNotepadClick = () => {
    handleClick();
    toggleNotes(!notes);
  };

  const handleNotepadCancel = () => {
    toggleNotes(!notes);
  };

  const handleNotepadSave = () => {
    if (loaded) {
      setJobseekerData({
        ...jobseekerData,
        notes: notesBody,
      });
      toggleNotes(!notes);
    }
  };

  const handleInputChange = (e) => {
    setNotesBody(e.target.value);
  };

  useEffect(() => {
    const asyncFn = async () => {
      const tempJobseekerData = await fetchJobseekerData(jobseekerEmail);
      setJobseekerData(tempJobseekerData.data());
      setLoaded(true);
    };
    asyncFn();
  }, []);

  useEffect(() => {
    if (notes) {
      setPrev(notesBody);
    } else {
      setNotesBody(prev);
    }
  }, [notes]);

  useEffect(() => {
    if (jobseekerData !== undefined) {
      setNotesBody(jobseekerData.notes);
    }
    if (jobseekerData !== undefined) {
      updateJobseekerData(jobseekerEmail, jobseekerData);
    }
  }, [jobseekerData]);

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
          {tabs.map((x, index) => (
            <Tab
              sx={style.tabStyle}
              key={x.link}
              label={x.title}
              component={Link}
              to={x.link}
              onClick={(e) => handleChange(e, index)}
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
          <textarea className="notes-body" onChange={handleInputChange} value={notesBody} />
        </div>
        <div className="notes-buttons">
          <button type="button" onClick={handleNotepadCancel} className="notes-button-cancel">
            Cancel
          </button>
          <button type="button" onClick={handleNotepadSave} className="notes-button-save">
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
                <ButtonBase onClick={() => navigate('/profile')}>
                  <p className="dashboard-page-header-profile-text">{`${store.user.firstName} ${store.user.lastName}`}</p>
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
                </ButtonBase>
              </div>

            </div>
            <div className="bottom-header-contents">
              <div className="username-text-roadmap">
                {fullName}
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

Header.propTypes = {
  jobseekerEmail: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  setValue: PropTypes.func.isRequired,
  fullName: PropTypes.string.isRequired,
};

export default Header;
