import React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

const style = {
  Popup: {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '900px',
    background: '#FFFBFE',
    border: '2px solid #000',
    padding: 4,
    borderRadius: '32px',
  },

  Button: {
    border: '2px solid #484649',
    padding: '16px 24px',
    width: '202px',
    height: '56px',
    left: 'calc(50% - 202px/2 - 0.5px)',
    top: 'calc(50% - 56px/2 - 70px)',
    borderRadius: '8px',
    filter: 'drop-shadow(0px 4px 8px rgba(60, 55, 68, 0.25))',
  },
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
        {(isHover) ? <img id="img" src={imageHover} alt="hovered pic" /> : <img id="img" src={image} alt="island pic" />}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        // aria-labelledby="modal-modal-title"
        // aria-describedby="modal-modal-description"
      >
        <Box sx={style.Popup}>
          <img id="title" src={title} alt="island title" />
          <Typography sx={{ mt: 50 }} />
          <Button
            sx={style.Button}
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
