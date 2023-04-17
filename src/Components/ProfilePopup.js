import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide } from '@mui/material';
import './ProfilePopup.css';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Check, Close, Edit } from '@mui/icons-material';
import profilepic from '../Assets/cartoon-parrot.jpeg';

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
  return (
    <div className="containerSection">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        fullWidth
        PaperProps={{ style: { borderRadius: 30 } }}
      >
        <div className="imageSection" />
        <div className="buttonSection">
          {/* <IconButton
            sx={{
              borderRadius: 50,
            }}
          />
          ; */}
          <IconButton>
            <Check />
          </IconButton>
          <IconButton>
            <Close />
          </IconButton>
          <IconButton>
            <Edit />
          </IconButton>
        </div>
        <div className="profilePic">
          <Avatar
            alt="Jack Sparrow"
            src={profilepic}
            style={{ width: '110px', height: '110px' }}
          />
        </div>
        <div className="textSection">
          {' '}
          <div className="profileLabel">
            <div className="nameLabel">
              <h3>
                {firstName}
                {' '}
                {lastName}
              </h3>
            </div>
            <div className="pronounLabel">
              <h5>
                {pronouns}
              </h5>
            </div>
          </div>
          <div className="bioSection">
            <p>
              {bio}
            </p>
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
