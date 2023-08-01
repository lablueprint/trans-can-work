import React, { useState } from 'react';
import './TrainingPrograms.css';
import { TextField } from '@material-ui/core';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

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

  const fieldProps = [
    { label: 'Company/Org of Internship', value: 'program' },
    { label: 'Date Referral Sent', value: 'referral' },
    { label: 'Start Date', value: 'start' },
    { label: 'Date Officially Enrolled', value: 'enrolled' },
    { label: 'End Date', value: 'end' },
    { label: 'Date Completed Training', value: 'completed' },
    { label: 'Notes', value: 'notes' },
  ];

  return (
    <div>
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
                      <TextField
                        id="outlined-basic"
                        label={field.label}
                        variant="outlined"
                        value={programObject[field.value]}
                        focused
                        onChange={(e) => editProgram(e, field.value, index)}
                        InputProps={textFieldStyles.inputProps}
                        InputLabelProps={textFieldStyles.labelProps}
                      />
                      <div className="op-between-inputs" />
                    </div>
                  ))}
                </div>
              </form>
            </div>
            <div className="width-55vw">
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
      <div className="width-55vw">
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
