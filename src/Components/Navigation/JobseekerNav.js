import React from 'react';
import {
  IconButton, Box,
} from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import Calendar from '../calendar';

const style = {
  iconStyle: {
    background: '#FFFBFE',
    '&:hover': {
      background: '#FFFBFE',
    },
    boxShadow: '0px 2px 8px rgba(68, 87, 82, 0.25)',
    position: 'absolute',
    width: '80px',
    height: '80px',
    left: '44px',
    top: '44px',
  },
  buttonStyle: {
    padding: 0.8,
    background: '#FFFBFE',
    color: '#484649',
    borderRadius: '1em',
    boxSizing: 'border-box',
    fontSize: '2em',
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
    <div id="child">
      <Box ref={anchorRef} onClick={handleToggle}>
        <IconButton
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          size="large"
          sx={style.iconStyle}
        >
          <CalendarMonthRoundedIcon sx={style.buttonStyle} />
        </IconButton>
      </Box>
      <Calendar open={open} handleClose={handleClose} />
      {/* <JobseekerMenu open={open} handleClose={handleClose} /> */}
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
