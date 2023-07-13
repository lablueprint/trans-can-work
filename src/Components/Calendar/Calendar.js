import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  doc, getDoc,
} from 'firebase/firestore';
import { Dialog, Slide, IconButton } from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import Divider from '@mui/material/Divider';
import firebase from '../../firebase';

const db = firebase;

const style = {
  dialog: {
    borderRadius: '5em',
  },
  button: {
    margin: '2vh 1.5vw 0 0',
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  header: {
    padding: '0 10vw 3vh 10vw',
    textAlign: 'center',
    fontFamily: 'Pirate',
    fontSize: '2.9rem',
    textTransform: 'capitalize',
    color: '#484649',

  },
  calendar: {
    padding: '5vw',
  },
};

const Transition = React.forwardRef((props, ref) => <Slide direction="right" ref={ref} {...props} />);

function Calendar({ open, handleClose }) {
  const [calendarId, setCalendarId] = useState('');
  const [timeZone, setTimeZone] = useState('');
  async function fetchData() {
    const docRef = doc(db, 'resources', 'calendar');
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCalendarId(docSnap.data()['Internship Calendar']);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  return (
    <div className="calendar-popup">
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          style: style.dialog,
        }}
      >
        <div className="close-btn" style={style.button}>
          <IconButton
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            size="large"
            onClick={handleClose}
          >
            <CloseRounded />
          </IconButton>
        </div>
        <div style={style.header}>
          <h3>
            TCW Events
            <br />
            Calendar
          </h3>
        </div>
        <div>
          <Divider variant="middle" sx={{ borderBottomWidth: '0.15em' }} />
        </div>
        <div className="popup-content" style={style.calendar}>
          <iframe
            src={`https://calendar.google.com/calendar/embed?src=${calendarId}&ctz=${timeZone}&mode=MONTH`}
            style={{
              border: '0', width: '100%', height: '25em', frameborder: '0', scrolling: 'no',
            }}
            title="Calendar"
          />
        </div>
      </Dialog>
    </div>
  );
}

export default Calendar;

Calendar.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
