import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import backButton from '../../Assets/back button.png';
import OnlineProfile from './OnlineProfile';
import Workshop from './Workshop';
import JobFair from './JobFair';
import './IslandPopup.css';

function IslandPopup({
  title, isOpen, handleClose, isComplete, toggleComplete, id,
}) {
  let toBeRendered;
  if (id === 'assessment') {
    toBeRendered = <OnlineProfile />;
  } else if (id === 'online-profile') {
    toBeRendered = <OnlineProfile />;
  } else if (id === 'workshop') {
    toBeRendered = <Workshop />;
  } else if (id === 'job-fair') {
    toBeRendered = <JobFair />;
  }
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
      >
        <Box id="popup">
          <img id="title" src={title} alt="island title" />
          <hr className="line" />
          {toBeRendered}
          <Button
            disableRipple
            onClick={toggleComplete}
            id={(isComplete) ? 'completed' : 'incomplete'}
          >
            {(isComplete) ? 'Marked as Completed' : 'Mark as Complete'}
          </Button>
          <Button
            disableRipple
            id="close"
            style={{ backgroundColor: 'transparent' }}
            onClick={handleClose}
          >
            <img src={backButton} alt="back button" />
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

IslandPopup.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isComplete: PropTypes.bool.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};

export default IslandPopup;
