import React, { useState } from 'react';
import './Resources.css';
import { TextField } from '@material-ui/core';
import Checkboxes from '../Checkboxes/Checkboxes';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function Resources() {
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

  const resources1 = [
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
  ];

  const resources2 = [
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

  const [checkedRes1,
    setCheckedRes1] = useState(new Array(resources1.length).fill(false));
  const [checkedRes2,
    setCheckedRes2] = useState(new Array(resources2.length).fill(false));

  const [trackedResources, setTrackedResources] = useState([{
    type: '',
    source: '',
    notes: '',
  }]);

  const addTrackedResource = async (event) => {
    event.preventDefault();
    const temp = {
      type: '',
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
    console.log(checkedRes1);
    console.log(checkedRes2);
  };

  const fieldProps = [
    { label: 'Type of Resource', value: 'type' },
    { label: 'Source of that Resource', value: 'source' },
    { label: 'Notes', value: 'notes' },
  ];

  return (
    <div>
      <div className="temp" />
      <div className="resources-tracker-title">Resources Tracker</div>
      <div className="resources-columns-container">
        <div className="checkboxes-column-left">
          <Checkboxes
            skills={resources1}
            checkedArr={checkedRes1}
            setCheckedArr={setCheckedRes1}
          />
        </div>
        <div className="checkboxes-column-right">
          <Checkboxes
            skills={resources2}
            checkedArr={checkedRes2}
            setCheckedArr={setCheckedRes2}
          />
        </div>
      </div>
      <div className="temp" />
      <div className="i-title">Resources Tracker</div>
      <div>
        {trackedResources.map((resourceObject, index) => (
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
                        value={resourceObject[field.value]}
                        focused
                        onChange={(e) => editTrackedResource(e, field.value, index)}
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
        <div className="width-55vw">
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
