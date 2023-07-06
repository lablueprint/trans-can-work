import React from 'react';
import {
  IconButton, Box,
} from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Calendar from '../Calendar/Calendar';
import ProfilePopup from '../Profile/ProfilePopup';

const style = {
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 0,
  },
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
  iconStyle2: {
    background: '#FFFBFE',
    '&:hover': {
      background: '#FFFBFE',
    },
    boxShadow: '0px 2px 8px rgba(68, 87, 82, 0.25)',
    position: 'absolute',
    width: '80px',
    height: '80px',
    right: '44px',
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
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const anchorRef1 = React.useRef(null);
  const anchorRef2 = React.useRef(null);

  const handleToggle1 = () => {
    setOpen1((prevOpen1) => !prevOpen1);
  };

  const handleToggle2 = () => {
    setOpen2((prevOpen2) => !prevOpen2);
  };

  const handleClose1 = (event) => {
    if (
      anchorRef1.current
      && anchorRef1.current.contains(event.target)
    ) {
      return;
    }
    setOpen1(false);
  };

  const handleClose2 = (event) => {
    if (
      anchorRef2.current
      && anchorRef2.current.contains(event.target)
    ) {
      return;
    }
    setOpen2(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen1 = React.useRef(open1);
  React.useEffect(() => {
<<<<<<< HEAD
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
=======
    if (prevOpen1.current === true && open1 === false) {
      if (anchorRef1.current) {
        anchorRef1.current.focus();
      }
>>>>>>> 77d5c1ff62eda519b4db02efbf0983c121971635
    }

    prevOpen1.current = open1;
  }, [open1]);

  const prevOpen2 = React.useRef(open2);
  React.useEffect(() => {
    if (prevOpen2.current === true && open2 === false) {
      if (anchorRef2.current) {
        anchorRef2.current.focus();
      }
    }

    prevOpen2.current = open1;
  }, [open2]);

  return (
    <div style={style.buttons}>
      <div id="child">
        <Box ref={anchorRef1} onClick={handleToggle1}>
          <IconButton
            id="composition-button"
            aria-controls={open1 ? 'composition-menu' : undefined}
            aria-expanded={open1 ? 'true' : undefined}
            aria-haspopup="true"
            size="large"
            sx={style.iconStyle}
          >
            <CalendarMonthRoundedIcon sx={style.buttonStyle} />
          </IconButton>
        </Box>
        <Calendar open={open1} handleClose={handleClose1} />
      </div>
      <div id="child">
        <Box ref={anchorRef2} onClick={handleToggle2}>
          <IconButton
            id="composition-button"
            aria-controls={open2 ? 'composition-menu' : undefined}
            aria-expanded={open2 ? 'true' : undefined}
            aria-haspopup="true"
            size="large"
            sx={style.iconStyle2}
          >
            <AccountCircleIcon sx={style.buttonStyle} />
          </IconButton>
        </Box>
        <ProfilePopup open={open2} handleClose={handleClose2} />
      </div>
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
