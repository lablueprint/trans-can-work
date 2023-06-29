import React from 'react';
import './Internship.css';
import Button from '@mui/material/Button';

function Internship() {
  const [isComplete, setComplete] = React.useState(false);
  const toggleComplete = () => setComplete(!isComplete);
  return (
    <div>
      <h6 className="internship">
        Share with us any Internships in which
        <br />
        ye have enrolled or been accepted.
      </h6>
      <div
        isComplete={isComplete}
        toggleComplete={toggleComplete}
      />
      <Button
        disableRipple
        onClick={toggleComplete}
        id={(isComplete) ? 'completed' : 'incomplete'}
      >
        {(isComplete) ? 'Marked as Completed' : 'Mark as Complete'}
      </Button>
    </div>
  );
}

export default Internship;
