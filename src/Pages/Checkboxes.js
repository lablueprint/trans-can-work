import React from 'react';
import { PropTypes } from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import {
  Checkbox, FormGroup, FormControlLabel, Typography,
} from '@mui/material';
// later we can make each tab a different component, the individual tabs take a jobseeker as a prob

const styles = {
  formControl: {
    margin: 0,
  },
  label: {
    fontFamily: 'Montserrat',
    fontWeight: 400,
    flexGrow: 1,
    textAlign: 'left',
    margin: '.5em 0',
  },
  container: {
    margin: '1em 0',
  },
  checkbox: {
    padding: 0,
  },
};
function Checkboxes({ skills, checkedArr, setCheckedArr }) {
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedArr.map((item, index) => (index === position
      ? !item : item));
    setCheckedArr(updatedCheckedState);
  };
  return (
    <FormGroup style={styles.container}>
      {skills.map((name, index) => (
        <FormControlLabel
          style={styles.formControl}
          label={(
            <Typography style={styles.label}>
              {name}
            </Typography>
          )}
          labelPlacement="start"
          key={uuidv4()}
          control={(
            <Checkbox
              size="medium"
              checked={checkedArr[index]}
              onChange={() => handleOnChange(index)}
              style={styles.checkbox}
            />
          )}
        />
      ))}
    </FormGroup>
  );
}
Checkboxes.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkedArr: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setCheckedArr: PropTypes.func.isRequired,
};

export default Checkboxes;