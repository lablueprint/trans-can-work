import React from 'react';
import Box from '@mui/material/Box';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Back from '../../Assets/back.svg';
import './Header.css';

function Header() {
  const store = useSelector((state) => state.auth.value);
  return (
    <div>
      <div className="headers">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', boxShadow: '0 4px 4px #c9c9c9' }}>
          <div className="all-header-items">
            <div className="left-header-contents">
              <div className="go-back">
                <Link
                  to="/dashboard"
                  className="assessment-page-back-text"
                >
                  <img
                    src={Back}
                    alt="back-pointing arrow"
                    className="go-back-arrow"
                  />
                  Return to Clients List
                </Link>
              </div>
              <div className="username-text-roadmap">
                {store.user.firstName + store.user.lastName}
                &apos;s Roadmap
              </div>
            </div>
            <div className="right-header-contents">
              <div className="align-helper">
                <div className="username-text">
                  {store.user.firstName + store.user.lastName}
                </div>
                <Avatar
                  facebookId="100008343750912"
                  size="40"
                  styles={{
                    height: '2em',
                    width: '2em',
                    marginTop: '6px',
                    marginBottom: '6px',
                    marginLeft: '6px',
                  }}
                  round
                />
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
export default Header;
