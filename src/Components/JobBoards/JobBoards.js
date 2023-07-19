import React, { useState } from 'react';
import './JobBoards.css';
import { TextField } from '@material-ui/core';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function JobBoards() {
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
  const [jobBoards, setJobBoards] = useState([{
    name: '',
    profile: '',
    admitted: '',
    notes: '',
  }]);

  const addJobBoard = async (event) => {
    event.preventDefault();
    const temp = {
      name: '',
      profile: '',
      admitted: '',
      notes: '',
    };
    await setJobBoards([...jobBoards, temp]);
    console.log(jobBoards);
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
    console.log(jobBoards);
  };

  const fieldProps = [
    { label: 'Name of Job Board', value: 'name' },
    { label: 'Created Profile?', value: 'profile' },
    { label: 'Admitted into Job Board?', value: 'admitted' },
    { label: 'Notes', value: 'notes' },
  ];

  return (
    <div>
      <div className="temp" />
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
                      <TextField
                        id="outlined-basic"
                        label={field.label}
                        variant="outlined"
                        value={jobBoardObject[field.value]}
                        focused
                        onChange={(e) => editJobBoard(e, field.value, index)}
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
      <div className="width-55vw">
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
