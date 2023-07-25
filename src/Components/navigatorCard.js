import React from 'react';
import './navigatorCard.css';
import PropTypes from 'prop-types';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import FormControlLabel from '@mui/material/FormControlLabel';
import MuiCheckbox from '@mui/material/Checkbox';

function Checkbox({ icon, checkedIcon }) {
  return (
    <FormControlLabel
      control={
        <MuiCheckbox defaultChecked icon={icon} checkedIcon={checkedIcon} />
        }
    />
  );
}

function NavigatorCard({ user }) {
  const name = user;
  return (
    <div>
      {name}
      <Checkbox
        icon={<RadioButtonUncheckedIcon />}
        checkedIcon={<RadioButtonCheckedIcon />}
      />
    </div>
  );
}

export default NavigatorCard;

NavigatorCard.PropTypes = {
  user: PropTypes.string.isRequired,
};
