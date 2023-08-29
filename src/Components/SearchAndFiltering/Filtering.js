import React, { useState } from 'react';
import propTypes from 'prop-types';
import './Filtering.css';
import {
  Tabs, Tab, styled, IconButton,
} from '@mui/material';
import { Close } from '@mui/icons-material';

import Checkboxes from '../Checkboxes/Checkboxes';

const styles = {
  close: {
    width: '20',
    height: '20',
  },
  cancel: {
    backgroundColor: '#FFFBFE',
    width: '35',
    height: '35',
    boxShadow: '0px 2px 8px rgba(68, 87, 82, 0.25)',
  },
};

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
  />
))({
  margin: '0 2em',
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#1C1B1F',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    backgroundColor: 'transparent',

    fontFamily: 'Montserrat',
    fontWeight: 600,
    color: '#1C1B1F',

    textTransform: 'none',
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),

    '&.Mui-selected': {
      color: '#1C1B1F',
    },

  }),
);

function Filtering({
  checkedSkills, setCheckedSkills,
  checkedInterests, setCheckedInterests,
  skills, interests, handleClose,
}) {
  const [tab, setTab] = useState('0');

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div>
      <div className="button-section">
        <IconButton
          style={styles.cancel}
          onClick={handleClose}
        >
          <Close style={styles.close} />
        </IconButton>
      </div>

      <StyledTabs value={tab} onChange={handleChange} variant="fullWidth">
        <StyledTab label="Skills" value="0" />
        <StyledTab label="Interests" value="1" />
      </StyledTabs>
      <div className="filter-container">

        {tab === '0'
          ? (
            <Checkboxes
              skills={skills}
              checkedArr={checkedSkills}
              setCheckedArr={setCheckedSkills}
            />
          )
          : (
            <Checkboxes
              skills={interests}
              checkedArr={checkedInterests}
              setCheckedArr={setCheckedInterests}
            />
          )}
      </div>
    </div>
  );
}

Filtering.propTypes = {
  checkedSkills: propTypes.arrayOf(propTypes.bool).isRequired, // i think this is
  setCheckedSkills: propTypes.func.isRequired,
  checkedInterests: propTypes.arrayOf(propTypes.bool).isRequired, // i think this is
  setCheckedInterests: propTypes.func.isRequired,
  skills: propTypes.arrayOf(propTypes.string).isRequired,
  interests: propTypes.arrayOf(propTypes.string).isRequired,
  handleClose: propTypes.func.isRequired,
};

export default Filtering;
