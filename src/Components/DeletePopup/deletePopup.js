import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import './deletePopup.css';
import Button from '@mui/material/Button';

const style = {
  dialog: {
    borderRadius: '5em',
  },
  button: {
    margin: '2vh 1.5vw 0 0',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  iconButton: {
    right: '1em',
    top: '1em',
  },
};
const Transition = React.forwardRef((props, ref) => <Slide direction="right" ref={ref} {...props} />);

function DeletePopup({
  open,
  handleClose,
//   title,
//   subtitle,
//   handleConfirm
}) {
  return (
    <div className="delete-popup">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: style.dialog,
        }}
      >
        <div className="close-btn" style={style.button}>
          <IconButton
            style={style.iconButton}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            size="large"
            onClick={handleClose}
          >
            <CloseRounded />
          </IconButton>
        </div>
        <div style={style.header}>
          <div id="caption">
            <h3 id="delete">
              Delete Jobseeker?
              {/* {title} */}
            </h3>
            <p id="confirmation">
              Are you sure you want to delete this jobseeker?
              {/* {subtitle}  */}
            </p>
          </div>
          <Button
            disableRipple
            onClick={handleClose}
            id="cancel"
          >
            Cancel
          </Button>
          <Button
            disableRipple
            // onClick={handleConfirm}
            id="confirm"
          >
            Confirm
          </Button>
        </div>
        <div className="popup-content" />
      </Dialog>
    </div>
  );
}

export default DeletePopup;

DeletePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
//   subtitle: PropTypes.string.isRequired,
//   handleConfirm: PropTypes.func.isRequired,
};
