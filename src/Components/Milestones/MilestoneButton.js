import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
function MilestoneButton({
  title, image, imageHover,
}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isHover, setIsHover] = React.useState(false);
  const handleOnMouseEnter = () => setIsHover(true);
  const handleOnMouseLeave = () => setIsHover(false);
  return (
    <div>
      <Button
        onClick={handleOpen}
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      >
        {title}
        {(isHover) ? <img id="img" src={imageHover} alt="hovered pic" /> : <img id="img" src={image} alt="island pic" />}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h3" component="h6">
            Milestone Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 60 }}>
            Here is a milestone description!
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              'Completed';
            }}
          >
            Mark as Complete
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
};

export default MilestoneButton;
/*
Finished creating the popup
Later: include button/external links to the popup
*/
