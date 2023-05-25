/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField, Button,
} from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core/styles';

import { sendPasswordReset } from '../firebase';
import './Reset.css';

const TCWLogo2 = require('../Assets/Images/TCW-banner-black.png');

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
  const [rememberMe, setRememberMe] = useState(false);

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
    <div className="background">
      <img src={TCWLogo2} className="TcwLogo2" alt="TCWLogo2" />
      <div className="loginPage">
        <p className="forgot">Forgot Password</p>
        <p className="enterEmail">Enter your email to receive a reset link</p>
        <div className="loginInput">
          <CssTextField
            id="email"
            focusColor="#0c0ca4"
            label="Email Address"
            variant="outlined"
            autoComplete={rememberMe}
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
          <Button
            type="button"
            variant="contained"
            color="primary"
            onClick={() => sendPasswordReset(email)}
            style={buttonStyle}
          >
            Send
          </Button>
        </div>
        <div className="register">
          <div style={{ paddingBottom: '3%' }} />
          <Link to="/"> Back to login page</Link>
        </div>

      </div>
    </div>
  );
}
export default Login;
