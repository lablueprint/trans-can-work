import React, { useState } from 'react';
import './JobFairs.css';
import { TextField } from '@material-ui/core';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function JobFairs() {
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
        borderWidth: '1px',
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
  const [jobFairs, setJobFairs] = useState([{
    name: '',
    date: '',
    attended: '',
    notes: '',
  }]);

  const addJobFair = async (event) => {
    event.preventDefault();
    const temp = {
      name: '',
      date: '',
      attended: '',
      notes: '',
    };
    await setJobFairs([...jobFairs, temp]);
    console.log(jobFairs);
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
    console.log(jobFairs);
  };

  const fieldProps = [
    { label: 'Job Fair', value: 'name' },
    { label: 'Date of Job Fair', value: 'date' },
    { label: 'Attended Job Fair?', value: 'attended' },
    { label: 'Notes', value: 'notes' },
  ];

  return (
    <div>
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
                      <TextField
                        id="outlined-basic"
                        label={field.label}
                        variant="outlined"
                        value={jobFairObject[field.value]}
                        focused
                        onChange={(e) => editJobFair(e, field.value, index)}
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
      <div className="width-55vw">
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
