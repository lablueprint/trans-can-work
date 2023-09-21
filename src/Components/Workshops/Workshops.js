import React, { useState, useEffect } from 'react';
import './Workshops.css';
import propTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import {
  FormControl, InputLabel,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function Workshops({ jobseeker, setJobseeker }) {
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
  const [allWorkshops, setAllWorkshops] = useState([{}]);

  useEffect(() => {
    setAllWorkshops(jobseeker.workshops);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      setJobseeker({
        ...jobseeker,
        workshops: allWorkshops,
      });
    }
  }, [allWorkshops]);

  const addWorkshop = async (event) => {
    event.preventDefault();
    const temp = {
      name: '',
      date: '',
      attended: false,
      notes: '',
    };
    await setAllWorkshops([...allWorkshops, temp]);
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

  const fieldProps = [
    { label: 'Workshop', value: 'name' },
    { label: 'Date of Workshop', value: 'date' },
    { label: 'Attended Workshop?', value: 'attended' },
    { label: 'Notes', value: 'notes' },
  ];

  return (
    <div className="content">
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
                      {(field.label === 'Workshop' || field.label === 'Notes'
                      || field.label === 'Date of Workshop')
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
                              onChange={(e) => editDropdown(e, index)}
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
      <div>
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

Workshops.propTypes = {
  jobseeker: propTypes.shape({
    workshops:
    {
      name: propTypes.string.isRequired,
      date: propTypes.string.isRequired,
      attended: propTypes.bool.isRequired,
      notes: propTypes.string.isRequired,
    },
  }).isRequired,
  setJobseeker: propTypes.func.isRequired,
};
