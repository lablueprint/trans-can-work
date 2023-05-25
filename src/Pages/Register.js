import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  TextField, Button, withStyles, FormControl, RadioGroup, FormLabel, FormControlLabel, Radio,
} from '@material-ui/core';
import GoogleIcon from '@mui/icons-material/Google';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { styled, makeStyles } from '@material-ui/core/styles';
import { registerWithEmailAndPassword } from '../firebase';
import { createNavigator } from '../Services/navigator-service';
import { createJobseeker, fetchJobseeker } from '../Services/jobseeker-service';
import { createAdmin } from '../Services/admin-service';
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

const auth = getAuth();
// Sample data
const data = {
  name: 'Solia',
  paper: 'ayub',
  'fun fact': 'ableist',
  'helen keller': 'does not exist',
  approval: false,
};

export const getApprovalStatus = async (email) => {
  try {
    const docSnap = await fetchJobseeker(email);
    if (docSnap.exists()) {
      return docSnap.data().approval;
    }
    console.log(`Jobseeker ${email} not found`);
  } catch (error) {
    console.log(`Error getting approval status for ${email}: ${error.message}`);
  }
  return null;
};

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
  const [accountType, setAccountType] = useState('jobseeker');
  const [user, loading] = useAuthState(auth);

  // We will use display name later, on the landing page
  // eslint-disable-next-line no-unused-vars
  const [displayName, setDisplayName] = useState('');
  // If we want to see if user is logged in

  useEffect(() => {
    if (!loading && user) {
      setDisplayName(user.displayName);
    }
  }, [user, loading]);

  const register = async () => {
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
    } else {
      setPasswordError(false);
    }

    if (errorFlag) {
      return;
    }
    if (password.length < 6) {
      alert('Please ensure your password is at least 6 characters');
      return;
    }
    let registered;
    try {
      registered = await registerWithEmailAndPassword(
        firstName,
        lastName,
        accountType,
        email,
        password,
        setDisplayName,
      );
    } catch (error) {
      alert(error);
      return;
    }
    if (accountType === 'navigator') {
      await createNavigator(email, data);
    } else if (accountType === 'jobseeker') {
      await createJobseeker(email, data);
    } else {
      await createAdmin(email, data);
    }
    if (registered === true) {
      const approves = await getApprovalStatus(email);
      navigate(approves ? '/home' : '/splash');
    }
  };
  const provider = new GoogleAuthProvider();

  const handleGoogleSignUp = async () => {
    if (accountType !== 'navigator' && accountType !== 'jobseeker' && accountType !== 'admin') {
      alert('Please select a role');
      return;
    }

    signInWithPopup(auth, provider)
      .then(async (result) => {
        // Signed in successfully with Google
        // The signed-in user info.
        const { user: googleUser } = result;
        if (accountType === 'navigator') {
          createNavigator(googleUser.email, data);
        } else if (accountType === 'jobseeker') {
          createJobseeker(googleUser.email, data);
        } else {
          createAdmin(googleUser.email, data);
        }
        const approves = await getApprovalStatus(googleUser.email);
        navigate(approves ? '/home' : '/splash');
      })
      .catch((error) => {
        alert(error);
        // Sign-in with Google failed
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
    setAccountType(value);
    console.log(value);
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
              focusColor="#0c0ca4"
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
              focusColor="#0c0ca4"
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
              focusColor="#0c0ca4"
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
              focusColor="#0c0ca4"
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
              onClick={() => { register(firstName, lastName, accountType, email, password); }}
              style={buttonStyle}
            >
              Sign Up
            </Button>
          </div>
          <div className="registerInput">
            <Button
              type="button"
              color="primary"
              onClick={() => handleGoogleSignUp()}
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
