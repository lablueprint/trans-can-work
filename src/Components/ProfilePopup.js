import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide } from '@mui/material';
import './ProfilePopup.css';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Check, Close, Edit } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import profilepic from '../Assets/parrot_profile.svg';
import navpic from '../Assets/powell_cat.svg';
// const style = {
//   container: {
//     position: 'relative',
//   },
//   divider: {
//     position: 'relative',
//   },
//   avatar: {
//     position: 'absolute',
//     top: '-55px',
//     left: 'calc(50% - 55px)',
//     width: '110px',
//     height: '110px',
//     backgroundColor: 'white',
//     boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
//   },
// };
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

  return (
    <div className="containerSection">
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
                style={{
                  backgroundColor: '#d3d3d3', width: 35, height: 35, left: 10, top: 10,
                }}
                onClick={() => { setEdit(!edit); }}
              >
                <Close style={{
                  width: 20, height: 20,
                }}
                />
              </IconButton>
              <IconButton style={{ backgroundColor: '#d3d3d3', top: 10, left: 10 }} onClick={() => { setEdit(!edit); }}>
                <Check />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                style={{
                  backgroundColor: '#d3d3d3', width: 35, height: 35, left: 10, top: 10,
                }}
                onClick={() => { setEdit(!edit); }}
              >
                <Edit style={{ width: 20, height: 200 }} />
              </IconButton>
              <IconButton style={{ backgroundColor: '#d3d3d3', left: 10, top: 10 }} onClick={handleClose} size="">
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
            style={{
              width: '100px', height: '100px', backgroundColor: 'white', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
            }}
          />
        </div>
        {edit ? (
          <>
            <div className="profilePicButton">
              <IconButton style={{ backgroundColor: '#222', width: 35, height: 35 }}>
                <Edit style={{ width: 20, height: 20, color: '#fff' }} />
              </IconButton>
            </div>
            <div className="coverPicButton">
              <IconButton style={{ backgroundColor: '#222', width: 35, height: 35 }}>
                <Edit style={{ width: 20, height: 20, color: '#fff' }} />
              </IconButton>
            </div>
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
                  <TextField variant="outlined" defaultValue={firstName} size="small" fullWidth />
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
              </>
            ) : (

              <p className="bio">
                {bio}
              </p>

            )}
          </div>
          <Divider className="divider" />

        </div>
        <div className="navContainer">
          <div className="navInnerContainer">
            <div className="avatar">
              <Avatar
                alt="Jack Sparrow"
                src={navpic}
                style={{
                  width: '80px',
                  height: '80px',
                  marginRight: '20px',
                  backgroundColor: 'white',
                  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
              />
            </div>
            <div className="details">
              <p className="nav">Navigator</p>
              <h2 className="navigatorName">Powell Cat</h2>
              <p className="navigatorEmail">powellcat@gmail.com</p>
            </div>
          </div>
        </div>

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
