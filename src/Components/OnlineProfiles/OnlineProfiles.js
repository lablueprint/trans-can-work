import React, { useState } from 'react';
import './OnlineProfiles.css';
import { TextField } from '@material-ui/core';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function OnlineProfiles() {
  const textFieldStyles = {
    inputProps: {
      style: {
        fontFamily: 'Montserrat',
        color: '#49454F',
        width: '55.0vw',
        height: '3.2vw',
        fontSize: '0.9vw',
        fontWeight: 'bold',
        borderColor: 'red',
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

  const [profile, setProfile] = useState([{
    website: '',
    tools: '',
    created: '',
    notes: '',
  }]);

  const addOnlineProfile = async (event) => {
    event.preventDefault();
    const temp = {
      website: '',
      tools: '',
      created: '',
      notes: '',
    };
    await setProfile([...profile, temp]);
  };

  const deleteOnlineProfile = async (event, index) => {
    event.preventDefault();
    const temp = [...profile];
    temp.splice(index, 1);
    await setProfile(temp);
  };

  const editOnlineProfile = (event, element, index) => {
    event.preventDefault();
    const temp = [...profile];
    temp[index][element] = event.target.value;
    setProfile(temp);
  };

  const fieldProps = [
    { label: 'Company/Org of Internship', value: 'site' },
    { label: 'Username', value: 'username' },
    { label: 'Tools This Site Provides', value: 'tools' },
    { label: 'Created an Account?', value: 'created' },
    { label: 'Notes', value: 'notes' },
  ];

  return (
    <div className="content">
      <div className="op-title">Online Employment Profiles</div>
      <div>
        {profile.map((profileObject, index) => (
          <div>
            <div className="inputWrapper">
              <form>
                <div>
                  {fieldProps.map((field) => (
                    <div>
                      <TextField
                        id="outlined-basic"
                        label={field.label}
                        variant="outlined"
                        value={profileObject[field.value]}
                        focused
                        onChange={(e) => editOnlineProfile(e, field.value, index)}
                        InputProps={textFieldStyles.inputProps}
                        InputLabelProps={textFieldStyles.labelProps}
                        className="input-field"
                      />
                      <div className="op-between-inputs" />
                    </div>
                  ))}
                </div>
              </form>
            </div>
            <div>
              <button type="button" onClick={(e) => deleteOnlineProfile(e, index)} className="op-delete-button">
                <img
                  src={Delete}
                  alt="delete icon"
                  style={{ marginRight: '12px' }}
                />
                Delete Profile
              </button>
            </div>
            <div className="op-between-buttons" />
          </div>
        ))}
        <div>
          <button type="button" onClick={addOnlineProfile} className="op-add-button">
            <img
              src={Add}
              alt="add icon"
              style={{ marginRight: '12px' }}
            />
            Add Profile
          </button>
        </div>
      </div>

    </div>
  );
}

export default OnlineProfiles;
