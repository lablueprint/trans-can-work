import React from 'react';
import './JobPortal.css';
import Button from '@mui/material/Button';

function JobPortal() {
  // const [isComplete, setComplete] = React.useState(false);
  // const toggleComplete = () => setComplete(!isComplete);
  return (
    <div>
      <h6 className="jobPortal">Enter here for access to our Trans Can Work Job Portal.</h6>
      <div className="jobPortal-row">
        <div>
          <Button
            disableRipple
            id="jobPortalButton"
          >
            Job Portal Link
          </Button>
        </div>

        {/* <div
          isComplete={isComplete}
          toggleComplete={toggleComplete}
        /> */}
      </div>
    </div>
  );
}

export default JobPortal;
