import React, { useState } from 'react';
import './OnlineProfiles.css';
import { TextField } from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core/styles';

function OnlineProfiles() {
  const CssTextField = styled(TextField, {
    shouldForwardProp: (props) => props !== 'focusColor',
  })((p) => ({
    // input label when focused
    '& label.Mui-focused': {
      color: p.focusColor,
    },
    // focused color for input with variant='standard'
    '& .MuiInput-underline:after': {
      borderBottomColor: p.focusColor,
    },
    // focused color for input with variant='filled'
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: p.focusColor,
    },
    // focused color for input with variant='outlined'
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: p.focusColor,
      },
    },
  }));

  const useStyles = makeStyles({
    labelInput: {
      fontSize: '0.9vw',
    },
    button: {
      border: '3px solid',
    },
  });

  const classes = useStyles();

  const [profile, setProfile] = useState([{
    website: '',
    tools: '',
    created: '',
    notes: '',
  }]);

  const addOnlineProfile = async (event) => {
    event.preventDefault();
    console.log(profile);
    const temp = [...profile];
    console.log(temp);
    temp.push({
      website: '',
      tools: '',
      created: '',
      notes: '',
    });
    console.log(temp);
    await setProfile((pastProfiles) => pastProfiles.push(temp));
    console.log(profile);
  };

  const editOnlineProfile = (event, element, index) => {
    console.log(event.target.value);
    event.preventDefault();
    console.log(profile[index][element]);
    const temp = [...profile];
    console.log(temp[index][element]);
    temp[index][element] = event.target.value;
    setProfile(temp);
    console.log(profile);
  };

  return (
    <div>
      <div className="temp" />
      <div className="op-title">Online Profiles</div>
      <div className="left-button">
        <button type="button" onClick={addOnlineProfile} className="add-buttons">
          Add Profile
        </button>
      </div>
      <div>
        {profile.map((profileObject, index) => (
          <div>
            <form>
              <div>
                <CssTextField
                  focusColor="#0c0ca4"
                  label="Website"
                  variant="outlined"
                  FormHelperTextProps={{ children: 'Label' }}
                  focused
                  onChange={(e) => editOnlineProfile(e, 'website', index)}
                  style={{ paddingBottom: '1%' }}
                  InputProps={{
                    className: classes.root,
                    style: {
                      fontFamily: 'Montserrat',
                      color: '#49454F',
                      paddingLeft: '0.5%',
                      width: '55.0vw',
                      height: '3.2vw',
                      fontSize: '0.9vw',
                      fontWeight: 'bold',
                    },
                  }}
                  InputLabelProps={{
                    className: classes.labelInput,
                    style: {
                      fontFamily: 'Montserrat',
                      paddingLeft: '0.3%',
                      backgroundColor: 'white',
                    },
                  }}
                />
              </div>
            </form>
          </div>
        ))}
      </div>

    </div>
  );
}

export default OnlineProfiles;
