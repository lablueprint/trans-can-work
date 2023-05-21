/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
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
  id, profileName, workField, jobseekerEmail, icon, accountType, isArchived, isApproved, isAdmin,
  editField, bookmarked, deleteAccount,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const open = Boolean(anchorEl);

  const openOptions = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const closeOptions = () => {
    setAnchorEl(null);
  };

  // change frontend ver too!
  // handlers for drop down menu actions
  const archiveJobseeker = () => {
    editField(id, 'archived', !isArchived);
  };

  const bookmarkJobseeker = () => {
    editField(id, 'bookmarked', !bookmarked);
  };

  const deleteSeeker = () => {
    deleteAccount(id);
  };

  // items for the drop down menu
  const menuOptions = [
    {
      label: 'Archive',
      fx: archiveJobseeker,
      icon: <FolderOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Unarchive',
      fx: archiveJobseeker,
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
      fx: deleteSeeker,
      icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Download',
      fx: () => { console.log('download'); },
      icon: <DownloadIcon fontSize="small" />,
    },
  ];

  // different set of menu items dependent on the tab
  const reduceMenuItems = () => {
    let items = [];
    if (!isApproved) {
      items = ['Approve', 'Delete'];
    } else if (isArchived) {
      items = ['Unarchive', 'Delete'];
    } else {
      items = ['Delete', 'Download'];
      if (accountType === 'client') {
        items.push('Archive');
        if (isAdmin) {
          items.push('Re-assign');
        }
      }
    }
    return menuOptions.filter((item) => items.includes(item.label));
  };

  useEffect(() => {
    setMenuItems(reduceMenuItems());
  }, [isArchived, isApproved, isAdmin]);

  // styling for button dependent on type of account
  let color;

  if (accountType === 'navigator' && isApproved === true) {
    color = 'navigator-bg';
  } else if (isArchived === true) {
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
        {!isArchived && <Link className="view-profile-link" to="/profile">View Profile</Link>}
      </div>
      <div className="button-container">
        <IconButton
          id="bookmark"
          onClick={bookmarkJobseeker}
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
            <MenuItem
              key={uuidv4()}
              onClick={element.fx}
            >
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
  id: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  workField: PropTypes.string,
  jobseekerEmail: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
  isArchived: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isApproved: PropTypes.bool.isRequired,
  bookmarked: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  editField: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

ProfileButton.defaultProps = {
  icon: undefined,
  workField: '',
};
