import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide } from '@mui/material';
import './ProfilePopup.css';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import {
  Check, Close, Edit, Visibility, VisibilityOff,
} from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { InputAdornment } from '@material-ui/core';
import Button from '@mui/material/Button';
import { doc, setDoc } from 'firebase/firestore';
import profilepic from '../Assets/parrot_profile.svg';
import navpic from '../Assets/powell_cat.svg';
import { fetchJobseeker } from '../Services/jobseeker-service';
import firebase from '../firebase';

const backgroundColors = ['#FF968A', '#FFCCB6', '#FFFFB5', '#CCE2CB', '#A2E1DB', '#D4F0F0', '#CBAACB', '#FEE1E8'];

const styles = {
  avatar: {
    width: '5em',
    height: '5em',
    backgroundColor: 'white',
    boxShadow: '0px 0.5em 0.75em rgba(0, 0, 0, 0.5)',

  },
  containerSection: {
    maxHeight: '7em',
    overflowY: 'scroll',
  },
  close: {
    width: '20',
    height: '20',
  },
  cancel: {
    backgroundColor: '#d3d3d3',
    width: '35',
    height: '35',
    right: '0.7em',
    top: '10',

  },
  confirm: {
    backgroundColor: '#d3d3d3',
    top: '10',
    left: '10,',
  },
  edit: {
    width: '20',
    height: '20',
    backgroundColor: '#d3d3d3',

  },
  mainEdit: {
    width: '20',
    height: '20',
  },
  profileButton: {
    backgroundColor: '#d3d3d3',
    width: '35',
    height: '35',
  },
  divider: {
    marginBottom: '2em',
    borderBottomWidth: '0.15em',
  },
  email: {
    marginTop: '6.5em',
  },
  done: {
    textTransform: 'None',
    color: '#484649',
    fontFamily: 'Montserrat',
    maxWidth: '5em',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  colorPopup: {
    margin: '50%',
  },
};
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="right" ref={ref} {...props} />
));

/* TODO:
  - Dynamically pull navigator from backend
  - once backend is setup, modify buttons so that changes are only propagated to
  backend if the check button is pressed
  - Add change profile pic functionality once designs done
  - only display password if the user isnt signed in with google */
function ProfilePopup({
  open,
  handleClose,
}) {
  const testemail = 'bboy@tt.com';
  const db = firebase;
  const docRef = doc(db, 'jobseekers', testemail);

  const [edit, setEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editBackground, setEditBackground] = useState(false);
  const [editProfilePic, setEditProfilePic] = useState(false);

  // const [profilePic, setProfilePic] = useState('');
  const [bg, setBg] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const logquery = async () => {
      const query = await fetchJobseeker(testemail);
      const data = query.data();
      if (data.firstName != null) {
        setFirstName(data.firstName);
      }
      if (data.lastName != null) {
        setLastName(data.lastName);
      }
      if (data.pronouns != null) {
        setPronouns(data.pronouns);
      }
      if (data.bio != null) {
        setBio(data.bio);
      }
      if (data.profilePic != null) {
        // setProfilePic(data.profilePic);
      }
      if (data.color != null) {
        setBg(data.color);
        console.log('background', data.color);
      }
    };

    logquery();
  }, []);
  const handleClick = (color) => {
    const data = {
      color,
    };
    setDoc(docRef, data, { merge: true })
      .then(() => {
      })
      .catch((error) => {
        console.log(error);
      });
    setBg(color);
  };
  const handleToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="containerSection" style={styles.containerSection}>
      <Dialog
        className="popup"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        PaperProps={{ style: { borderRadius: 30, maxHeight: '750px', maxWidth: '356px' } }}
      >
        <div className="buttonSection">
          {edit ? (
            <>
              <IconButton
                style={styles.cancel}
                onClick={() => { setEdit(!edit); }}
              >
                <Close style={styles.close} />
              </IconButton>
              <IconButton style={styles.confirm} onClick={() => { setEdit(!edit); }}>
                <Check />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                style={styles.cancel}
                onClick={() => { setEdit(!edit); }}
              >
                <Edit style={styles.mainEdit} />
              </IconButton>
              <IconButton style={styles.confirm} onClick={handleClose} size="">
                <Close />
              </IconButton>
            </>
          )}
        </div>
        <div className="imageSection" style={{ backgroundColor: bg }} />
        <div className="profilePic">
          <Avatar
            alt="Jack Sparrow"
            src={profilepic}
            style={styles.avatar}
          />
        </div>
        {edit ? (
          <>
            <div className="profilePicButton">
              <IconButton onClick={() => setEditProfilePic(true)} style={styles.profileButton}>
                <Edit style={styles.edit} />
              </IconButton>
            </div>
            <Dialog
              PaperProps={{ style: { borderRadius: 30 } }}
              open={editProfilePic}
              onClose={() => setEditProfilePic(false)}
            >
              <h3 className="backgroundHeader">Choose Profile Picture</h3>
              <div className="colorPopup">
                <div>
                  {backgroundColors.map((color) => (
                    <Button
                      key={color}
                      style={{
                        backgroundColor: color,
                        width: 50,
                        height: 65,
                        borderRadius: '50%',
                        margin: 5,
                      }}
                    />
                  ))}
                </div>
              </div>

              <Button variant="outlined" style={styles.done} onClick={() => setEditProfilePic(false)}>Done</Button>
            </Dialog>
            <div className="coverPicButton">
              <IconButton onClick={() => setEditBackground(true)} style={styles.profileButton}>
                <Edit style={styles.edit} />
              </IconButton>
            </div>
            <Dialog
              PaperProps={{ style: { borderRadius: 30 } }}
              open={editBackground}
              onClose={() => setEditBackground(false)}
            >
              <div>
                <h3 className="backgroundHeader">Choose Background Color</h3>
                {backgroundColors.map((color) => (
                  <Button
                    onClick={() => handleClick(color)}
                    key={color}
                    style={{
                      backgroundColor: color,
                      width: 50,
                      height: 65,
                      borderRadius: '50%',
                      margin: 5,
                    }}
                  />
                ))}
              </div>

              <Button style={styles.done} onClick={() => setEditBackground(false)}>Done</Button>
            </Dialog>
          </>
        ) : <div />}
        <div className="textSection">
          {' '}
          <div className="profileLabel">
            <div className="nameLabel">
              {edit ? <h3>Edit Account</h3> : (
                <h3 className="nameLabel">
                  {firstName}
                  {' '}
                  {lastName}
                </h3>
              )}

            </div>
            <div className="pronounLabel">
              {edit ? <h5>{' '}</h5> : (
                <h5>
                  {pronouns}
                </h5>
              )}
            </div>
          </div>
          <div className="bioSection">
            {edit ? (
              <>
                <div className="inputSection">
                  <h5 className="inputTitle">FIRST NAME</h5>
                  <TextField
                    variant="outlined"
                    defaultValue={firstName}
                    size="small"
                    fullWidth
                  />
                </div>
                <div className="inputSection">
                  <h5 className="inputTitle">LAST NAME</h5>
                  <TextField variant="outlined" defaultValue={lastName} size="small" fullWidth />
                </div>
                <div className="inputSection">
                  <h5 className="inputTitle">PRONOUNS</h5>
                  <TextField variant="outlined" defaultValue={pronouns} size="small" fullWidth />
                </div>
                <div className="inputSection">
                  <h5 className="inputTitle">BIO</h5>
                  <TextField variant="outlined" defaultValue={bio} size="small" fullWidth multiline maxRows={4} />
                </div>
                <div style={styles.email} className="inputSection">
                  <h5 className="inputTitle">EMAIL</h5>
                  <TextField variant="outlined" defaultValue="aaronshi@gmail.com" size="small" fullWidth disabled />
                  <div className="inputSection">
                    <h5 className="inputTitle">PASSWORD</h5>
                    <TextField
                      type={showPassword ? 'text' : 'password'}
                      variant="outlined"
                      fullWidth
                      disabled
                      defaultValue="puppylover1234"
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleToggleShowPassword}>
                              {showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </div>
                </div>
              </>
            ) : (

              <p className="bio">
                {bio}
              </p>

            )}
          </div>

        </div>
        {!edit && (
          <div className="navContainer">
            <Divider style={styles.divider} className="divider" />
            <div className="navInnerContainer">
              <div className="avatar">
                <Avatar
                  alt="Jack Sparrow"
                  src={navpic}
                  style={styles.avatar}
                />
              </div>
              <div className="details">
                <p className="nav">Navigator</p>
                <h2 className="navigatorName">Powell Cat</h2>
                <p className="navigatorEmail">powellcat@gmail.com</p>
              </div>
            </div>
          </div>
        )}

      </Dialog>

    </div>
  );
}

export default ProfilePopup;

ProfilePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
