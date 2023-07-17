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

  return (
    <div>
      <div className="temp" />
      <div className="tp-title">Training Programs</div>
      <div className="between-inputs" />
      <div>
        {allPrograms.map((programObject, index) => (
          <div>
            <div>
              <form>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Training Program"
                    variant="outlined"
                    value={programObject.program}
                    focused
                    onChange={(e) => editProgram(e, 'program', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="tp-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Date Referral Sent"
                    variant="outlined"
                    value={programObject.referral}
                    focused
                    onChange={(e) => editProgram(e, 'referral', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="tp-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Start Date"
                    variant="outlined"
                    value={programObject.start}
                    focused
                    onChange={(e) => editProgram(e, 'start', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="tp-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Date Officially Enrolled"
                    variant="outlined"
                    value={programObject.enrolled}
                    focused
                    onChange={(e) => editProgram(e, 'enrolled', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="tp-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="End Date"
                    variant="outlined"
                    value={programObject.end}
                    focused
                    onChange={(e) => editProgram(e, 'end', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="tp-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Date Completed Training"
                    variant="outlined"
                    value={programObject.completed}
                    focused
                    onChange={(e) => editProgram(e, 'completed', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="tp-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Notes"
                    variant="outlined"
                    value={programObject.notes}
                    focused
                    onChange={(e) => editProgram(e, 'notes', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="tp-between-inputs" />
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
