import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import IslandPopup from './IslandPopup';
import './MilestoneButton.css';

function MilestoneButton({
  title, image, imageHover, id, jobseeker, setJobseeker,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isHover, setIsHover] = React.useState(false);
  const handleOnMouseEnter = () => setIsHover(true);
  const handleOnMouseLeave = () => setIsHover(false);
  const togglePending = () => {
    const originalId = id;
    const parsedId = originalId.replace(/-/g, ' ');
    if (jobseeker.milestones[parsedId] === 'incomplete') {
      const temp = { ...jobseeker };
      temp.milestones[parsedId] = 'waiting for approval';
      setJobseeker(temp);
    }
  };

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
        status={jobseeker.milestones[id.replace(/-/g, ' ')]}
        togglePending={togglePending}
        id={id}
        jobseeker={jobseeker}
        setJobseeker={setJobseeker}
      />
    </div>

  );
}

MilestoneButton.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  imageHover: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  jobseeker: PropTypes.func.isRequired,
  setJobseeker: PropTypes.func.isRequired,
};

export default MilestoneButton;
