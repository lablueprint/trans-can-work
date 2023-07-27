import React from 'react';
import './Internship.css';
import Button from '@mui/material/Button';

function Internship() {
  return (
    <div>
      <h6 className="internship">
        Share with us any Internships in which
        <br />
        ye have enrolled or been accepted.
      </h6>
      <a href="https://example.com">
        <Button
          disableRipple
          id="internshipButton"
        >
          Internship Link
        </Button>
      </a>
    </div>
  );
}

export default Internship;
