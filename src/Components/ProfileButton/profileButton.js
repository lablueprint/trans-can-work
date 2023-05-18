/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { IconButton, Avatar, StylesProvider } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import './profileButton.css';
import {
  Menu, MenuItem, ListItemIcon, ListItemText,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import CheckIcon from '@mui/icons-material/Check';
import DownloadIcon from '@mui/icons-material/Download';
import { fetchJobseeker, updateJobseeker, deleteJobseeker } from '../../Services/jobseeker-service';

const styles = {
  avatar: {
    height: '2em',
    width: '2em',
    marginLeft: '.75em',
    marginRight: '.75em',
  },
  menuText: {
    fontFamily: 'Montserrat',
    fontWeight: 400,
    fontSize: '.75em',
    lineHeight: '18px',
    color: '#111111',
  },
};

function ProfileButton({
  profileName, workField, profileArchived, jobseekerEmail, icon, accountType,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const open = Boolean(anchorEl);

  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  const openOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeOptions = () => {
    setAnchorEl(null);
  };

  // change frontend ver too!
  const archiveJobseeker = () => {
    updateJobseeker(jobseekerEmail, { archive: true });
  };

  const bookmarkJobseeker = () => {
    updateJobseeker(jobseekerEmail, { bookmark: true });
  };

  const unarchiveJobseeker = () => {
    updateJobseeker(jobseekerEmail, { archive: false });
  };

  const deleteSeeker = () => {
    deleteJobseeker(jobseekerEmail);
  };

  const menuItems = [
    {
      label: 'Archive',
      fx: archiveJobseeker,
      icon: <FolderOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Unarchive',
      fx: unarchiveJobseeker,
      icon: <FolderOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Re-assign',
      fx: () => { console.log('reassign'); },
      icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Approve',
      fx: () => { console.log('approve'); },
      icon: <CheckIcon fontSize="small" />,
    },
    {
      label: 'Delete',
      fx: deleteJobseeker,
      icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Download',
      fx: () => { console.log('download'); },
      icon: <DownloadIcon fontSize="small" />,
    },
  ];

  let color;

  if (accountType === 'navigator') {
    color = 'navigator-bg';
  } else if (profileArchived === true) {
    color = 'archived-bg';
  } else {
    color = 'unarchived-bg';
  }

  return (
    <div className={`outer-container ${color}`}>
      {icon === undefined
        ? (
          <Avatar
            facebookId="100008343750912"
            style={styles.avatar}
          />
        ) : (
          <Avatar
            src={icon}
            style={styles.avatar}
          />
        )}
      <br />
      <div className="text-container">
        <p className="name-text">{profileName}</p>
        <p className="job-text">{workField}</p>
        {!profileArchived && <Link className="view-profile-link" to="/profile">View Profile</Link>}
      </div>
      <div className="button-container">
        <IconButton
          id="bookmark"
          onClick={handleBookmark}
          size="small"
        >
          {bookmarked ? <BookmarkIcon /> : <BookmarkBorderIcon /> }
        </IconButton>
        <IconButton
          id="options"
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          onClick={openOptions}
          size="small"
        >
          <MoreHorizIcon fontSize="small" />
        </IconButton>
        <Menu
          id="profile-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={closeOptions}
          PaperProps={{
            style: {
              width: '10em',
            },
          }}
          MenuListProps={{
            'aria-labelledby': 'options',
            sx: { py: 0 },
          }}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {menuItems.map((element) => (
            <MenuItem onClick={element.fx}>
              <ListItemIcon>
                {element.icon}
              </ListItemIcon>
              <ListItemText primaryTypographyProps={styles.menuText}>
                {element.label}
              </ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}

export default ProfileButton;

ProfileButton.propTypes = {
  profileName: PropTypes.string.isRequired,
  workField: PropTypes.string.isRequired,
  profileArchived: PropTypes.bool.isRequired,
  jobseekerEmail: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.shape({
      uri: PropTypes.string,
      headers: PropTypes.objectOf(PropTypes.string),
    }),
    PropTypes.number,
    PropTypes.arrayOf(
      PropTypes.shape({
        uri: PropTypes.string,
        width: PropTypes.number,
        height: PropTypes.number,
        headers: PropTypes.objectOf(PropTypes.string),
      }),
    ),
  ]),
};

ProfileButton.defaultProps = {
  icon: undefined,
};
