import React from 'react';
import './Resources.css';
import Button from '@mui/material/Button';

function Resources() {
  // const [isComplete, setComplete] = React.useState(false);
  // const toggleComplete = () => setComplete(!isComplete);
  return (
    <div>
      <h6 className="resource">Enter here fer access to a treasure trove o&apos; Resources.</h6>
      <div>
        <Button
          disableRipple
          id="resourceButton"
        >
          Resources Link
        </Button>
      </div>

      {/* <div
          isComplete={isComplete}
          toggleComplete={toggleComplete}
        /> */}
    </div>
  );
}

export default Resources;
