import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import IslandPopup from './IslandPopup';
import './MilestoneButton.css';

// map status like how we did in milestone map
// have useState & useEffect (similar to islandPopup)

// set originalStatus value in milestoneMap from the database

function MilestoneButton({
  title, image, imageHover, id, originalStatus,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isHover, setIsHover] = React.useState(false);
  const handleOnMouseEnter = () => setIsHover(true);
  const handleOnMouseLeave = () => setIsHover(false);
  const [status, setStatus] = React.useState(originalStatus);
  const togglePending = () => {
    if (status === 'incomplete') {
      setStatus('pending');
      // match the database to display pending
    }
  };
  // change the status in the database
  // if status == 'incomplete'

  return (
    <div>
      <Button
        style={{ backgroundColor: 'transparent' }}
        disableRipple
        onClick={handleOpen}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        {(isHover) ? <img id="img" src={imageHover} alt="hovered pic" /> : <img id="img" src={image} alt="island pic" />}
      </Button>
      <IslandPopup
        title={title}
        isOpen={open}
        handleClose={handleClose}
        status={originalStatus}
        togglePending={togglePending}
        id={id}
      />
    </div>

  );
}

MilestoneButton.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageHover: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  originalStatus: PropTypes.string.isRequired,
};

export default MilestoneButton;

// TODO: have a lot of if statements w/ isGray, etc & pass in props
