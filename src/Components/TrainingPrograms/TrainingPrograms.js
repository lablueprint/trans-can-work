import React, { useState, useEffect } from 'react';
import './TrainingPrograms.css';
import propTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { DateField } from '@mui/x-date-pickers/DateField';
import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

const styles = {
  dropdownOptions: {
    fontFamily: 'Montserrat',
    color: '#49454F',
    fontSize: '0.9vw',
    fontWeight: 'bold',
    paddingLeft: '1.7%',
    textDecoration: 'none',
  },
  inputLabel: {
    fontFamily: 'Montserrat',
    color: '#49454F',
    width: '55.0vw',
    height: '3.2vw',
    fontSize: '0.9vw',
    fontWeight: 'bold',
    backgroundColor: '#F7F8FE',
  },
  formControl: {
    width: '55.0vw',
    textAlign: 'left',
    textDecoration: 'none',
  },
};

function TrainingPrograms({ jobseeker, setJobseeker }) {
  const textFieldStyles = {
    inputProps: {
      style: {
        fontFamily: 'Montserrat',
        color: '#49454F',
        width: '55.0vw',
        height: '3.2vw',
        fontSize: '0.9vw',
        fontWeight: 'bold',
        borderColor: '#000AA0',
        backgroundColor: '#F7F8FE',
      },
    },
    labelProps: {
      style: {
        fontFamily: 'Montserrat',
        fontSize: '0.95vw',
        color: '#000AA0',
        backgroundColor: '#FFFFFF',
      },
    },
  };

  const fieldProps = [
    { label: 'Training Program', value: 'program' },
    { label: 'Date Referral Sent', value: 'referral' },
    { label: 'Start Date', value: 'start' },
    { label: 'Date Officially Enrolled', value: 'enrolled' },
    { label: 'End Date', value: 'end' },
    { label: 'Completed?', value: 'completed' },
    { label: 'Notes', value: 'notes' },
  ];

  const [loaded, setLoaded] = useState(false);
  const [allPrograms, setAllPrograms] = useState([{}]);

  useEffect(() => {
    setAllPrograms(jobseeker.trainingPrograms);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      setJobseeker({
        ...jobseeker,
        trainingPrograms: allPrograms,
      });
    }
  }, [allPrograms]);

  const addProgram = async (event) => {
    event.preventDefault();
    const temp = {
      program: '',
      referral: new Date(),
      start: '',
      enrolled: '',
      end: '',
      completed: false,
      notes: '',
    };
    await setAllPrograms([...allPrograms, temp]);
    console.log(allPrograms);
  };

  const deleteProgram = async (event, index) => {
    event.preventDefault();
    const temp = [...allPrograms];
    temp.splice(index, 1);
    await setAllPrograms(temp);
  };

  const editProgram = (event, element, index) => {
    event.preventDefault();
    const temp = [...allPrograms];
    temp[index][element] = event.target.value;
    setAllPrograms(temp);
    console.log(allPrograms);
    console.log(date);
  };

  const editDropdown = (event, label, index) => {
    event.preventDefault();
    let val = true;
    if (event.target.value === 'No') {
      val = false;
    }
    const temp = [...allPrograms];
    temp[index][label] = val;
    setAllPrograms(temp);
  };

  const editDate = (newValue, label, index) => {
    const temp = [...allPrograms];
    temp[index][label] = newValue;
    setAllPrograms(temp);
  };

  return (
    <div className="content">
      <div className="tp-title">Training Programs</div>
      <div className="alert-modal">
        <p>
          You&apos;ve marked this milestone as complete for Jobseeker-Name. Click
          {' '}
          <a href="#">here</a>
          {' '}
          to undo.
        </p>
        <div className="actions" />
      </div>
      <div className="between-inputs" />
      <div>
        {allPrograms.map((programObject, index) => (
          <div>
            <div>
              <form>
                <div>
                  {fieldProps.map((field) => (
                    <div>
                      {(field.label === 'Training Program' || field.label === 'Notes')
                      && (
                        <>
                          <TextField
                            id="outlined-basic"
                            label={field.label}
                            placeholder={field.label}
                            variant="outlined"
                            value={programObject[field.value]}
                            focused
                            onChange={(e) => editProgram(e, field.value, index)}
                            InputProps={textFieldStyles.inputProps}
                            InputLabelProps={textFieldStyles.labelProps}
                            className="input-field"
                          />
                          <div className="op-between-inputs" />
                        </>
                      )}
                      {(field.label === 'Completed?')
                      && (
                        <>
                          <FormControl
                            fullWidth
                            focused
                            style={styles.formControl}
                          >
                            <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
                            <Select
                              defaultValue="No"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label={field.label}
                              onChange={(e) => editDropdown(e, field.value, index)}
                              style={styles.inputLabel}
                            >
                              <MenuItem value="Yes" style={styles.dropdownOptions}>Yes</MenuItem>
                              <MenuItem value="No" style={styles.dropdownOptions}>No</MenuItem>
                            </Select>
                          </FormControl>
                          <div className="op-between-inputs" />
                        </>
                      )}
                      {(field.label === 'Date Referral Sent' || field.label === 'Start Date'
                      || field.label === 'Date Officially Enrolled' || field.label === 'End Date'
                      || field.label === 'Date Completed Training')
                      && (
                        <>
                          <DateField
                            label={field.label}
                            focused
                            value={field.value}
                            onChange={(newValue) => editDate(newValue, field.value, index)}
                            InputProps={textFieldStyles.inputProps}
                            InputLabelProps={textFieldStyles.labelProps}
                            className="input-field"
                          />
                          <div className="op-between-inputs" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </form>
            </div>
            <div>
              <button type="button" onClick={(e) => deleteProgram(e, index)} className="op-delete-button">
                <img
                  src={Delete}
                  alt="delete icon"
                  style={{ marginRight: '12px' }}
                />
                Delete Program
              </button>
            </div>
            <div className="tp-between-buttons" />
          </div>
        ))}
      </div>
      <div>
        <button type="button" onClick={addProgram} className="op-add-button">
          <img
            src={Add}
            alt="add icon"
            style={{ marginRight: '12px' }}
          />
          Add Program
        </button>
      </div>

    </div>
  );
}

export default TrainingPrograms;

TrainingPrograms.propTypes = {
  jobseeker: propTypes.shape({
    trainingPrograms:
    {
      program: propTypes.string.isRequired,
      referral: propTypes.instanceOf(Date),
      start: propTypes.instanceOf(Date),
      enrolled: propTypes.instanceOf(Date),
      end: propTypes.instanceOf(Date),
      completed: propTypes.bool.isRequired,
      notes: propTypes.string.isRequired,
    },
  }).isRequired,
  setJobseeker: propTypes.func.isRequired,
};
