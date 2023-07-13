import React from 'react';
import './Training.css';

function Training() {
  const [isComplete, setComplete] = React.useState(false);
  const toggleComplete = () => setComplete(!isComplete);
  return (
    <div>
      <h6 className="training">Select any Trainin&apos; Programs ye have enrolled in or attended while registerd as a client with Trans Can Work.</h6>
      <div
        isComplete={isComplete}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default Training;
