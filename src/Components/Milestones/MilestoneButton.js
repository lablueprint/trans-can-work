import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import IslandPopup from './IslandPopup';
import './MilestoneButton.css';

function MilestoneButton({
  title, image, imageHover, id,
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
        isComplete={isComplete}
        toggleComplete={toggleComplete}
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
};

export default MilestoneButton;
