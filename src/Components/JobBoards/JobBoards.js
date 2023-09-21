import React, { useState, useEffect } from 'react';
import './JobBoards.css';
import propTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function JobBoards({ jobseeker, setJobseeker }) {
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
        width: '55.0vw',
        height: '3.2vw',
        fontSize: '0.9vw',
        fontWeight: 'bold',
        backgroundColor: '#F7F8FE',
      },
    },
    labelProps: {
      style: {
        fontFamily: 'Montserrat',
        fontSize: '0.95vw',
        color: '#000AA0',
      },
    },
  };

  const [loaded, setLoaded] = useState(false);
  const [jobBoards, setJobBoards] = useState();

  useEffect(() => {
    if (jobseeker !== undefined) {
      if (!jobseeker.jobBoards.length) {
        setJobBoards([{}]);
      } else {
        setJobBoards(jobseeker.jobBoards);
      }
    }
  }, []);

  useEffect(() => {
    if (jobBoards !== undefined) {
      setLoaded(true);
    }
  }, [jobBoards]);

  useEffect(() => {
    if (loaded) {
      setJobseeker({
        ...jobseeker,
        jobPortals: jobBoards,
      });
    }
  }, [jobBoards]);

  const addJobBoard = async (event) => {
    event.preventDefault();
    const temp = {
      name: '',
      profile: false,
      admitted: false,
      notes: '',
    };
    await setJobBoards([...jobBoards, temp]);
  };

  const deleteJobBoard = async (event, index) => {
    event.preventDefault();
    const temp = [...jobBoards];
    temp.splice(index, 1);
    await setJobBoards(temp);
  };

  const editJobBoard = (event, element, index) => {
    event.preventDefault();
    const temp = [...jobBoards];
    temp[index][element] = event.target.value;
    setJobBoards(temp);
  };

  const editDropdown = (event, label, index) => {
    event.preventDefault();
    let val = true;
    if (event.target.value === 'No') {
      val = false;
    }
    const temp = [...jobBoards];
    temp[index][label] = val;
    setJobBoards(temp);
  };

  const fieldProps = [
    { label: 'Name of Job Board', value: 'name' },
    { label: 'Created Profile?', value: 'profile' },
    { label: 'Admitted into Job Board?', value: 'admitted' },
    { label: 'Notes', value: 'notes' },
  ];

  if (jobBoards === undefined) {
    return <div>Loading</div>;
  }

  return (
    <div className="content">
      <div className="tp-title">Job Boards</div>
      <div className="between-inputs" />
      <div>
        {jobBoards.map((jobBoardObject, index) => (
          <div>
            <div>
              <form>
                <div>
                  {fieldProps.map((field) => (
                    <div>
                      {(field.value === 'name' || field.value === 'notes')
                      && (
                      <>
                        <TextField
                          id="outlined-basic"
                          label={field.label}
                          variant="outlined"
                          value={jobBoardObject[field.value]}
                          focused
                          onChange={(e) => editJobBoard(e, field.value, index)}
                          InputProps={textFieldStyles.inputProps}
                          InputLabelProps={textFieldStyles.labelProps}
                          className="input-field"
                          placeholder={field.label}
                        />
                        <div className="op-between-inputs" />
                      </>
                      )}
                      {(field.value === 'profile' || field.value === 'admitted')
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
              <button type="button" onClick={(e) => deleteJobBoard(e, index)} className="op-delete-button">
                <img
                  src={Delete}
                  alt="delete icon"
                  style={{ marginRight: '12px' }}
                />
                Delete Job Board
              </button>
            </div>
            <div className="tp-between-buttons" />
          </div>
        ))}
      </div>
      <div>
        <button type="button" onClick={addJobBoard} className="op-add-button">
          <img
            src={Add}
            alt="add icon"
            style={{ marginRight: '12px' }}
          />
          Add Job Board
        </button>
      </div>

    </div>
  );
}

export default JobBoards;

JobBoards.propTypes = {
  jobseeker: propTypes.shape({
    jobBoards:
    {
      name: propTypes.string.isRequired,
      date: propTypes.string.isRequired,
      attended: propTypes.bool.isRequired,
      notes: propTypes.string.isRequired,
    },
  }).isRequired,
  setJobseeker: propTypes.func.isRequired,
};
