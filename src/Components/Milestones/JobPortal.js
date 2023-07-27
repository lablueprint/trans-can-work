import React from 'react';
import './JobPortal.css';
import Button from '@mui/material/Button';

function JobPortal() {
  return (
    <div>
      <h6 className="jobPortal">Enter here for access to our Trans Can Work Job Portal.</h6>
      <Button
        disableRipple
        id="jobPortalButton"
      >
        Job Portal Link
      </Button>
    </div>
  );
}

export default JobPortal;
