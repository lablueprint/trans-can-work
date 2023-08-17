import React, { useState } from 'react';
import './Internships.css';
import { TextField } from '@material-ui/core';
import { DateField } from '@mui/x-date-pickers/DateField';
import {
  FormControl, InputLabel, NativeSelect,
} from '@mui/material';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function Internships() {
  const styles = {
    dropdownOptions: {
      fontFamily: 'Montserrat',
      color: '#49454F',
      fontSize: '0.9vw',
      fontWeight: 'bold',
      border: '1px solid #000AA0',
      borderRadius: '4px',
      width: '55.0vw',
      height: '3.2vw',
      paddingLeft: '1.7%',
      textDecoration: 'none',
      backgroundColor: '#F7F8FE',
    },
    inputLabel: {
      borderBottom: 'none',
      color: '#0c0ca4',
      fontFamily: 'Montserrat',
      fontWeight: 'normal',
      fontSize: '0.9vw',
      marginTop: '2%',
      textAlign: 'left',
      backgroundColor: 'white',
      paddingLeft: '1%',
      paddingRight: '1%',
      textDecoration: 'none',
    },
    formControl: {
      width: '55.0vw',
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

  const [allInternships, setAllInternships] = useState([{
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
  }]);

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
    console.log(allInternships);
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

  const editDate = (newValue, label, index) => {
    console.log(newValue);
    const temp = [...allInternships];
    temp[index][label] = newValue;
    setAllInternships(temp);
    console.log(allInternships);
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
    <div>
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
                      || field.label === 'Position' || field.label === 'Notes')
                      && (
                        <>
                          <TextField
                            id="outlined-basic"
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
                          <FormControl style={styles.formControl}>
                            <InputLabel style={styles.inputLabel}>
                              {field.label}
                            </InputLabel>
                            <NativeSelect
                              defaultValue="No"
                              style={styles.dropdownOptions}
                              onChange={(e) => editDropdown(e, field.value, index)}
                              menuprops={{
                                PaperProps: {
                                  style: styles.purpleBackground,
                                },
                              }}
                            >
                              <option value="Yes" className="dropit">Yes</option>
                              <option value="No" className="dropit">No</option>
                            </NativeSelect>
                          </FormControl>
                          {(field.label === 'Client Successfully Completed Internship?')
                      && (
                      <div className="op-between-inputs" />
                      )}
                        </>
                      )}
                      {(field.label === 'Start Date' || field.label === 'End Date'
                      || field.label === 'Date Referral Sent (If Applicable)')
                      && (
                        <>
                          <DateField
                            label={field.label}
                            focused
                            value={internshipObject[field.value]}
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
            <div className="width-55vw">
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
        <div className="width-55vw">
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
