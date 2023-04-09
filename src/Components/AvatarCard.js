import { Card, CardContent, Typography, Paper, Avatar} from '@mui/material';
import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { db } from "../Components/firebase";
import { collection, doc, setDoc, update, deleteDoc } from "firebase/firestore";
import "./AvatarCard.css"

const options = [
  'Unarchive',
  'Delete',
];

function AvatarCard({user, archivedUsers, setArchivedUsers}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    
    setAnchorEl(event.currentTarget);
  };

  const updateArchived = async (id) => {
    const Ref = doc(db, 'jobseekers', id);
    setDoc(Ref, { archived: false }, { merge: true });
  }

  const deleteDocument = async (id) => {
    await deleteDoc(doc(db, 'jobseekers', id));
  }

  const handleClose = async (index) => {
    if (index == 0)
    {
      await updateArchived(user.id)
      const newUsers = archivedUsers.filter( seeker => seeker.id !== user.id)
      setArchivedUsers(newUsers)
    }


    if (index == 1)
    {
      await deleteDocument(user.id)
      const newUsers = archivedUsers.filter( seeker => seeker.id !== user.id)
      setArchivedUsers(newUsers)
    }
    setAnchorEl(null);
  };

    const name = user.data.name
    const field = user.data['field of work']
    return (
      <Paper className="Contents" elevation={3} rounded>
        <div className="Avatar">
          <Avatar>{name.substring(0, 1).toUpperCase()}</Avatar> 
        </div>
        <div className='Info'>
          <p className='Name'>{name}</p>
          <p className='Field'>{field}</p>
        </div>
        <div className='Menu'>
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
              <MenuItem key={option} onClick={() => {handleClose(index)}}>
                {option}
              </MenuItem>
            ))}
          </Menu>
        </div>
      </Paper>
      
    );
  }
  export default AvatarCard;