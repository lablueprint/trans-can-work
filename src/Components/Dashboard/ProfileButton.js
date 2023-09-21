/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { IconButton, Avatar, StylesProvider } from '@material-ui/core';
import { PropTypes } from 'prop-types';
// eslint-disable-next-line import/no-unresolved
import './ProfileButton.css';
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
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { updateUser, deleteUser } from '../../Services/user-service';

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
  id, profileName, workField, email, icon, accountType, isArchived, isApproved, isAdmin,
  editField, bookmarked, deleteAccount, userEmail,
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
  const archive = () => {
    editField(id, 'archived', !isArchived);
    updateUser(email, { archived: !isArchived });
  };

  const approve = () => {
    editField(id, 'approved', !isApproved);
    updateUser(email, { approved: !isApproved });
  };

  const bookmark = () => {
    console.log(bookmarked);
    editField(id, 'bookmarked', !bookmarked);
    if (!bookmarked) {
      updateUser(userEmail, { bookmarked: arrayUnion(email) });
    } else {
      updateUser(userEmail, { bookmarked: arrayRemove(email) });
    }
  };

  const deleteSeeker = () => {
    deleteAccount(id);
    deleteUser(email, accountType);
  };

  // items for the drop down menu
  const menuOptions = [
    {
      label: 'Archive',
      fx: archive,
      icon: <FolderOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Unarchive',
      fx: archive,
      icon: <FolderOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Re-assign',
      // eventually add reassign popup trigger here
      fx: () => { console.log('reassign'); },
      icon: <PersonOutlineOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Approve',
      fx: approve,
      icon: <CheckIcon fontSize="small" />,
    },
    {
      label: 'Delete',
      fx: deleteSeeker,
      icon: <DeleteOutlineOutlinedIcon fontSize="small" />,
    },
    {
      label: 'Download',
      // eventually add download function here
      fx: () => { console.log('download'); },
      icon: <DownloadIcon fontSize="small" />,
    },
  ];

  // different set of menu items dependent on the tab
  const reduceMenuItems = () => {
    const items = [];
    if (isAdmin) {
      items.push('Delete');
    }

    if (!isApproved) {
      items.push('Approve');
    } else if (isArchived) {
      items.push('Unarchive');
    } else {
      items.push('Download');
      if (accountType === 'jobseeker') {
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
    color = 'profile-button-navigator-bg';
  } else if (isArchived === true) {
    color = 'profile-button-archived-bg';
  } else {
    color = 'profile-button-unarchived-bg';
  }

  const viewProfileLink = accountType === 'jobseeker' ? `/clientRoadmap/${email}` : `/navigator/${email}`;

  return (
    <div className={`profile-button-outer-container ${color}`}>
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
      <div className="profile-button-text-container">
        <p className="profile-button-name-text">{profileName}</p>
        <p className="profile-button-job-text">{workField}</p>
        {!isArchived && <Link className="profile-button-view-link" to={viewProfileLink}>View Profile</Link>}
      </div>
      <div className="profile-button-button-container">
        <IconButton
          id="bookmark"
          onClick={bookmark}
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
              padding: 0.10,
              backgroundColor: 'white',
            },
          }}
          MenuListProps={{
            'aria-labelledby': 'options',
            sx: { py: 0, color: '#111111' },
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
  email: PropTypes.string.isRequired,
  accountType: PropTypes.string.isRequired,
  isArchived: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isApproved: PropTypes.bool.isRequired,
  bookmarked: PropTypes.bool.isRequired,
  icon: PropTypes.string,
  editField: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  userEmail: PropTypes.string.isRequired,
};

ProfileButton.defaultProps = {
  icon: undefined,
  workField: '',
};
