/* eslint-disable */
import React, { useState } from 'react';
import {
  Box, Tabs, Tab, Divider
} from '@mui/material';

import './NavMenu.css';

const style = {
  tabStyle: {
    fontFamily: 'Montserrat',
    textTransform: 'none',
    borderBottom: '1px solid #E7E0EC',
    height: '6px',
    color: "#000000",
    "&.Mui-selected": {
      color: "#000000"
    }
  }
};

const tabs = [
  "Roadmap",
  "Assessment",
  "Online Profiles",
  "Training Programs",
  "Co-Enroll",
  "Workshops",
  "Internships",
  "Job Fairs",
  "Job Boards",
  "Resources",
  "Hired Info"
];

function NavigatorMenu() {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, }}
        TabIndicatorProps={{
          sx: {
            left: 0,
            backgroundColor: '#F83DA6'
          }
        }}
      >
        {tabs.map((x) => <Tab sx={style.tabStyle} label={x} />)}
      </Tabs>
      <Box sx={{ alignSelf: 'center' }}>sdfd</Box>
    </Box>
  );
}

export default NavigatorMenu;
