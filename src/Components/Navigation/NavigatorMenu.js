import React, { useState, useEffect } from 'react';
import {
  Box, Tabs, Tab,
} from '@mui/material';
import { Link, Outlet, useParams } from 'react-router-dom';
import './NavMenu.css';
import Header from '../Header/Header';
import notepadIcon from '../../Assets/Images/notepad.png';

import MilestoneMap from '../Milestones/MilestoneMap';
import Internships from '../Internships/Internships';
import Assessment from '../Assessment/Assessment';
import Workshops from '../Workshops/Workshops';
import JobFairs from '../JobFairs/JobFairs';
import JobBoards from '../JobBoards/JobBoards';
import HiredInfo from '../HiredInfo/HiredInfo';
import Resources from '../Resources/Resources';
import OnlineProfiles from '../OnlineProfiles/OnlineProfiles';
import TrainingPrograms from '../TrainingPrograms/TrainingPrograms';

import { fetchUser, updateUser } from '../../Services/user-service';
import { fetchJobseekerData, updateJobseekerData } from '../../Services/jobseeker-data-service';

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

function NavigatorMenu() {
  const { emailParam } = useParams();
  // to test, use alannguyen711@gmail.com on admin account for instance

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    event.preventDefault();
    console.log(newValue);
    setValue(newValue);
  };

  const [notes, toggleNotes] = useState(false);

  const handleNotepadClick = () => {
    toggleNotes(!notes);
  };

  const [userData, setUserData] = useState();
  const [jobseekerData, setJobseekerData] = useState();

  useEffect(() => {
    const asyncFn = async () => {
      const tempUserData = await fetchUser(emailParam);
      const tempJobseekerData = await fetchJobseekerData(emailParam);
      setUserData(tempUserData.data());
      setJobseekerData(tempJobseekerData.data());
    };
    asyncFn();
  }, []);

  useEffect(() => {
    if (jobseekerData !== undefined) {
      updateJobseekerData(emailParam, jobseekerData);
    }
  }, [jobseekerData]);

  useEffect(() => {
    if (userData !== undefined) {
      updateUser(emailParam, userData);
    }
  }, [userData]);

  if (jobseekerData === undefined) {
    // eventually replace with appropriate loading component
    return (<div>loading</div>);
  }

  const chooseStuff = () => {
    switch (value) {
      case 0:
        return <MilestoneMap />;
      case 1:
        return (
          <Assessment
            userData={userData}
            setUserData={setUserData}
            jobseeker={jobseekerData}
            setJobseeker={setJobseekerData}
            email={emailParam}
          />
        );
      case 2:
        return (
          <OnlineProfiles />
        );
      case 3:
        return (
          <TrainingPrograms />
        );
      case 4:
        return (
          <Internships />
        );
      case 5:
        return <Workshops />;
      case 6:
        return <JobFairs />;
      case 7:
        return <JobBoards />;
      case 8:
        return <Resources />;
      case 9:
        return <HiredInfo />;
      default:
        return <div>Not found 404</div>;
    }
  };

  return (
    <>
      <Header />
      <div className={notes ? 'notesPopupOn' : 'notesPopupOff'}>
        <div className="notes-text">
          <h1 className="notes-title">Notes</h1>
          <p className="notes-body">These are some notes that JobseekerJeff&#39;s navigator has written for him. We need to integrate this into the backend!</p>
        </div>
        <div className="notes-buttons">
          <button type="button" onClick={handleNotepadClick} className="notes-button-cancel">
            Cancel
          </button>
          <button type="button" onClick={handleNotepadClick} className="notes-button-save">
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
          <button type="button" onClick={handleNotepadClick} className="button-wrapper">
            <img className="notepad-button" src={notepadIcon} alt="Notepad icon" />
          </button>
        </div>
        {chooseStuff()}
        <Box sx={style.panelStyle}><Outlet /></Box>
      </Box>
    </>
  );
}

export default NavigatorMenu;
