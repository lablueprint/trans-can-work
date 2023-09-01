import React, { useState } from 'react';
import './TrainingPrograms.css';
import { TextField } from '@material-ui/core';
import { DateField } from '@mui/x-date-pickers/DateField';
import {
  FormControl, InputLabel, NativeSelect,
} from '@mui/material';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

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

function TrainingPrograms() {
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
    { label: 'Date Completed Training', value: 'completed' },
    { label: 'Notes', value: 'notes' },
  ];

  const [allPrograms, setAllPrograms] = useState([{
    program: '',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: '',
    notes: '',
  }]);

  const addProgram = async (event) => {
    event.preventDefault();
    const temp = {
      program: '',
      referral: '',
      start: '',
      enrolled: '',
      end: '',
      completed: '',
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
  };

  const editDate = (newValue, label, index) => {
    console.log(newValue);
    const temp = [...allPrograms];
    temp[index][label] = newValue;
    setAllPrograms(temp);
    console.log(allPrograms);
  };

  return (
    <div className="content">
      <div className="tp-title">Training Programs</div>
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
                          <div>
                            <FormControl style={styles.formControl}>
                              <InputLabel style={styles.inputLabel}>
                                Degree?
                              </InputLabel>
                              <NativeSelect
                                defaultValue="No"
                                style={styles.dropdownOptions}
                        // onChange={(e) => editEducation(e, 'degree', index)}
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
                          </div>
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
                            value={programObject[field.value]}
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
