import React, { useState } from 'react';
import {
  Box, AppBar, Toolbar, Tabs, Tab, Typography, TextField,
} from '@mui/material';

function NavigatorHeader() {
  const [tab, setTab] = useState('');

  const handleChange = (event, newValue) => {
    setTab(newValue);
    console.log(tab);
  };

  return (
    <Box sx={{ boxShadow: '10px 5px 5px red' }}>
      <AppBar
        position="static"
        sx={{
          background: '#FFFFFF',
          // width: '80vw',
          margin: 'auto',

        }}
      >
        <Toolbar
          sx={{
            justifyContent: 'start',
            display: 'block',
            width: '90vw',
          }}

        >
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>

            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                flexGrow: 1,
                display: { xs: 'none', sm: 'block' },
                color: '#111111',
                fontSize: '3.2em',
                textAlign: 'left',
                border: '2px dotted red',
                width: '50%',
              }}
            >
              Welcome, Nasser
            </Typography>
            <TextField label="Search Jobseekers" sx={{ alignSelf: 'flex-end', '& fieldset': { borderRadius: '30px' } }} />

          </Box>
          <Tabs value={tab} onChange={handleChange} sx={{ border: '2px dashed green' }}>
            <Tab label="Clients" />
            <Tab label="Archive" />
          </Tabs>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavigatorHeader;
