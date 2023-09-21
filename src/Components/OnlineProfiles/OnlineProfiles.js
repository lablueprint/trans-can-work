import React, { useEffect, useState } from 'react';
import './OnlineProfiles.css';
import propTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Add from '../../Assets/add.svg';
import Check from '../../Assets/Images/check.png';
import Cancel from '../../Assets/Images/cancel.png';
import Delete from '../../Assets/delete.svg';

function OnlineProfiles({ jobseeker, setJobseeker }) {
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
  const [profile, setProfile] = useState(undefined);

  useEffect(() => {
    if (jobseeker !== undefined) {
      if (!jobseeker.onlineProfiles.length) {
        setProfile([]);
      } else {
        setProfile(jobseeker.onlineProfiles);
      }
    }
  }, []);

  useEffect(() => {
    if (profile !== undefined) {
      setLoaded(true);
    }
  }, [profile]);

  useEffect(() => {
    if (loaded) {
      setJobseeker({
        ...jobseeker,
        onlineProfiles: profile,
      });
    }
  }, [loaded]);

  const addOnlineProfile = async (event) => {
    event.preventDefault();
    const temp = {
      site: '',
      username: '',
      tools: '',
      created: false,
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

  const editDropdown = (event, label, index) => {
    event.preventDefault();
    let val = true;
    if (event.target.value === 'No') {
      val = false;
    }
    const temp = [...profile];
    temp[index][label] = val;
    setProfile(temp);
  };

  const fieldProps = [
    { label: 'Site Name', value: 'site' },
    { label: 'Username', value: 'username' },
    { label: 'Tools This Site Provides', value: 'tools' },
    { label: 'Created an Account?', value: 'created' },
    { label: 'Notes', value: 'notes' },
  ];

  if (profile === undefined) {
    return <div>Loading</div>;
  }

  return (
    <div className="content">
      <div className="op-title">Online Employment Profiles</div>
      <div className="alert-modal">
        <p>Jobseeker-Name has marked Online Profiles as complete! Approve changes?</p>
        <div className="actions">
          <button type="button" className="approve-button">
            <img
              src={Check}
              alt="check icon"
              style={{ marginRight: '12px' }}
            />
            Approve
          </button>
          <button type="button" className="deny-button">
            <img
              src={Cancel}
              alt="cancel icon"
              style={{ marginRight: '12px' }}
            />
            Deny
          </button>
        </div>
      </div>
      <div>
        {profile.map((profileObject, index) => (
          <div>
            <div className="inputWrapper">
              <form>
                <div>
                  {fieldProps.map((field) => (
                    <div>
                      {(field.value === 'site' || field.value === 'notes'
                      || field.value === 'username' || field.value === 'tools')
                      && (
                      <>
                        <TextField
                          id="outlined-basic"
                          placeholder={field.label}
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
                      </>
                      )}
                      {(field.value === 'created')
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
                              onChange={(e) => editDropdown(e, field.value, index)}
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

OnlineProfiles.propTypes = {
  jobseeker: propTypes.shape({
    onlineProfiles:
    {
      site: propTypes.string.isRequired,
      username: propTypes.string.isRequired,
      tools: propTypes.string.isRequired,
      created: propTypes.bool.isRequired,
      notes: propTypes.string.isRequired,
    },
  }).isRequired,
  setJobseeker: propTypes.func.isRequired,
};
