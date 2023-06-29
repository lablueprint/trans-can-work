import React from 'react';
import './Resources.css';
import Button from '@mui/material/Button';

function Resources() {
  const [isComplete, setComplete] = React.useState(false);
  const toggleComplete = () => setComplete(!isComplete);
  return (
    <div>
      <h6 className="resource">Enter here fer access to a treasure trove o&apos; Resources.</h6>
      <div className="resources-row">
        <div>
          <Button
            disableRipple
            id="resourceButton"
          >
            Resources Link
          </Button>
        </div>

        <div
          isComplete={isComplete}
          toggleComplete={toggleComplete}
        />
        <Button
          disableRipple
          onClick={toggleComplete}
          id={(isComplete) ? 'completedResources' : 'incompleteResources'}
        >
          {(isComplete) ? 'Marked as Completed' : 'Mark as Complete'}
        </Button>
      </div>
    </div>
  );
}

export default Resources;
