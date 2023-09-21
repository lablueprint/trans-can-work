import React, { useState, useEffect } from 'react';
import './Internships.css';
import propTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function Internships({ jobseeker, setJobseeker }) {
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
  const [allInternships, setAllInternships] = useState([]);

  useEffect(() => {
    setAllInternships(jobseeker.internships);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      setJobseeker({
        ...jobseeker,
        internships: allInternships,
      });
    }
  }, [allInternships]);

  const addInternship = async (event) => {
    event.preventDefault();
    const temp = {
      company: '',
      program: '',
      position: '',
      start: '',
      end: '',
      referralDate: '',
      applied: false,
      accepted: false,
      completed: false,
      notes: '',
    };
    await setAllInternships([...allInternships, temp]);
  };

  const deleteInternship = async (event, index) => {
    event.preventDefault();
    const temp = [...allInternships];
    temp.splice(index, 1);
    await setAllInternships(temp);
  };

  const editInternship = (event, element, index) => {
    event.preventDefault();
    const temp = [...allInternships];
    temp[index][element] = event.target.value;
    setAllInternships(temp);
  };

  const editDropdown = (event, label, index) => {
    event.preventDefault();
    let val = true;
    if (event.target.value === 'No') {
      val = false;
    }
    const temp = [...allInternships];
    temp[index][label] = val;
    setAllInternships(temp);
  };

  const fieldProps = [
    { label: 'Company/Org of Internship', value: 'company' },
    { label: 'Program Name', value: 'program' },
    { label: 'Position', value: 'position' },
    { label: 'Start Date', value: 'start' },
    { label: 'End Date', value: 'end' },
    { label: 'Date Referral Sent (If Applicable)', value: 'referralDate' },
    { label: 'Did Client Apply for position? (If Applicable)', value: 'applied' },
    { label: 'Client Officially Accepted into internship?', value: 'accepted' },
    { label: 'Client Successfully Completed Internship?', value: 'completed' },
    { label: 'Notes', value: 'notes' },
  ];

  return (
    <div className="content">
      <div className="i-title">Internships</div>
      <div>
        {allInternships.map((internshipObject, index) => (
          <div>
            <div>
              <form>
                <div>
                  {fieldProps.map((field) => (
                    <div>
                      {(field.label === 'Company/Org of Internship' || field.label === 'Program Name'
                      || field.label === 'Position' || field.label === 'Notes'
                      || field.label === 'Start Date' || field.label === 'End Date'
                      || field.label === 'Date Referral Sent (If Applicable)')
                      && (
                        <>
                          <TextField
                            id="outlined-basic"
                            placeholder={field.label}
                            label={field.label}
                            variant="outlined"
                            value={internshipObject[field.value]}
                            focused
                            onChange={(e) => editInternship(e, field.value, index)}
                            InputProps={textFieldStyles.inputProps}
                            InputLabelProps={textFieldStyles.labelProps}
                            className="input-field"
                          />
                          <div className="op-between-inputs" />
                        </>
                      )}
                      {(field.label === 'Did Client Apply for position? (If Applicable)' || field.label === 'Client Officially Accepted into internship?'
                      || field.label === 'Client Successfully Completed Internship?')
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
              <button type="button" onClick={(e) => deleteInternship(e, index)} className="i-delete-button">
                <img
                  src={Delete}
                  alt="delete icon"
                  style={{ marginRight: '12px' }}
                />
                Delete Internship
              </button>
            </div>
            <div className="i-between-buttons" />
          </div>
        ))}
        <div>
          <button type="button" onClick={addInternship} className="i-add-button">
            <img
              src={Add}
              alt="add icon"
              style={{ marginRight: '12px' }}
            />
            Add Internship
          </button>
        </div>
      </div>

    </div>
  );
}

export default Internships;

Internships.propTypes = {
  jobseeker: propTypes.shape({
    internships:
    {
      company: propTypes.string.isRequired,
      program: propTypes.string.isRequired,
      position: propTypes.string.isRequired,
      start: propTypes.instanceOf(Date),
      end: propTypes.instanceOf(Date),
      referralDate: propTypes.instanceOf(Date),
      applied: propTypes.bool.isRequired,
      accepted: propTypes.bool.isRequired,
      completed: propTypes.bool.isRequired,
      notes: propTypes.string.isRequired,
    },
  }).isRequired,
  setJobseeker: propTypes.func.isRequired,
};
