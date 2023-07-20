import React, { useState } from 'react';
import './HiredInfo.css';
import { TextField } from '@material-ui/core';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function HiredInfo() {
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

  const [allHiredInfo, setAllHiredInfo] = useState([{
    company: '',
    program: '',
    position: '',
    start: '',
    end: '',
    referralDate: '',
    applied: '',
    accepted: '',
    completed: '',
    notes: '',
  }]);

  const addHiredInfo = async (event) => {
    event.preventDefault();
    const temp = {
      company: '',
      program: '',
      position: '',
      start: '',
      end: '',
      referralDate: '',
      applied: '',
      accepted: '',
      completed: '',
      notes: '',
    };
    await setAllHiredInfo([...allHiredInfo, temp]);
  };

  const deleteHiredInfo = async (event, index) => {
    event.preventDefault();
    const temp = [...allHiredInfo];
    temp.splice(index, 1);
    await setAllHiredInfo(temp);
  };

  const editHiredInfo = (event, element, index) => {
    event.preventDefault();
    const temp = [...allHiredInfo];
    temp[index][element] = event.target.value;
    setAllHiredInfo(temp);
    console.log(allHiredInfo);
  };

  const fieldProps = [
    { label: 'Name of Company', value: 'company' },
    { label: 'Hired Date', value: 'date' },
    { label: 'Field of Work', value: 'field' },
    { label: 'Job Title', value: 'title' },
    { label: 'Supervisor Name', value: 'supervisor' },
    { label: 'Contact Email', value: 'email' },
    { label: 'Contact Phone Number', value: 'phone' },
    { label: 'Hourly Pay', value: 'pay' },
    { label: 'Offers Benefits?', value: 'benefits' },
  ];

  return (
    <div>
      <div className="temp" />
      <div className="i-title">Hired Info</div>
      <div>
        {allHiredInfo.map((internshipObject, index) => (
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
                        value={internshipObject[field.value]}
                        focused
                        onChange={(e) => editHiredInfo(e, field.changeParameter, index)}
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
              <button type="button" onClick={(e) => deleteHiredInfo(e, index)} className="i-delete-button">
                <img
                  src={Delete}
                  alt="delete icon"
                  style={{ marginRight: '12px' }}
                />
                Delete Section
              </button>
            </div>
            <div className="i-between-buttons" />
          </div>
        ))}
        <div className="width-55vw">
          <button type="button" onClick={addHiredInfo} className="i-add-button">
            <img
              src={Add}
              alt="add icon"
              style={{ marginRight: '12px' }}
            />
            Add Section
          </button>
        </div>
      </div>

    </div>
  );
}

export default HiredInfo;
