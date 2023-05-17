import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide } from '@mui/material';
import './ProfilePopup.css';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Check, Close, Edit } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import { InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import Button from '@mui/material/Button';
import profilepic from '../Assets/parrot_profile.svg';
import navpic from '../Assets/powell_cat.svg';

const backgroundColors = ['#FF968A', '#FFCCB6', '#FFFFB5', '#CCE2CB', '#A2E1DB', '#D4F0F0', '#CBAACB', '#FEE1E8'];

const styles = {
  avatar: {
    width: '100px',
    height: '100px',
    backgroundColor: 'white',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',

  },
  containerSection: {
    maxHeight: '500px',
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
    left: '10',
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
    color: '#fff',
  },
  mainEdit: {
    width: '20',
    height: '20',
  },
  profileButton: {
    backgroundColor: '#222',
    width: '35',
    height: '35',
  },
  divider: {
    marginBottom: '30px',
  },
  email: {
    marginTop: '100px',
  },
};
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="right" ref={ref} {...props} />
));

function ProfilePopup({
  open,
  handleClose,
  firstName,
  lastName,
  pronouns,
  bio,
}) {
  const [edit, setEdit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [editBackground, setEditBackground] = useState(false);
  const [editProfilePic, setProfilePic] = useState(false);

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
        <div className="imageSection" />
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
              <IconButton onClick={() => setProfilePic(true)} style={styles.profileButton}>
                <Edit style={styles.edit} />
              </IconButton>
            </div>
            <Dialog open={editProfilePic} onClose={() => setProfilePic(false)}>
              <div>
                <h3>Choose Profile Picture</h3>
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

              <Button onClick={() => setProfilePic(false)}>Save</Button>
            </Dialog>
            <div className="coverPicButton">
              <IconButton onClick={() => setEditBackground(true)} style={styles.profileButton}>
                <Edit style={styles.edit} />
              </IconButton>
            </div>
            <Dialog open={editBackground} onClose={() => setEditBackground(false)}>
              <div>
                <h3>Choose Background Color</h3>
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

              <Button onClick={() => setEditBackground(false)}>Save</Button>
            </Dialog>
          </>
        ) : <div /> }
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
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  pronouns: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};
