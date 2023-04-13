import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, Slide,
} from '@mui/material';

const Transition = React.forwardRef((props, ref) => <Slide direction="right" ref={ref} {...props} />);

function ProfilePopup({
  open, handleClose, firstName, lastName, pronouns, bio,
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      maxWidth="xs"
      fullWidth
    >
      Hi!
    </Dialog>
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
