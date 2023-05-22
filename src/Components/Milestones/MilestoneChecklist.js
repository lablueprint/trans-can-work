import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { DisabledByDefaultRounded } from '@mui/icons-material';
/*
  This is a READONLY Checklist
  To use, pass in an array of objects with the following shape:
    {
      label: a string you want to associate with this checkbox
      value: a boolean for whether checked or not
      bullets: an array of strings for bullet points you want underneath
    }
*/

const style = {
  container: {
    width: '40vw',
    alignSelf: 'center',
  },
  checklistWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridAutoRows: 'minmax(auto, auto)',
    gridGap: '10px',
  },
  checkboxLabel: {
    width: 'fit-content',
    letterSpacing: '0.5px',
    textAlign: 'left',
    fontSize: '.9em',
    color: '#484649',
    lineHeight: '24px',
    fontFamily: 'Montserrat',
  },
  checkboxValue: {
    '&.Mui-disabled': {
      color: '#484649',
    },
  },
  checkboxBulletList: {
    marginTop: '0',
  },
  checkboxBullet: {
    letterSpacing: '0.5px',
    textAlign: 'left',
    fontSize: '.8em',
    color: '#484649',
    fontFamily: 'Montserrat',
  },
  formControl: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};
function MilestoneChecklist({ checkboxes }) {
  const checklist = checkboxes.map((x) => (
    <div>
      <FormControlLabel
        sx={style.formControl}
        label={<Typography sx={style.checkboxLabel}>{x.label}</Typography>}
        labelPlacement="start"
        control={(
          <Checkbox
            defaultChecked
            disabled
            checked={x.value}
            sx={style.checkboxValue}
            checkedIcon={<DisabledByDefaultRounded />}
          />
        )}
      />
      <ul style={style.checkboxBulletList}>
        {
          x.bullets.map((y) => <li key={y} style={style.checkboxBullet}>{y}</li>)
        }
      </ul>
    </div>
  ));
  return (
    <div style={style.container}>
      <div style={style.checklistWrapper}>
        {checklist}
      </div>
    </div>
  );
}

export default MilestoneChecklist;

MilestoneChecklist.propTypes = {
  checkboxes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.bool.isRequired,
      bullets: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
};

MilestoneChecklist.defaultProps = {
  checkboxes: [],
};
