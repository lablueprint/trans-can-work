import React from 'react'; //  new stuff
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

// somewhere inside this function, pass a img tag with the images (parent is map, child is milestone button)
// function MilestoneButton(props)
//
//... <Button>{props.title}</Button>
//
function MilestoneButton({title, image, onClick}) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Button onClick={handleOpen}>{title} 
                <img id="img" src={image} alt="island pic"/>
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
                <Button variant="contained"
                    onClick={() => {
                        "Completed"; 
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
    title: PropTypes.string,
    image: PropTypes.string 
}

export default MilestoneButton  
/*
Finished creating the popup 
Later: include button/external links to the popup 
*/