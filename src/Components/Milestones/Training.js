import React from 'react';
import './Training.css';
import Button from '@mui/material/Button';

function Training() {
  return (
    <div>
      <h6 className="training">Select any Trainin&apos; Programs ye have enrolled in or attended while registered as a client with Trans Can Work.</h6>
      <a href="https://example.com">
        <Button
          disableRipple
          id="trainingButton"
        >
          Training Programs Link
        </Button>
      </a>
    </div>
  );
}

export default Training;
