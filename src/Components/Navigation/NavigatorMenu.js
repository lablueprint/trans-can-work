import React, { useState, useEffect } from 'react';
import {
  Box, Tabs, Tab,
} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import { fetchJobseekerData, updateJobseekerData } from '../../Services/jobseeker-data-service';
import './NavMenu.css';
import Header from '../Header/Header';
import notepadIcon from '../../Assets/Images/notepad.png';

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

function NavigatorMenu() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [jobseekerData, setJobseekerData] = useState();
  const [notes, toggleNotes] = useState(false);
  const [notesBody, setNotesBody] = useState('');
  const [prev, setPrev] = useState('');
  const [loaded, setLoaded] = useState(false);
  const jobseekerEmail = 'alannguyen711@gmail.com';

  const handleNotepadClick = () => {
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
    <>
      <Header />

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

      <Box sx={{ display: 'flex' }}>
        <div className="navigation">
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
              />
            ))}
          </Tabs>
          <button type="button" onClick={handleNotepadClick} className="button-wrapper">
            <img className="notepad-button" src={notepadIcon} alt="Notepad icon" />
          </button>
        </div>
        <Box sx={style.panelStyle}><Outlet /></Box>

      </Box>

    </>
  );
}

export default NavigatorMenu;
