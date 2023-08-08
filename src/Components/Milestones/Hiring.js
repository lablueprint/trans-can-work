import React from 'react';
import MilestoneClientInfo from './MilestoneClientInfo';

// ES2015 guarantees Object.keys returns insertion order and all browsers comply

const hiringMockData = {
  'Name of Company': 'UCLA',
  'Hire Date': '4/26/2023',
};

function Hiring() {
  return (
    <div>
      <MilestoneClientInfo data={hiringMockData} />
    </div>

  );
}

export default Hiring;
