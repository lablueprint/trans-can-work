import {
  Paper, Avatar,
} from '@mui/material';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  doc, setDoc, deleteDoc,
} from 'firebase/firestore';
import { PropTypes } from 'prop-types';
import userData from './SampleUserData.json';
import { db } from './firebase';
import './AvatarCard.css';

const options = [
  'Approve',
  'Unarchive',
  'Download',
  'Delete',
];

export default function AvatarCard({ user, archivedUsers, setArchivedUsers }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const approveUser = async (id) => {
    const Ref = doc(db, 'jobseekers', id);
    setDoc(Ref, { approval: true }, { merge: true });
  };
  const updateArchived = async (id) => {
    const Ref = doc(db, 'jobseekers', id);
    setDoc(Ref, { archived: false }, { merge: true });
  };

  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, 'jobseekers', id));
  };

  // for Download:
  const downloadFile = ({ data, fileName, fileType }) => {
    const blob = new Blob([data], { type: fileType });

    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const exportToCsv = () => {
    console.log(userData);
    const csv = ['User Information'];
    csv.push([`authenticName,${userData.authenticName}`]);
    csv.push([`pronouns,${userData.pronouns}`]);
    csv.push([`bio,${userData.bio}`]);
    csv.push([`role,${userData.role}`]);
    csv.push([`approved,${userData.approved}`]);
    csv.push([`uid,${userData.uid}`]);
    csv.push([`navigator,${userData.navigator}`]);
    csv.push([]);

    csv.push(['ClientInfo']);

    for (const key in userData.clientInfo) {
      const value = userData.clientInfo[key];
      csv.push([`${key},${value}`]);
    }
    csv.push([]);

    csv.push(['Skills Checklists:']);
    const skills = [];
    for (const key in userData.skillsChecklist) {
      const value = userData.skillsChecklist[key];
      if (value) {
        skills.push([`${key}`]);
      }
    }
    csv.push(skills.join(','));
    csv.push([]);

    csv.push(['Industry Interests:']);
    const ii = [];
    for (const key in userData.industryInterest) {
      const value = userData.industryInterest[key];
      if (value) {
        ii.push([`${key}`]);
      }
    }
    csv.push(ii.join(','));

    csv.push([]);
    csv.push(['Milestone Progress:']);
    for (const key in userData.milestones) {
      const value = userData.milestones[key];
      csv.push([`${key}, ${value}`]);
    }

    downloadFile({
      data: csv.join('\n'),
      fileName: 'aaron.csv',
      fileType: 'text/csv',
    });
  };

  const handleClose = async (index) => {
    if (index === 0) {
      await approveUser(user.id);
      await updateArchived(user.id);
      const newUsers = archivedUsers.filter((seeker) => seeker.id !== user.id);
      setArchivedUsers(newUsers);
    }

    if (index === 1) {
      await deleteDocument(user.id);
      const newUsers = archivedUsers.filter((seeker) => seeker.id !== user.id);
      setArchivedUsers(newUsers);
    }

    if (index === 2) {
      exportToCsv();
    }
    setAnchorEl(null);
  };

  const { name } = user.data;
  const field = user.data['field of work'];
  return (
    <Paper className="Contents" elevation={3} rounded>
      <div className="Avatar">
        <Avatar>{name.substring(0, 1).toUpperCase()}</Avatar>
      </div>
      <div className="Info">
        <p className="Name">{name}</p>
        <p className="Field">{field}</p>
      </div>
      <div className="Menu">
        <IconButton
          aria-label="more"
          id="long-button"
          aria-controls={open ? 'long-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            'aria-labelledby': 'long-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              maxHeight: 20 * 4.5,
              width: '20ch',
            },
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={option} onClick={() => { handleClose(index); }}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </Paper>

  );
}
AvatarCard.propTypes = {
  user: PropTypes.shape.isRequired,
  setArchivedUsers: PropTypes.func.isRequired,
  archivedUsers: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
