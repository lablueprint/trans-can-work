import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  TextField, Button, withStyles, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio,
} from '@material-ui/core';
import GoogleIcon from '@mui/icons-material/Google';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled, makeStyles } from '@material-ui/core/styles';
import { register, handleGoogleSignUp } from '../Services/user-service';
import './Register.css';

const arrow = require('../Assets/Images/arrow.png');
const TCWLogo = require('../Assets/Images/TCW-logo.png');
const TCWTitle = require('../Assets/Images/TCW-title.png');
const islands = require('../Assets/Images/islands.png');
const createAccountArt = require('../Assets/Images/create-account.png');
const TCWLogo2 = require('../Assets/Images/tcw-logo2.png');

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

const CssRadio = withStyles({
  colorSecondary: {
    color: 'blue',
    '&$checked': {
      color: 'blue',
    },
  },
  checked: {},
})(Radio);

const useStyles = makeStyles({
  labelInput: {
    fontSize: '0.9vw',
  },
  button: {
    border: '3px solid',
  },
  checkboxLabel: {
    fontSize: '0.9vw',
    fontFamily: 'Montserrat',
    paddingLeft: '18%',
  },
});

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [role, setRole] = useState('jobseeker');
  const store = useSelector((state) => state.auth.value);

  useEffect(() => {
    if (store && store.isLoggedIn && store.user !== undefined) {
      navigate(store.user.role === 'jobseeker' ? '/onboard' : '/');
    }
  }, [store]);

  const data = {
    email,
    password,
    role,
    firstName,
    lastName,
  };

  const onSubmit = async () => {
    let errorFlag = false;
    if (firstName === '') {
      setFirstNameError(true);
      errorFlag = true;
    } else {
      setFirstNameError(false);
    }
    if (lastName === '') {
      setLastNameError(true);
      errorFlag = true;
    } else {
      setLastNameError(false);
    }
    if (email === '') {
      setEmailError(true);
      errorFlag = true;
    } else {
      setEmailError(false);
    }
    if (password === '') {
      setPasswordError(true);
      errorFlag = true;
    } else if (password.length < 6) {
      setPasswordError(true);
      errorFlag = true;
      alert('Please ensure your password is at least 6 characters');
    } else {
      setPasswordError(false);
    }
    if (errorFlag) {
      return;
    }

    register(data)
      .catch((error) => {
        console.log(error);
        alert(`Registration Failed: ${error}`);
      });
  };

  const handleGoogle = async () => {
    handleGoogleSignUp(role)
      .catch((error) => {
        console.log(error);
        alert(`Google Registration Failed ${error}`);
      });
  };

  const classes = useStyles();

  const inputProps = {
    className: classes.root,
    style: {
      fontFamily: 'Montserrat',
      color: 'black',
      paddingLeft: '0.5%',
      width: '55.0vw',
      height: '3.2vw',
      fontSize: '0.9vw',
      fontWeight: 'bold',
    },
  };
  const inputLabelProps = {
    className: classes.labelInput,
    style: {
      fontFamily: 'Montserrat',
      paddingLeft: '0.3%',
      backgroundColor: 'white',
    },
  };

  const buttonStyle = {
    fontSize: '0.85vw',
    fontWeight: 'bold',
    fontFamily: 'Montserrat',
    textTransform: 'none',
    width: '55.0vw',
    height: '3.2vw',
  };

  const setAccount = (value) => {
    setRole(value);
  };

  return (
    <>
      <div className="landingSplash" id="landingSplash">
        <div className="header">
          <img src={TCWLogo} className="TCWlogo" alt="TCWLogo" />
          <div className="headerTitle">
            <div className="font"> Welcome to</div>
            <img src={TCWTitle} className="TCWimage" alt="TCWTitle" />
          </div>
        </div>
        <div className="body">
          Trans Can Work (TCW) is a nonprofit organization committed to
          advancing workplace inclusion through innovative training strategies
          and workforce development.
        </div>
        <div className="footer">
          <div className="footerBody">
            <b>Sign up&nbsp;</b>
            for an Employment Roadmap today!
          </div>
          <img src={islands} className="islandsImage" alt="islands" />
        </div>
        <img src={arrow} className="arrowImage" alt="arrow" />
      </div>

      <div className="background">
        <div className="registerPage">
          <img src={createAccountArt} className="createAccountArt" alt="createAccountArt" />
          <div className="registerInput">
            <FormControl>
              <FormLabel
                className="selectRadio"
                id="demo-radio-buttons-group-label"
                style={{
                  fontFamily: 'Montserrat',
                  fontSize: '0.9vw',
                  color: 'blue',
                  fontWeight: 'bold',
                }}
              >
                What best describes you?
              </FormLabel>

              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="jobseeker"
                name="radio-buttons-group"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '54.0vw',
                  color: 'blue',
                  paddingTop: '4%',
                }}
              >
                <FormControlLabel
                  value="jobseeker"
                  classes={{
                    label: classes.checkboxLabel,
                  }}
                  control={(
                    <CssRadio />
                  )}
                  label="Jobseeker"
                />
                <FormControlLabel
                  value="navigator"
                  classes={{
                    label: classes.checkboxLabel,
                  }}
                  control={(
                    <CssRadio />
                  )}
                  label="Navigator"
                  onChange={() => setAccount('navigator')}
                />
                <FormControlLabel
                  value="adminstrator"
                  classes={{
                    label: classes.checkboxLabel,
                  }}
                  control={(
                    <CssRadio />
                  )}
                  label="Adminstrator"
                  onChange={() => setAccount('admin')}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className="registerInput">
            <CssTextField
              id="First Name&nbsp;"
              label="First Name"
              variant="outlined"
              focused
              error={firstNameError}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              style={{ paddingBottom: '1%' }}
              InputProps={inputProps}
              InputLabelProps={inputLabelProps}
            />
          </div>
          <div className="registerInput">
            <CssTextField
              id="Last Name"
              label="Last Name&nbsp;"
              variant="outlined"
              focused
              error={lastNameError}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              style={{ paddingBottom: '1%' }}
              InputProps={inputProps}
              InputLabelProps={inputLabelProps}
            />
          </div>
          <div className="registerInput">
            <CssTextField
              id="email"
              label="Email Address&nbsp;"
              variant="outlined"
              focused
              error={emailError}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ paddingBottom: '1%' }}
              InputProps={inputProps}
              InputLabelProps={inputLabelProps}
            />
          </div>
          <div className="registerInput">
            <CssTextField
              id="password"
              label="Password&nbsp;"
              variant="outlined"
              value={password}
              error={passwordError}
              focused
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                ...inputProps,
                endAdornment: (
                  <InputAdornment position="start" onClick={() => setShowPassword(!showPassword)}>
                    <VisibilityIcon fontSize="large" />
                  </InputAdornment>
                ),
              }}
              InputLabelProps={inputLabelProps}
            />
          </div>
          <div className="registerInput">
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={onSubmit}
              style={buttonStyle}
            >
              Sign Up
            </Button>
          </div>
          <div className="registerInput">
            <Button
              type="button"
              color="primary"
              onClick={handleGoogle}
              variant="outlined"
              startIcon={<GoogleIcon style={{ fontSize: '1.2vw' }} />}
              className={classes.button}
              style={buttonStyle}
            >
              &nbsp;Sign up with Google
            </Button>
          </div>
          <img src={TCWLogo2} className="TcwLogo2" alt="TCWLogo2" />
          <div className="login">
            <div style={{ paddingBottom: '3%' }}>
              {' '}
              Have An Account?
            </div>
            <Link to="/">Login</Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Register;
