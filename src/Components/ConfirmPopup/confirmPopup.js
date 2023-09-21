import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import './confirmPopup.css';
import Button from '@mui/material/Button';

const style = {
  dialog: {
    borderRadius: '1em',
    backgroundColor: '#FFFBFE',
    width: '40em',
    maxWidth: '85%',
  },
  button: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  iconButton: {
    right: '0.5em',
    top: '0.5em',
  },
};
const Transition = React.forwardRef((props, ref) => <Slide direction="right" ref={ref} {...props} />);

function ConfirmPopup({
  open,
  handleClose,
  title,
  subtitle,
  handleConfirm,
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
        className="modal"
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
              {title}
            </h3>
            <p id="confirmation">
              {subtitle}
            </p>
          </div>
          <div className="buttonContainer">
            <Button
              disableRipple
              onClick={handleClose}
              id="cancel"
            >
              Cancel
            </Button>
            <Button
              disableRipple
              onClick={handleConfirm}
              id="confirm"
            >
              Confirm
            </Button>
          </div>
        </div>
        <div className="popup-content" />
      </Dialog>
    </div>
  );
}

export default ConfirmPopup;

ConfirmPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  handleConfirm: PropTypes.func.isRequired,
};
