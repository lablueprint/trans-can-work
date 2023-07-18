import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, Slide, List, ListItem, ListItemButton, IconButton,
} from '@mui/material';
import { CloseRounded } from '@mui/icons-material';
import { Link } from 'react-router-dom';

import './NavMenu.css';

const options = [
  { name: 'Assessment', link: '/assessment' },
  { name: 'Online Profiles', link: '/onlineprofiles' },
  { name: 'Training Programs', link: '/training' },
  { name: 'Co-Enroll', link: '/assessment' },
  { name: 'Workshops', link: '/workshops' },
  { name: 'Internships', link: '/internships' },
  { name: 'Job Fairs', link: '/assessment' },
  { name: 'Job Boards', link: '/assessment' },
  { name: 'Resources', link: '/assessment' },
  { name: 'Hiring Info', link: '/assessment' },
];

const style = {
  dialog: {
    borderRadius: '50px',
  },
  menu: {
    width: '22vw',
    paddingTop: 0,
  },
  listItem: {
    paddingTop: 0,
  },
  link: {
    fontFamily: 'Montserrat',
    fontColor: '#484649',
    color: '#484649',
    textDecoration: 'None',
    fontSize: '1.4em',
    paddingLeft: '1rem',
  },
  button: {
    display: 'flex',
    flexDirection: 'row-reverse',
    margin: '2vh 1.5vw 0 0',
  },
};

const Transition = React.forwardRef((props, ref) => <Slide direction="right" ref={ref} {...props} />);

function JobseekerMenu({ open, handleClose }) {
  const links = options.map((x) => (
    <ListItem disableGutters key={x.name} sx={style.listItem}>
      <ListItemButton>
        <Link to={x.link} style={style.link}>
          {x.name}
        </Link>
      </ListItemButton>
    </ListItem>
  ));
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      PaperProps={{
        style: style.dialog,
      }}
    >
      <div style={style.button}>
        <IconButton
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          size="large"
          onClick={handleClose}
        >
          <CloseRounded />
        </IconButton>
      </div>
      <List sx={style.menu}>
        {links}
      </List>
    </Dialog>
  );
}

export default JobseekerMenu;

JobseekerMenu.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
