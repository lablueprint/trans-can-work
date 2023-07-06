/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  TextField, Button,
} from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core/styles';
import { ArrowBack } from '@material-ui/icons';
import { sendPasswordReset } from '../firebase';
import './Reset.css';

const TCWLogo2 = require('../Assets/Images/TCW-banner-black.png');

const styles = {
  link: {
    textDecoration: 'none', color: '#111111', fontFamily: 'Montserrat', display: 'flex', alignItems: 'center',
  },
  arrow: { marginRight: '0.5em' },
  separator: { paddingBottom: '3%' },
  linkContainer: { display: 'flex', justifyContent: 'center' },
  confirm: { marginBottom: '7em' },
};

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
  const [sentReset, setSentReset] = useState(false);
  const classes = useStyles();
  const passwordReset = (sendEmail) => {
    setSentReset(true);
    sendPasswordReset(sendEmail);
  };
  const inputProps = {
    className: classes.root,
    style: {
      fontFamily: 'Montserrat',
      color: '#49454F',
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
    <div className="resetBackground">
      <div className="logoContainer">
        <img src={TCWLogo2} className="TcwLogo2" alt="TCW Logo" />
      </div>
      {sentReset ? (
        <div style={styles.confirm}>
          <p className="forgot">Forgot Password</p>
          <p className="enterEmail">A password reset email has been sent. Check your email within the next 10 minutes to reset your password.</p>
        </div>
      )
        : (
          <div>
            <p className="forgot">Forgot Password</p>
            <p className="enterEmail">Enter your email to receive a reset link.</p>
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
                onClick={() => passwordReset(email)}
                style={buttonStyle}
              >
                Send
              </Button>
            </div>
            <div>
              <div style={styles.separator} />
              <div style={styles.linkContainer}>
                <Link
                  style={styles.link}
                  to="/"
                >
                  <ArrowBack style={styles.arrow} />
                  <p>Back to login page</p>
                </Link>
              </div>

            </div>

          </div>
        )}
    </div>
  );
}
export default Login;
