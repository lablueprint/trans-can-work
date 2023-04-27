import {
  Paper, Avatar,
} from '@mui/material';
import React, { useState, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  doc, setDoc, deleteDoc,
} from 'firebase/firestore';
import { PropTypes } from 'prop-types';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import './AvatarCard.css';

// import { google } from 'googleapis';
// import { useAuthState } from 'react-firebase-hooks/auth';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth, db, firestore } from './firebase';

import {
  db, auth,
} from './firebase';

const options = [
  'Unarchive',
  'Delete',
  'Download',
];

// const window.googleDocCallback = function () { return true; };

function AvatarCard({ user, archivedUsers, setArchivedUsers }) {
  const CLIENTID = '309643493967-7i1u1sdkg51j85ai9vehms86hpf7d1op.apps.googleusercontent.com';
  const SCOPES = 'https://www.googleapis.com/auth/drive';

  const [anchorEl, setAnchorEl] = useState(null);
  const [authuser, setUser] = useState({});
  const [tokenClient, setTokenClient] = useState('');

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleCallbackResponse(response) {
    console.log(`Encoded JWT ID token: ${response.credential}`);
    const userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
  }

  const updateArchived = async (id) => {
    const Ref = doc(db, 'jobseekers', id);
    setDoc(Ref, { archived: false }, { merge: true });
  };

  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, 'jobseekers', id));
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: CLIENTID,
      callback: handleCallbackResponse,
    });

    setTokenClient(google.accounts.oauth2.initTokenClient({
      client_id: CLIENTID,
      scope: SCOPES,
      callback: (tokenResponse) => {
        console.log(tokenResponse);
        if (tokenResponse && tokenResponse.access_token) {
          fetch('https://www.googleapis.com/drive/v3/files', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
            body: JSON.stringify({ name: 'proxy attempt 2?', mimeType: 'application/vnd.google-apps.spreadsheet', parents: ['1MG53LIVLSKPadcTeoiKLSIkvZHKLWV0s'] }),
          }).then((res) => res.json()).then((val) => {
            console.log(val);
            const range = 'A1:F5';
            // fetch(`https://sheets.googleapis.com/v4/spreadsheets/${val.id}:batchUpdate`, {
            // &callback=googleDocCallback
            fetch(`https://tcw-proxy-google-server.onrender.com/sheets.googleapis.com/v4/spreadsheets/${val.id}/values/${range}`, {

              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenResponse.access_token}`,
                // 'Access-Control-Allow-Credentials': 'true',
                // 'Access-Control-Allow-Origin': 'http://localhost:3000',
              },
              body: JSON.stringify({
                values: [
                  [
                    'Name',
                    'Job',
                    'Pay',
                  ],
                  [
                    'Avnish',
                    'Developer at Oracle',
                    '120000',
                  ],
                  [
                    'Kaylee',
                    'Consultant',
                    '300000',
                  ],
                ],
                majorDimension: 'ROWS',
              }),
            });
          });
        }
      },
    }));

    google.accounts.id.prompt();
  }, []);

  // const createSpreadsheet = async (fileName) => {
  //   // const accessToken = ''; // insert access token method here;
  //   console.log('reached create spreadsheet');
  //   console.log(usertoken);
  //   fetch(`https://docs.googleapis.com/v1/documents?title=${fileName}`, {
  //     method: 'POST',
  //     headers: new Headers({ Authorization: `Bearer ${usertoken}` }),
  //   }).then((res) => res.json()).then((val) => {
  //     console.log(val);
  //     console.log(val.documentId);
  //     window.open(`https://docs.google.com/document/d/${val.documentId}/edit`, '_blank');
  //   });
  // };

  // const zerofill = (i) => (i < 10 ? '0' : '') + i;

  async function createSheet(data) {
    try {
      // credentials
      const authUser = await auth.currentUser;
      const authClient = await authUser.getIdToken();
      const sheets = google.sheets({ version: 'v4', auth: authClient }); // the error line.

      // create sheet
      const res = await sheets.spreadsheets.create({
        requestBody: {
          properties: { title: '**insert jobseeker name** info' },
          sheets: [
            {
              data: [
                {
                  rowData: data.map((item) => ({
                    values: [
                      { userEnteredValue: { stringValue: item.name } },
                      { userEnteredValue: { boolValue: item.isJobseeker } },
                      // etc
                    ],
                  })),
                },
              ],
            },
          ],
        },
      });

      // Return the URL of the new sheet
      return res.data.spreadsheetUrl;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  const createDriveFile = async () => {
    tokenClient.requestAccessToken();
    // console.log('User', user);
    // const docRef = doc(db, 'jobseekers', user.id);
    // try {
    //   const docSnap = await getDoc(docRef);
    //   if (docSnap.exists()) {
    //     console.log('Jobseeker: ', docSnap);
    //     const jobseekerData = docSnap.data();
    //     console.log(jobseekerData);

    //     const data = jobseekerData.skillsChecklist.map((item) => ({
    //       skill: item.name,
    //       value: item.isJobseeker ? 'Yes' : 'No',
    //     }));

    //     console.log(data);

    //     return docSnap;
    //   }
    //   console.log('Jobseeker ', user.id, ' does not exist');
    //   return null;
    // } catch (error) {
    //   console.log(error);
    //   return undefined;
    // }

    // const sheetUrl = await createSheet(user);

    // if (sheetUrl) {
    //   window.open(sheetUrl, '_blank');
    // } else {
    //   alert('Failed to export data');
    // }
  };

  const handleClose = async (index) => {
    if (index === 0) {
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
      createDriveFile();

      // google.accounts.id.renderButton(document.getElementById("signInDiv"), {theme: "outline", size: "large"});
      // await signInWithGoogleAndCreateDoc(); // whatever is necessary to get me access token.
      // // const date = new Date();
      // // const year = date.getFullyear();
      // // const month = zerofill(date.getMoneth() + 1);
      // // const day = zerofill(date.getDate());
      // // const currentDateString = `${year}-${month}-${day}`;
      // // const currentTimeString = date.toLocaleTimeString();
      // // createSpreadsheet(token, user.id + currentDateString + currentTimeString);
      // createSpreadsheet('Test Doc 1');
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
