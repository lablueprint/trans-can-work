import React from 'react';
import './Internship.css';

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
    </div>
  );
}

export default Internship;
