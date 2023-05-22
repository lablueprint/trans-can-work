import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Slide } from '@mui/material';
import './archivePopup.css';
// import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@mui/icons-material';
// import TextField from '@mui/material/TextField';
// import Divider from '@mui/material/Divider';
// import { InputAdornment } from '@material-ui/core';
// import { Visibility, VisibilityOff } from '@material-ui/icons';
import { getDocs, collection } from 'firebase/firestore';
// import navpic from '../Assets/powell_cat.svg';
import firebase from '../firebase';

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
  cancel: {
    backgroundColor: '#d3d3d3',
    width: '35',
    height: '35',
    right: '0.7em',
    top: '10',

  },
  confirm: {
    backgroundColor: '#d3d3d3',
    top: '10',
    left: '10,',
  },
  edit: {
    width: '20',
    height: '20',
    backgroundColor: '#d3d3d3',

  },
  mainEdit: {
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

  //   const [edit, setEdit] = useState(false);
  //   const [showPassword, setShowPassword] = useState(false);
  //   const [editBackground, setEditBackground] = useState(false);
  //   const [editProfilePic, setEditProfilePic] = useState(false);

  // const [profilePic, setProfilePic] = useState('');
  //   const [bg, setBg] = useState('');

  //   const [firstName, setFirstName] = useState('');
  //   const [lastName, setLastName] = useState('');
  //   const [pronouns, setPronouns] = useState('');
  //   const [bio, setBio] = useState('');

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
      query.forEach((element) => {
        const elem = {
          name: element.data().name,
        };
        navigators.push(elem);
        console.log(elem);
      });
    };

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
        PaperProps={{ style: { borderRadius: 30, maxHeight: '750px', maxWidth: '356px' } }}
      >
        <div className="buttonSection">
          <IconButton style={styles.confirm} onClick={handleClose} size="">
            <Close />
          </IconButton>
        </div>
        navigators
        {
            navigators.map((element) => `${element.name}\n`)
        }
        soemthing goes here

      </Dialog>

    </div>
  );
}

export default ArchivePopup;

ArchivePopup.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
