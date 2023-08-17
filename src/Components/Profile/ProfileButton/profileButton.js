import React, { useState, useEffect } from 'react';
import { Button, Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import './profileButton.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { fetchJobseeker, updateJobseeker, deleteJobseeker } from '../../../Services/jobseeker-service';

function ProfileButton(props) {
  const {
    jobseekerEmail,
  } = props;
  const [name, setName] = useState('');
  const [field, setField] = useState('');
  const [archived, setArchived] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const logquery = async () => {
      const query = await fetchJobseeker(jobseekerEmail);
      setName(query.data().name);
      setField(query.data()['field of work']);
      setArchived(query.data().archive);
    };

    logquery();
  }, []);

  // for modal functionality later
  // const handleOpen = () => {
  //   setViewProfile(true);
  // };
  // const handleClose = () => {
  //   setViewProfile(false);
  // };

  const openOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeOptions = () => {
    setAnchorEl(null);
  };

  const archiveJobseeker = () => {
    updateJobseeker(jobseekerEmail, { archive: true });
    setArchived(true);
  };

  const bookmarkJobseeker = () => {
    updateJobseeker(jobseekerEmail, { boookmark: true });
  };

  const unarchiveJobseeker = () => {
    updateJobseeker(jobseekerEmail, { archive: false });
    setArchived(false);
  };

  const deleteSeeker = () => {
    deleteJobseeker(jobseekerEmail);
  };

  if (archived) {
    return (
      <div className="outer-container-archive">
        <div className="container">
          <Avatar
            facebookId="100008343750912"
            style={{
              height: '68px',
              width: '68px',
              marginTop: '6px',
              marginBottom: '6px',
              marginLeft: '6px',
            }}
          />
        </div>
        <br />
        <div className="container2">
          <text>{name}</text>
          <text>{field}</text>
          <Link to="/profile">View Profile</Link>
          {/* MODAL STUFF FOR LATER FUNCTIONALITY
          <Button onClick={handleOpen}>View Profile</Button>
          <Modal
            open={viewProfile}
            onClose={handleClose}
          >
            <Button onClick={handleClose}>close</Button>
          </Modal> */}
        </div>
        <div className="options" style={{ justifyContent: 'right' }}>
          <Button
            id="options"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={openOptions}
          >
            ...
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={closeOptions}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={unarchiveJobseeker}>Unarchive</MenuItem>
            <MenuItem onClick={deleteSeeker}>Delete</MenuItem>
          </Menu>
        </div>
      </div>
    );
  }
  return (
    <div className="outer-container">
      <div className="container">
        <Avatar
          facebookId="100008343750912"
          style={{
            height: '68px',
            width: '68px',
            marginTop: '6px',
            marginBottom: '6px',
            marginLeft: '6px',
          }}
        />
      </div>
      <br />
      <div className="container2">
        <text>{name}</text>
        <text>{field}</text>
        <Link to="/profile">View Profile</Link>
        {/* MODAL STUFF SAVE FOR LATER
        <Button onClick={handleOpen}>View Profile</Button>
        <Modal
          open={viewProfile}
          onClose={handleClose}
        >
          <Button onClick={handleClose}>close</Button>
        </Modal> */}
      </div>
      <div style={{ justifyContent: 'right' }}>
        <Button
          id="options"
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={openOptions}
        >
          ...
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={closeOptions}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={archiveJobseeker}>Archive</MenuItem>
          <MenuItem onClick={bookmarkJobseeker}>Bookmark</MenuItem>
          <MenuItem onClick={deleteSeeker}>Delete</MenuItem>
        </Menu>
      </div>
    </div>
  );
}

export default ProfileButton;

ProfileButton.propTypes = {
  jobseekerEmail: PropTypes.string.isRequired,
};
