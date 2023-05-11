import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import './MilestoneButton.css';
// import { createTheme } from '@mui/material';
import backButton from '../../Assets/back button.png';

function MilestoneButton({
  title, image, imageHover,
  // status,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isHover, setIsHover] = React.useState(false);
  const handleOnMouseEnter = () => setIsHover(true);
  const handleOnMouseLeave = () => setIsHover(false);
  const [isComplete, setComplete] = React.useState(false);
  const toggleComplete = () => setComplete(!isComplete);

  return (
    <div>
      <Button
        style={{ backgroundColor: 'transparent' }}
        onClick={handleOpen}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        {(isHover) ? <img id="img" src={imageHover} alt="hovered pic" /> : <img id="img" src={image} alt="island pic" />}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box id="popup">
          <img id="title" src={title} alt="island title" />
          <Typography sx={{ mt: 50 }} />
          <Button
          // {status}={!!(isComplete)}
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

MilestoneButton.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageHover: PropTypes.string.isRequired,
  // status: PropTypes.bool.isRequired,
};

export default MilestoneButton;
/*
Later: include button/external links to the popup
TODO: make the islands turn into color when marked as complete
*/
