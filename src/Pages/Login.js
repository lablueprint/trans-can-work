import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import { TextField, Button, Checkbox } from '@material-ui/core';
import InputAdornment from '@mui/material/InputAdornment';
import VisibilityIcon from '@mui/icons-material/Visibility';
import GoogleIcon from '@mui/icons-material/Google';
import { styled, makeStyles } from '@material-ui/core/styles';

// import { useSelector } from 'react-redux';
import {
  login, handleGoogleSignIn,
} from '../Services/user-service';

import './Login.css';

const TCWLogo = require('../Assets/Images/TCW-logo.png');
const TCWLogo2 = require('../Assets/Images/tcw-logo2.png');
const TCWTitle = require('../Assets/Images/TCW-title.png');
const islands = require('../Assets/Images/islands.png');
const arrow = require('../Assets/Images/arrow.png');
const loginArt = require('../Assets/Images/login.png');

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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // eslint-disable-next-line no-undef
  const user = useSelector((state) => state.auth.value);

  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();
    login(email.toLowerCase(), password)
      .catch((e) => {
        // add proper error handling
        const errorCode = e.code;
        const errorMessage = e.message;
        console.log('An error occured: ', errorCode, errorMessage);
        setError(true);
      });
  };

  function signInWithGoogle() {
    handleGoogleSignIn().catch((e) => {
      // add proper error handling
      const errorCode = e.code;
      console.log(errorCode);
      const googleErrorMessage = e.message;
      console.log(googleErrorMessage);
    });
  }

  useEffect(() => {
    if (user && user.isLoggedIn && user.user !== undefined) {
      navigate(user.user.approved ? '/home' : '/splash');
    }
  }, [user]);

  const classes = useStyles();

  const inputProps = {
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
        <div className="loginPage">
          <img src={loginArt} className="loginArt" alt="loginArt" />
          <div className="loginInput">
            <CssTextField
              id="email"
              label="Email Address"
              variant="outlined"
              focused
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              style={{ paddingBottom: '1%' }}
              InputProps={inputProps}
              InputLabelProps={inputLabelProps}
              error={error}
            />
          </div>
          <div className="loginInput">
            <CssTextField
              id="password"
              label="Password"
              variant="outlined"
              value={password}
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
              error={error}

            />
          </div>

          <div className="rememberMeForgotPassword">
            <div className="checkbox">
              <Checkbox
                style={{
                  color: '#0c0ca4',
                  paddingRight: '1.5%',
                  paddingBottom: '4%',
                  transform: 'scale(1)',
                }}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <div style={{
                paddingTop: '2%',
              }}
              >
                {' '}
                Remember Me
              </div>
            </div>
            <Link
              className="forgotPassword"
              to="/reset"
            >
              Forgot Password?
              {' '}

            </Link>
          </div>

          <div className="loginInput">
            <Button
              type="button"
              variant="contained"
              color="primary"
              onClick={onLogin}
              style={buttonStyle}
            >
              Login
            </Button>
          </div>
          <div className="loginInput">
            <Button
              type="button"
              color="primary"
              onClick={() => signInWithGoogle()}
              variant="outlined"
              startIcon={<GoogleIcon style={{ fontSize: '1.2vw' }} />}
              className={classes.button}
              style={buttonStyle}
            >
              &nbsp;Login with Google
            </Button>

          </div>
          <img src={TCWLogo2} className="TcwLogo2" alt="TCWLogo2" />

          <div className="register">
            <div style={{ paddingBottom: '3%' }}>
              Don&apos;t Have An Account?
            </div>
            <Link to="/register">Create Account</Link>
          </div>
        </div>
      </div>
    </>
  );
}
export default Login;
