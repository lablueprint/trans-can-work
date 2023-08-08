import React, { useState } from 'react';
import './Workshops.css';
import { TextField } from '@material-ui/core';
import { DateField } from '@mui/x-date-pickers/DateField';
import {
  FormControl, InputLabel, NativeSelect,
} from '@mui/material';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function Workshops() {
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
  const [allWorkshops, setAllWorkshops] = useState([{
    name: '',
    date: '',
    attended: false,
    notes: '',
  }]);

  const addWorkshop = async (event) => {
    event.preventDefault();
    const temp = {
      name: '',
      date: '',
      attended: false,
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

  const editDropdown = (event, index) => {
    event.preventDefault();
    let val = true;
    if (event.target.value === 'No') {
      val = false;
    }
    const temp = [...allWorkshops];
    temp[index].attended = val;
    setAllWorkshops(temp);
  };

  const editDate = (newValue, index) => {
    console.log(newValue);
    const temp = [...allWorkshops];
    temp[index].date = newValue;
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
                      {(field.label === 'Workshop' || field.label === 'Notes')
                      && (
                        <>
                          <TextField
                            id="outlined-basic"
                            label={field.label}
                            placeholder={field.label}
                            variant="outlined"
                            value={workshopObject[field.value]}
                            focused
                            onChange={(e) => editWorkshop(e, field.value, index)}
                            InputProps={textFieldStyles.inputProps}
                            InputLabelProps={textFieldStyles.labelProps}
                            className="input-field"
                          />
                          <div className="op-between-inputs" />
                        </>
                      )}
                      {(field.label === 'Attended Workshop?')
                      && (
                        <>
                          <FormControl style={styles.formControl}>
                            <InputLabel style={styles.inputLabel}>
                              Attended Workshop?
                            </InputLabel>
                            <NativeSelect
                              defaultValue="No"
                              style={styles.dropdownOptions}
                              onChange={(e) => editDropdown(e, index)}
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
                          <div className="op-between-inputs" />
                        </>
                      )}
                      {(field.label === 'Date of Workshop')
                      && (
                        <>
                          <DateField
                            label={field.label}
                            focused
                            value={workshopObject.date}
                            onChange={(newValue) => editDate(newValue, index)}
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
