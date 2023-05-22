import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import backButton from '../../Assets/back button.png';
import OnlineProfile from './OnlineProfile';
import Workshop from './Workshop';
import JobFair from './JobFair';
import Resources from './Resources';
import './IslandPopup.css';

function IslandPopup({
  title, isOpen, handleClose, id, isComplete, toggleComplete, // markAsComplete,
  // jobLink, resourceLink,
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
  } else if (id === 'resource') {
    toBeRendered = <Resources />;
  }
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
      >
        <Box id="popup">
          {toBeRendered}
          <img id="title" src={title} alt="island title" />
          <hr className="line" />
          <Typography sx={{ mt: 50 }} />
          <Button
            disableRipple
            onClick={toggleComplete}
            id={(isComplete) ? 'completed' : 'incomplete'}
          >
            {(isComplete) ? 'Marked as Completed' : 'Mark as Complete'}
          </Button>
          {/* <div>
            {(markAsComplete)
              ? (
                <Button
                  disableRipple
                  onClick={toggleComplete}
                  id={(isComplete) ? 'completed' : 'incomplete'}
                >
                  {(isComplete) ? 'Marked as Completed' : 'Mark as Complete'}
                </Button>
              )
              : <div />}
          </div>
          <div>
            {(jobLink)
              ? (
                <Button
                  disableRipple
                >
                  Job Portal Link
                </Button>
              )
              : <div />}
          </div>
          <div>
            {(resourceLink)
              ? (
                <Button
                  disableRipple
                >
                  Resources Link
                </Button>
              )
              : <div />}
          </div> */}
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
  // markAsComplete: PropTypes.bool.isRequired,
  // jobLink: PropTypes.string.isRequired,
  // resourceLink: PropTypes.string.isRequired,
};

/* ELETE: mark as complete have bool flag, link buttons have a prop that takes a string
that is a link and if there is a link, make that button appear. use flexbox to position
both buttons */

export default IslandPopup;
