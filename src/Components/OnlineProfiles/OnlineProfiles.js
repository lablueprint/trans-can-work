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

  return (
    <div>
      <div className="temp" />
      <div className="op-title">Online Employment Profiles</div>
      <div>
        {profile.map((profileObject, index) => (
          <div>
            <div>
              <form>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Website"
                    variant="outlined"
                    value={profileObject.website}
                    focused
                    onChange={(e) => editOnlineProfile(e, 'website', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                    className="input-field"
                  />
                  <div className="op-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Tools This Site Provides"
                    variant="outlined"
                    value={profileObject.tools}
                    focused
                    onChange={(e) => editOnlineProfile(e, 'tools', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                    className="input-field"
                  />
                  <div className="op-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Created an Account?"
                    variant="outlined"
                    value={profileObject.created}
                    focused
                    onChange={(e) => editOnlineProfile(e, 'created', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                    className="input-field"
                  />
                  <div className="op-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Notes"
                    variant="outlined"
                    value={profileObject.notes}
                    focused
                    onChange={(e) => editOnlineProfile(e, 'notes', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                    className="input-field"
                  />
                  <div className="op-between-inputs" />
                </div>
              </form>
            </div>
            <div className="width-55vw">
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
        <div className="width-55vw">
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
