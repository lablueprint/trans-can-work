import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, RadioGroup, Slide, Radio, Typography,
} from '@mui/material';
import './archivePopup.css';
import IconButton from '@material-ui/core/IconButton';
import { Close } from '@mui/icons-material';

// import Avatar from 'react-avatar';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Button } from 'react-bootstrap';
import { updateUser, fetchUser } from '../Services/user-service';
import SearchBar from './SearchAndFiltering/SearchBar';

const dummyNavigators = [
  {
    id: 'harrystyles@gmail.com',
    approved: true,
    bio: 'i love tcq',
    firstName: 'Harry',
    lastName: 'Styles',
    jobseekers: [],
    phoneNumber: '6969',
    pronouns: 'he/him',
    role: 'navigator',
    bookmarked: [],
    archived: false,
  },
  {
    id: 'v@gmail.com',
    approved: true,
    bio: 'i love tcq',
    firstName: 'Taehyung',
    lastName: 'Kim',
    jobseekers: [],
    phoneNumber: '6969',
    pronouns: 'he/him',
    role: 'navigator',
    bookmarked: [],
    archived: false,
  },
  {
    id: 'jungkook@gmail.com',
    approved: true,
    bio: 'i love tcq',
    firstName: 'Jungkook',
    lastName: 'Jeon',
    jobseekers: [],
    phoneNumber: '6969',
    pronouns: 'he/him',
    role: 'navigator',
    bookmarked: [],
    archived: false,
  },
  {
    id: 'jimin@gmail.com',
    approved: true,
    bio: 'i love tcq',
    firstName: 'Jimin',
    lastName: 'Park',
    jobseekers: [],
    phoneNumber: '6969',
    pronouns: 'he/him',
    role: 'navigator',
    bookmarked: [],
    archived: false,
  },
  {
    id: 'rm@gmail.com',
    approved: true,
    bio: 'i love tcq',
    firstName: 'Namjoon',
    lastName: 'Kim',
    jobseekers: [],
    phoneNumber: '6969',
    pronouns: 'he/him',
    role: 'navigator',
    bookmarked: [],
    archived: false,
  },
  {
    id: 'jin@gmail.com',
    approved: true,
    bio: 'i love tcq',
    firstName: 'Seokjin',
    lastName: 'Kim',
    jobseekers: [],
    phoneNumber: '6969',
    pronouns: 'he/him',
    role: 'navigator',
    bookmarked: [],
    archived: false,
  },
];

const dummyUser = {
  id: 'dbaliga@g.ucla.edu',
  approved: false,
  bio: '',
  firstName: '',
  lastName: '',
  navigator: '',
  phoneNumber: '',
  pronouns: '',
  role: 'jobseeker',
  lastEdit: '12/07/2002',
  complete: true,
  archived: false,
};

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
  // eslint-disable-next-line no-unused-vars
  const [navigators, setNagivators] = useState(dummyNavigators);
  const [filteredNavigators, setFilteredNavigators] = useState(dummyNavigators);

  // const [profilePic, setProfilePic] = useState('');
  //   const [bg, setBg] = useState('');

  const [selectedValue, setSelectedValue] = React.useState('if you see this first its wrong');
  const [searchTerms, setSearchTerms] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleconfirm = async () => {
    // update the jobseeker with their new navigator
    console.log(selectedValue);
    const diya = await fetchUser(dummyUser.id);
    console.log(diya.data());
    const changedData = { ...diya.data(), navigator: `${selectedValue}` };
    console.log(changedData);
    await updateUser(dummyUser.id, changedData);

    // add jobseeker to navigator's list
    const newNavigator = await fetchUser(selectedValue);
    console.log(newNavigator.data());
    const navigatorsArray = [...newNavigator.data().jobseekers];
    console.log(navigatorsArray);
    navigatorsArray.push(dummyUser.id);
    const newNavigatorData = { ...newNavigator.data(), jobseekers: navigatorsArray };
    console.log(newNavigatorData);
    await updateUser(selectedValue, newNavigatorData);
  };

  const search = (items) => {
    console.log('woo');
    if (searchTerms.length > 0) {
      console.log(searchTerms);
      const searchQuery = searchTerms.toLowerCase();
      console.log(searchQuery);
      return items.filter((element) => element.firstName.toLowerCase().startsWith(searchQuery));
    }
    return items;
  };

  useEffect(() => {
  }, [selectedValue]);

  useEffect(() => {
    console.log(searchTerms);
    setFilteredNavigators(search(navigators));
  }, [searchTerms]);

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
        <div className="search-bar-container">
          <SearchBar
            value={searchTerms}
            setValue={setSearchTerms}
            placeholder="Search here!"
          />
        </div>
        <RadioGroup
          style={{
            width: '95%',
            margin: 'auto',
            marginBottom: '',
          }}
        >
          {filteredNavigators.map((element) => (
            <FormControlLabel
              value={element.id}
              control={(
                <Radio />
)}
              labelPlacement="end"
              label={(
                <Typography
                  style={{
                    fontFamily: 'Montserrat',
                    fontWeight: 400,
                  }}
                >
                  {element.firstName}
                </Typography>
)}
              style={{
                display: 'flex',
                marginTop: '1em',
                borderBottom: '1px solid #CAC4D0',
                marginLeft: 0,
                marginRight: '0.5em',
                padding: '0.5em',
                paddingLeft: 0,
              }}
              onChange={(e) => handleChange(e)}
              sx={{
                labelPlacementStart: {
                  justifyContent: 'space-between',
                },
              }}
              className="form-label"

              // push id thingy to selected jobseeker's navigator field
              // update navigator with jobseeker
                // use real navigator objects, copy a few objects that have navigator role
                // just copy email as id
            />
          ))}
        </RadioGroup>
        <Button
          variant="outlined"
          onClick={handleconfirm}
          className="confirm"
          style={{
            marginTop: '3em',
            alignSelf: 'center',
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
