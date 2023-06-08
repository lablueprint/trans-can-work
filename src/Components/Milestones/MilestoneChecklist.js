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

  If you're trying to make a checklist that needs to interact with backend,
  you can copy pasta this code into ur own component and modify it to take
  data from backend + a handleChange function rather than taking metadata from
  props. #sorryidonthavethebackendapinordoiknowwhatitsgonnabesothisismetrynahelp
  this component is prolly incomplete do it urself #cyakid
*/

const style = {
  container: {
    border: '2px dotted red',
    width: '40vw',
    alignSelf: 'center',
  },
  checklistWrapper: {
    display: 'grid',
    // gridTemplateColumns: 'repeat(2, 1fr)',
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
function MilestoneChecklist({ checkboxes, columns }) {
  // Configure style to specified # of columns
  // style.checklistWrapper.gridTemplateColumns = `repeat(${columns}, 1fr)`;
  style.checklistWrapper = { ...style.checklistWrapper, gridTemplateColumns: `repeat(${columns}, 1fr)` };

  const checklist = checkboxes.map((x) => (
    <div key={x.label}>
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
  columns: PropTypes.number,
};

MilestoneChecklist.defaultProps = {
  checkboxes: [],
  columns: 1,
};

/*

*/
