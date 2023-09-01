import React from 'react';
import {
  IconButton, Box,
} from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Calendar from '../Calendar/Calendar';
import ProfilePopup from '../Profile/ProfilePopup';
import './JobseekerNav.css';

const style = {
  buttons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 0,
  },
  iconStyle: {
    boxShadow: '0px 2px 8px rgba(68, 87, 82, 0.25)',
  },
  iconStyle2: {
    boxShadow: '0px 2px 8px rgba(68, 87, 82, 0.25)',
  },
  buttonStyle: {
    color: '#484649',
    borderRadius: '1em',
    boxSizing: 'border-box',
    fontSize: '2em',
    width: '80%',
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
    if (prevOpen1.current === true && open1 === false) {
      if (anchorRef1.current) {
        anchorRef1.current.focus();
      }
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
            id="composition-button-one"
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
            id="composition-button-two"
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
