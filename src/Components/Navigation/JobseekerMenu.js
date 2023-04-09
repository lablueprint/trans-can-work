import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog, Slide, List, ListItem, ListItemButton,
} from '@mui/material';
import { Link } from 'react-router-dom';

const options = [
  { name: 'Assessment', link: '/assessment' },
  { name: 'Online Profiles', link: '/onlineprofiles' },
  { name: 'Training Programs', link: '/assessment' },
  { name: 'Co-Enroll', link: '/assessment' },
  { name: 'Workshops', link: '/assessment' },
  { name: 'Internships', link: '/assessment' },
  { name: 'Job Fairs', link: '/assessment' },
  { name: 'Job Boards', link: '/assessment' },
  { name: 'Resources', link: '/assessment' },
  { name: 'Hiring Info', link: '/assessment' },
];

const Transition = React.forwardRef((props, ref) => <Slide direction="right" ref={ref} {...props} />);

function JobseekerMenu({ open, handleClose }) {
  const links = options.map((x) => (
    <ListItem disableGutters key={x.name}>
      <ListItemButton>
        <Link to={x.link}>
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
    >
      <List>
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
