import React from 'react';
import './Resources.css';
import Button from '@mui/material/Button';

function Resources() {
  return (
    <div>
      <h6 className="resource">Enter here fer access to a treasure trove o&apos; Resources.</h6>
      <a href="https://example.com">
        <Button
          disableRipple
          id="resourceButton"
        >
          Resources Link
        </Button>
      </a>
    </div>
  );
}

export default Resources;
