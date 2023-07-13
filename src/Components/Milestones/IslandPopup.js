import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import backButton from '../../Assets/back button.png';
import OnlineProfile from './OnlineProfile';
import Workshop from './Workshop';
import JobFair from './JobFair';
import JobPortal from './JobPortal';
import Resources from './Resources';
import Assessment from './Assessment';
import Training from './Training';
import Internship from './Internship';
import './IslandPopup.css';

function IslandPopup({
  title, isOpen, handleClose, id, isComplete, toggleComplete,
  // jobLink, resourceLink,
}) {
  let toBeRendered;
  let markAsComplete = true;

  if (id === 'assessment') {
    markAsComplete = false;
    toBeRendered = <Assessment />;
  } else if (id === 'online-profile') {
    toBeRendered = <OnlineProfile />;
  } else if (id === 'workshop') {
    toBeRendered = <Workshop />;
  } else if (id === 'job-fair') {
    toBeRendered = <JobFair />;
  } else if (id === 'resource') {
    toBeRendered = <Resources />;
  } else if (id === 'job-portal') {
    toBeRendered = <JobPortal />;
  } else if (id === 'training-program') {
    toBeRendered = <Training />;
  } else if (id === 'internship') {
    toBeRendered = <Internship />;
  } else if (id === 'hiring-info') {
    markAsComplete = false;
    toBeRendered = <div />;
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
          {(markAsComplete) ? (
            <Button
              disableRipple
              onClick={toggleComplete}
              id={(isComplete) ? 'completed' : 'incomplete'}
            >
              {(isComplete) ? 'Marked as Completed' : 'Mark as Complete'}
            </Button>
          ) : null}
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
  id: PropTypes.string.isRequired,
  isComplete: PropTypes.bool,
  toggleComplete: PropTypes.func,
  // jobLink: PropTypes.string.isRequired,
  // resourceLink: PropTypes.string.isRequired,
};

IslandPopup.defaultProps = {
  isComplete: false,
  toggleComplete: () => {},
};

export default IslandPopup;
