import React, { useState } from 'react';
import {
  Box, Tabs, Tab,
} from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import './NavMenu.css';
import Header from '../Header/Header';

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
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // const [navbar, toggleNavbar] = useState(false);

  return (
    <>
      <Header />
      <Box sx={{ display: 'flex' }}>
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
        <Box sx={style.panelStyle}><Outlet /></Box>

      </Box>

    </>
    // <Box sx={{ display: 'flex' }}>
    //   <Tabs
    //     orientation="vertical"
    //     variant="scrollable"
    //     value={value}
    //     onChange={handleChange}
    //     aria-label="Vertical tabs example"
    //     sx={style.tabsStyle}
    //     TabIndicatorProps={{
    //       sx: style.tabIndicatorStyle,
    //     }}
    //   >
    //     {tabs.map((x) => (
    //       <Tab
    //         sx={style.tabStyle}
    //         key={x.link}
    //         label={x.title}
    //         component={Link}
    //         to={x.link}
    //       />
    //     ))}
    //   </Tabs>
    //   <Box sx={style.panelStyle}><Outlet /></Box>

  // </Box>
  );
}

export default NavigatorMenu;

/* NOTES:
- WIP, Debugging borders left in purposefully
- Assessment and below tabs are part of one scrollable component
  - TO-DO: Find a way to make tabs scroll to certain text/sections (??)
  - STRETCH: When user scrolls, have tab indicator follow (big stretch)

*/
