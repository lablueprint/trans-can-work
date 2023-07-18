import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, RadioGroup, Slide, Radio,
} from '@mui/material';
import './archivePopup.css';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@mui/icons-material';
import { getDocs, collection } from 'firebase/firestore';
// import Avatar from 'react-avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
// import MuiCheckbox from '@mui/material/Checkbox';
// import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
// import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Button } from 'react-bootstrap';
import firebase from '../firebase';
// import NavigatorCard from './navigatorCard';

const styles = {
  avatar: {
    width: '5em',
    height: '5em',
    backgroundColor: 'white',
    boxShadow: '0px 0.5em 0.75em rgba(0, 0, 0, 0.5)',

  },
  containerSection: {
    maxHeight: '7em',
    overflowY: 'scroll',
  },
  close: {
    width: '20',
    height: '20',
  },
  profileButton: {
    backgroundColor: '#d3d3d3',
    width: '35',
    height: '35',
  },
  divider: {
    marginBottom: '2em',
    borderBottomWidth: '0.15em',
  },
  email: {
    marginTop: '6.5em',
  },
  done: {
    textTransform: 'None',
    color: '#484649',
    fontFamily: 'Montserrat',
    maxWidth: '5em',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  colorPopup: {
    margin: '50%',
  },
  confirm: {
    height: '63px',
    width: '172px',
    borderColor: '#000DC8',
    borderRadius: '5px',
    backgroundColor: '#FFFBFE',
  },
  confirmText: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
};
const Transition = React.forwardRef((props, ref) => (
  <Slide direction="right" ref={ref} {...props} />
));

/* TODO:
  - Dynamically pull navigator from backend
  - once backend is setup, modify buttons so that changes are only propagated to
  backend if the check button is pressed
  - Add change profile pic functionality once designs done
  - only display password if the user isnt signed in with google */
function ArchivePopup({
  open,
  handleClose,
}) {
  const db = firebase;
  const [navigators, setNagivators] = useState([]);

  // const [profilePic, setProfilePic] = useState('');
  //   const [bg, setBg] = useState('');

  // const [selectedValue, setSelectedValue] = React.useState('a');

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedValue(event.target.value);
  // };

  const fetchNavigators = async () => {
    const colRef = collection(db, 'navigators');
    try {
      const docsSnap = await getDocs(colRef);
      // use docsSnap.docs.map(doc => doc.data());
      return docsSnap;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  };

  useEffect(() => {
    const logquery = async () => {
      const query = await fetchNavigators();
      console.log(query);
      const nvgtrs = [];
      query.forEach((element) => {
        const elem = {
          name: element.data().name,
          id: `${element.data().name}id`,
        };
        nvgtrs.push(elem);
        console.log(elem);
      });
      setNagivators(nvgtrs);
    };

    /*
    .then((docs) => {
      docs.forEach(async (doc) => {
        await setEmailList((e) => [...e, doc.id]);
      });
    });
    */
    console.log('i fire once');
    logquery();
  }, []);

  //   const handleClick = (color) => {
  //     const data = {
  //       color,
  //     };
  //     setDoc(docRef, data, { merge: true })
  //       .then(() => {
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //     setBg(color);
  //   };

  //   const handleToggleShowPassword = () => {
  //     setShowPassword(!showPassword);
  //   };

  // pass in navigator and set navigator, whenever the button for radio thing
  // is clicked (in the component) set navigator
  // on confirm want to submit the navigator

  // to make sure only one is clicked
  //
  return (
    <div className="containerSection" style={styles.containerSection}>
      <Dialog
        className="popup"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="xs"
        PaperProps={{
          style: {
            borderRadius: 30,
            maxHeight: '679px',
            maxWidth: '471px',
            minWidth: '471px',
            backgroundColor: '#FFFBFE',
            padding: '2em',
          },
        }}
        sx={{
          // minHeight: '100px',
          // maxWidth: '100px',
        }}
      >
        <div className="closebuttonSection">
          <IconButton
            onClick={handleClose}
            // sx={{
            //   backgroundColor: '#000000',
            // }}
          >
            <Close />
          </IconButton>
        </div>
        <div className="title">
          Navigators
        </div>
        <RadioGroup>
          {navigators.map((element) => (
            <FormControlLabel
              value={element.id}
              control={<Radio />}
              label={element.name}
              style={{
                marginTop: '1.5em',
                borderBottom: '1px solid #CAC4D0',
              }}
            />
          ))}
        </RadioGroup>
        <Button
          variant="outlined"
          style={{
            height: '63px',
            width: '172px',
            borderColor: '#000DC8',
            borderRadius: '5px',
            backgroundColor: '#FFFBFE',
          }}
        >
          {' '}
          <p style={styles.confirmText}>Confirm</p>
          {' '}
        </Button>
      </Dialog>

    </div>
  );
}

export default ArchivePopup;

ArchivePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
