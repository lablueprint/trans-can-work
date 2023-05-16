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
import { db } from './firebase';
import './AvatarCard.css';

// import AuthURIRedirect from '../Services/authURI';

const options = [
  'Download',
  'Unarchive',
  'Delete',
];

function AvatarCard({ user, archivedUsers, setArchivedUsers }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const updateArchived = async (id) => {
    const Ref = doc(db, 'jobseekers', id);
    setDoc(Ref, { archived: false }, { merge: true });
  };

  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, 'jobseekers', id));
  };

  const downloadData = async () => {
    // AuthURIRedirect();

    // const docId = 'jobseeker-document-id';

    // // Authenticate the user
    // const auth = new google.auth.GoogleAuth({
    //   scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    // });
    // const authClient = await auth.getClient();

    // // Retrieve data from Firestore
    // const docRef = firestore.collection('trans-can-work').doc(docId);
    // const doc = await docRef.get();

    // // Create a new Google Sheet and add the data to it
    // const sheets = google.sheets({ version: 'v4', auth: authClient });
    // const spreadsheet = await sheets.spreadsheets.create({
    //   requestBody: {
    //     properties: {
    //       title: 'jobseeker-email',
    //     },
    //   },
    // });
    // const values = [Object.values(doc.data())];
    // await sheets.spreadsheets.values.append({
    //   spreadsheetId: spreadsheet.data.spreadsheetId,
    //   range: 'Sheet1!A1',
    //   valueInputOption: 'RAW',
    //   requestBody: {
    //     values,
    //   },
    // });
  };

  const handleClose = async (index) => {
    if (index === 0) {
      downloadData();
    }
    if (index === 1) {
      await updateArchived(user.id);
      const newUsers = archivedUsers.filter((seeker) => seeker.id !== user.id);
      setArchivedUsers(newUsers);
    }

    if (index === 2) {
      await deleteDocument(user.id);
      const newUsers = archivedUsers.filter((seeker) => seeker.id !== user.id);
      setArchivedUsers(newUsers);
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
export default AvatarCard;
