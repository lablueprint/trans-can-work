import React, { useState, useEffect } from 'react';
import './JobFairs.css';
import propTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function JobFairs({ jobseeker, setJobseeker }) {
  const styles = {
    dropdownOptions: {
      fontFamily: 'Montserrat',
      color: '#49454F',
      fontSize: '1rem',
      fontWeight: 'bold',
      paddingLeft: '1.7%',
      textDecoration: 'none',
    },
    inputLabel: {
      fontFamily: 'Montserrat',
      color: '#49454F',
      fontWeight: 'bold',
      backgroundColor: '#F7F8FE',
    },
    formControl: {
      textAlign: 'left',
      textDecoration: 'none',
    },
  };
  const textFieldStyles = {
    inputProps: {
      style: {
        fontFamily: 'Montserrat',
        color: '#49454F',
        fontWeight: 'bold',
        borderColor: '#000AA0',
        borderWidth: '1px',
        backgroundColor: '#F7F8FE',
      },
    },
    labelProps: {
      style: {
        fontFamily: 'Montserrat',
        color: '#000AA0',
        backgroundColor: '#FFFFFF',
      },
    },
  };

  const [loaded, setLoaded] = useState(false);
  const [jobFairs, setJobFairs] = useState([{}]);

  useEffect(() => {
    setJobFairs(jobseeker.jobFairs);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      setJobseeker({
        ...jobseeker,
        jobFairs,
      });
    }
  }, [jobFairs]);

  const addJobFair = async (event) => {
    event.preventDefault();
    const temp = {
      name: '',
      date: '',
      attended: false,
      notes: '',
    };
    await setJobFairs([...jobFairs, temp]);
  };

  const deleteJobFair = async (event, index) => {
    event.preventDefault();
    const temp = [...jobFairs];
    temp.splice(index, 1);
    await setJobFairs(temp);
  };

  const editJobFair = (event, element, index) => {
    event.preventDefault();
    const temp = [...jobFairs];
    temp[index][element] = event.target.value;
    setJobFairs(temp);
  };

  const editDropdown = (event, label, index) => {
    event.preventDefault();
    let val = true;
    if (event.target.value === 'No') {
      val = false;
    }
    const temp = [...jobFairs];
    temp[index][label] = val;
    setJobFairs(temp);
  };

  const fieldProps = [
    { label: 'Job Fair', value: 'name' },
    { label: 'Date of Job Fair', value: 'date' },
    { label: 'Attended Job Fair?', value: 'attended' },
    { label: 'Notes', value: 'notes' },
  ];

  return (
    <div className="content">
      <div className="tp-title">Job Fairs</div>
      <div className="between-inputs" />
      <div>
        {jobFairs.map((jobFairObject, index) => (
          <div>
            <div>
              <form>
                <div>
                  {fieldProps.map((field) => (
                    <div>
                      {(field.value === 'name' || field.value === 'notes' || field.value === 'date')
                      && (
                        <>
                          <TextField
                            id="outlined-basic"
                            label={field.label}
                            variant="outlined"
                            value={jobFairObject[field.value]}
                            focused
                            onChange={(e) => editJobFair(e, field.value, index)}
                            InputProps={textFieldStyles.inputProps}
                            InputLabelProps={textFieldStyles.labelProps}
                            className="input-field"
                          />
                          <div className="op-between-inputs" />
                        </>
                      )}
                      {(field.value === 'attended')
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
                    </div>
                  ))}
                </div>
              </form>
            </div>
            <div>
              <button type="button" onClick={(e) => deleteJobFair(e, index)} className="op-delete-button">
                <img
                  src={Delete}
                  alt="delete icon"
                  style={{ marginRight: '12px' }}
                />
                Delete Job Fair
              </button>
            </div>
            <div className="tp-between-buttons" />
          </div>
        ))}
      </div>
      <div>
        <button type="button" onClick={addJobFair} className="op-add-button">
          <img
            src={Add}
            alt="add icon"
            style={{ marginRight: '12px' }}
          />
          Add Job Fair
        </button>
      </div>

    </div>
  );
}

export default JobFairs;

JobFairs.propTypes = {
  jobseeker: propTypes.shape({
    jobFairs:
    {
      name: propTypes.string.isRequired,
      date: propTypes.string.isRequired,
      attended: propTypes.bool.isRequired,
      notes: propTypes.string.isRequired,
    },
  }).isRequired,
  setJobseeker: propTypes.func.isRequired,
};
