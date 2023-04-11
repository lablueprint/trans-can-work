import React from 'react';
import {
  IconButton, Chip, Box,
} from '@mui/material';
import { GridViewRounded } from '@mui/icons-material';
import JobseekerMenu from './JobseekerMenu';

const style = {
  iconStyle: {
    background: '#FFFBFE',
    '&:hover': {
      background: '#FFFBFE',
    },
  },
  buttonStyle: {
    padding: 0,
    background: '#FFFBFE',
    borderRadius: '1em',
    boxSizing: 'border-box',
    fontSize: '2em',
  },
  chipStyle: {
    backgroundColor: '#FFFBFE',
    fontFamily: 'Montserrat',
  },
};

function JobseekerNav() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      anchorRef.current
      && anchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div>
      <Box ref={anchorRef} onClick={handleToggle}>
        <IconButton
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          size="large"
          sx={style.iconStyle}
        >
          <GridViewRounded sx={style.buttonStyle} />
        </IconButton>
        <div>
          <Chip label="MENU" sx={style.chipStyle} />
        </div>
      </Box>
      <JobseekerMenu open={open} handleClose={handleClose} />
    </div>
  );
}

export default JobseekerNav;
/* NOTES
    Nav for Jobseeker view
        - button thing that pops up a list of links to stuff
        - https://mui.com/material-ui/react-dialog/#transitions

    IGNORING STYLING FOR NOW
*/
