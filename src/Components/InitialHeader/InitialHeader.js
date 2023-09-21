import React from 'react';
import Box from '@mui/material/Box';
import Avatar from 'react-avatar';
import { useSelector } from 'react-redux';
import './InitialHeader.css';
import '../Navigation/NavMenu.css';

function InitialHeader() {
  const store = useSelector((state) => state.auth.value);

  return (
    <div>
      <div className="headers">
        <Box sx={{ borderBottom: 1, borderColor: 'divider', boxShadow: '0 4px 4px #c9c9c9' }}>
          <div className="all-header-items">
            <div className="align-helper-initial">
              <div className="username-text">
                {`${store.user.firstName} ${store.user.lastName}`}
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
            <div className="bottom-header-contents">
              <div className="username-text-roadmap">
                {`${store.user.firstName} ${store.user.lastName}`}
                &apos;s Assessment
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
}
export default InitialHeader;
