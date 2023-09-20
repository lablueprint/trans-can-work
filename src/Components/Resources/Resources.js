import React, { useEffect, useState } from 'react';
import './Resources.css';
import propTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function Resources({ jobseeker, setJobseeker }) {
  const styles = {
    dropdownOptions: {
      fontFamily: 'Montserrat',
      color: '#49454F',
      fontSize: '1rem',
      fontWeight: 'bold',
      paddingLeft: '1.7%',
      textDecoration: 'none',
    },
    dropdownDefault: {
      fontFamily: 'Montserrat',
      color: 'light grey',
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

  const resourcesList = [
    'Clothes',
    'Credit for Public Transit',
    'Eviction',
    'Food',
    'Housing Referral',
    'Legal Advice',
    'Mental Health',
    'Navigating Public Assistance',
    'Re-Entry Services',
    'Showers',
    'COVID Supplies',
    'Domestic Violence',
    'Financial Aid Support',
    'Gender Change',
    'Housing Voucher',
    'Make Up',
    'Name Change',
    'Recovery Services',
    'Shelter',
    'Support Groups',
  ];

  const [loaded, setLoaded] = useState(false);
  const [trackedResources, setTrackedResources] = useState([{}]);

  useEffect(() => {
    setTrackedResources(jobseeker.resources);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      setJobseeker({
        ...jobseeker,
        resources: trackedResources,
      });
    }
  }, [trackedResources]);

  const addTrackedResource = async (event) => {
    event.preventDefault();
    const temp = {
      type: 'Select Resource',
      source: '',
      notes: '',
    };
    await setTrackedResources([...trackedResources, temp]);
  };

  const deleteTrackedResource = async (event, index) => {
    event.preventDefault();
    const temp = [...trackedResources];
    temp.splice(index, 1);
    await setTrackedResources(temp);
  };

  const editTrackedResource = (event, element, index) => {
    event.preventDefault();
    const temp = [...trackedResources];
    temp[index][element] = event.target.value;
    setTrackedResources(temp);
  };

  useEffect(() => {
    console.log(trackedResources);
  }, [trackedResources]);

  const fieldProps = [
    { label: 'Type of Resource', value: 'type' },
    { label: 'Source of Resource', value: 'source' },
    { label: 'Notes', value: 'notes' },
  ];

  return (
    <div className="content">
      <div className="i-title">Resources Tracker</div>
      <div>
        {trackedResources.map((resourceObject, index) => (
          <div>
            <div>
              <form>
                <div>
                  {fieldProps.map((field) => (
                    <div>
                      {(field.value === 'type')
                      && (
                        <>
                          <FormControl
                            fullWidth
                            focused
                            style={styles.formControl}
                          >
                            <InputLabel id="demo-simple-select-label">{field.label}</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              label={field.label}
                              onChange={(e) => editTrackedResource(e, field.value, index)}
                              style={styles.inputLabel}
                              value={resourceObject.type}
                            >
                              <MenuItem value="Select Resource" style={styles.dropdownDefault}>
                                <em>Select Resource</em>
                              </MenuItem>
                              {resourcesList.map((resource) => (
                                <MenuItem value={resource} style={styles.dropdownOptions}>
                                  {resource}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <div className="op-between-inputs" />
                        </>
                      )}
                      {(field.value === 'source' || field.value === 'notes')
                      && (
                        <>
                          <TextField
                            id="outlined-basic"
                            placeholder={field.label}
                            label={field.label}
                            variant="outlined"
                            value={resourceObject[field.value]}
                            focused
                            onChange={(e) => editTrackedResource(e, field.value, index)}
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
              <button type="button" onClick={(e) => deleteTrackedResource(e, index)} className="i-delete-button">
                <img
                  src={Delete}
                  alt="delete icon"
                  style={{ marginRight: '12px' }}
                />
                Delete Resource
              </button>
            </div>
            <div className="i-between-buttons" />
          </div>
        ))}
        <div>
          <button type="button" onClick={addTrackedResource} className="i-add-button">
            <img
              src={Add}
              alt="add icon"
              style={{ marginRight: '12px' }}
            />
            Add Resource
          </button>
        </div>
      </div>

    </div>
  );
}

export default Resources;

Resources.propTypes = {
  jobseeker: propTypes.shape({
    resources:
    {
      type: propTypes.string.isRequired,
      source: propTypes.string.isRequired,
      notes: propTypes.string.isRequired,
    },
  }).isRequired,
  setJobseeker: propTypes.func.isRequired,
};
