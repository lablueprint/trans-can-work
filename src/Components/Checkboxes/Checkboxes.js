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
    display: 'flex',
    width: '100%',
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
  formDiv: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'column',
  },
  parentDiv: {
    display: 'flex',
    flexDirextion: 'column',
    margin: 0,
  },
  top: {
    flex: '1',
  },
  bottom: {
    flex: '1',
  },
  bullets: {
    textAlign: 'left',
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '0.85em',
  },
  bulletList: {
    marginTop: 0,
    marginLeft: 0,
  },
};

function Checkboxes({
  skills, checkedArr, setCheckedArr, subskills = [],
}) {
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedArr.map((item, index) => (index === position
      ? !item : item));
    setCheckedArr(updatedCheckedState);
  };
  return (
    <FormGroup style={styles.container}>
      {skills.map((name, index) => (
        <div style={styles.parentDiv}>
          <div style={styles.formDiv}>
            <div style={styles.top}>
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
            </div>
            <div style={styles.bottom}>
              {subskills.length !== 0 && (
              <div>
                <ul style={styles.bulletList}>
                  {subskills[index].map((subskill) => (
                    <li style={styles.bullets}>{subskill}</li>
                  ))}
                </ul>
              </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </FormGroup>
  );
}
Checkboxes.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkedArr: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setCheckedArr: PropTypes.func.isRequired,
  subskills: PropTypes.arrayOf(
    PropTypes.arrayOf(PropTypes.string),
  ),
};

Checkboxes.defaultProps = {
  subskills: [], // Provide an empty array as the default value
};

export default Checkboxes;
