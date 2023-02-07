/* eslint-disable react/no-unstable-nested-components */
import React, { useState, useEffect } from 'react';
import './Header.css';
import {
  NavLink, useLocation, useNavigate,
} from 'react-router-dom';
import {
  IconButton, MenuItem, Drawer, Box, Tabs, Tab, AppBar,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import Logo from '../../Assets/tcw.jpg';

const options = [
  { name: 'Home', nav: '/' },
  { name: 'My Profile', nav: '/profile' },
  { name: 'Milestone Map', nav: '/map' },
  { name: 'Jobs', nav: '/jobs' },
  { name: 'Contact Us', nav: '/contact' },
];

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

const styles = {
  drawerNavLink: {
    fontFamily: 'DM Sans',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '1.3rem',
    color: '#292929',
    paddingLeft: '2rem',
  },
  header: {
    background: 'white',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.1)',
    minHeight: '64px',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'space-between',
    alignItems: 'right',
    padding: '0 2%',
    zIndex: (theme) => theme.zIndex.drawer + 1,
    width: '30vw',  
    height: '100vh', 
    left: '0',
  },
  drawerContainer: {
    width: { xs: '100vw', sm: 300 },
    marginTop: { xs: '8rem', sm: '6rem' },
  },
  drawer: {
    display: { sm: 'block', md: 'none' },
    '& .MuiDrawer-paper': { boxSizing: 'border-box' },
  },
};

const HeaderTabs = styled(Tabs)({
  height: 'inherit',
  '& .MuiTabs-indicator': {
    backgroundColor: '#393EBA',
    height: '4px',

  },
});

const HeaderTab = styled((props) => <Tab disableRipple {...props} />)(
  {
    textTransform: 'none',
    fontFamily: 'Work Sans',
    fontWeight: 'normal',
    fontSize: '1rem',
    color: '##3F3F3F',
    height: 'inherit',
    margin: '8px auto',
    '&.Mui-selected': {
      fontWeight: 800,
      color: '#393EBA',
    },
  },
);

function Header() { 
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((last) => !last);
  };

  const location = useLocation();
  const navigate = useNavigate();

  const [[, currentRoot]] = location.pathname.matchAll(/^(\/[^/]*)/g);

  const drawer = (
    <Box
      role="presentation"
      onClick={handleDrawerToggle}
      sx={styles.drawerContainer}
    >
      {options.map((option) => (
        <NavLink
          to={option.nav}
          key={uuidv4()}
          onClick={handleDrawerToggle}
          className={({ isActive }) => (isActive ? 'active' : 'nav-style')}
        >
          <MenuItem
            sx={styles.drawerNavLink}
            key={option.name}
            onClick={handleDrawerToggle}
          >
            {option.name}
          </MenuItem>
        </NavLink>
      ))}
      <MenuItem sx={{ marginTop: '2rem' }} key="tck-url">
        <a className="tck-url" href="https://www.theconsciouskid.org">
          theconsciouskid.org
        </a>
        <NorthEastIcon sx={{ fontSize: '1rem' }} />
      </MenuItem>
    </Box>
  );

  const size = useWindowSize();
  return (
    <Box>
      <AppBar position="fixed" sx={styles.header}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? 'nav-link-active logo-img-container' : 'nav-link logo-img-container')}
        >
          <img src={Logo} className="logo" alt="Trans Can Work logo" />
        </NavLink>
        { size.width > 900 ? (
          <HeaderTabs value={currentRoot} orientation="vertical">
            {options.map((option) => (
              <HeaderTab
                key={uuidv4()}
                value={option.nav}
                onClick={() => navigate(option.nav)}
                label={option.name}
              />
            ))}
          </HeaderTabs>
        ) : (
          <IconButton
            id="long-button"
            onClick={handleDrawerToggle}
          >
            {mobileOpen
              ? <CloseIcon className="menu-icon" fontSize="large" />
              : <MenuRoundedIcon className="menu-icon" fontSize="large" />}
          </IconButton>
        )}
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={styles.drawer}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default Header;