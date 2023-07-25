import React, { useState } from 'react';
import './Workshops.css';
import { TextField } from '@material-ui/core';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function Workshops() {
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
  const [allWorkshops, setAllWorkshops] = useState([{
    name: '',
    date: '',
    attended: '',
    notes: '',
  }]);

  const addWorkshop = async (event) => {
    event.preventDefault();
    const temp = {
      name: '',
      date: '',
      attended: '',
      notes: '',
    };
    await setAllWorkshops([...allWorkshops, temp]);
    console.log(allWorkshops);
  };

  const deleteWorkshop = async (event, index) => {
    event.preventDefault();
    const temp = [...allWorkshops];
    temp.splice(index, 1);
    await setAllWorkshops(temp);
  };

  const editWorkshop = (event, element, index) => {
    event.preventDefault();
    const temp = [...allWorkshops];
    temp[index][element] = event.target.value;
    setAllWorkshops(temp);
    console.log(allWorkshops);
  };

  const fieldProps = [
    { label: 'Workshop', value: 'name' },
    { label: 'Date of Workshop', value: 'date' },
    { label: 'Attended Workshop?', value: 'attended' },
    { label: 'Notes', value: 'notes' },
  ];

  return (
    <div>
      <div className="temp" />
      <div className="tp-title">Workshops</div>
      <div className="between-inputs" />
      <div>
        {allWorkshops.map((workshopObject, index) => (
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
                        value={workshopObject[field.value]}
                        focused
                        onChange={(e) => editWorkshop(e, field.value, index)}
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
              <button type="button" onClick={(e) => deleteWorkshop(e, index)} className="op-delete-button">
                <img
                  src={Delete}
                  alt="delete icon"
                  style={{ marginRight: '12px' }}
                />
                Delete Workshop
              </button>
            </div>
            <div className="tp-between-buttons" />
          </div>
        ))}
      </div>
      <div className="width-55vw">
        <button type="button" onClick={addWorkshop} className="op-add-button">
          <img
            src={Add}
            alt="add icon"
            style={{ marginRight: '12px' }}
          />
          Add Workshop
        </button>
      </div>

    </div>
  );
}

export default Workshops;
