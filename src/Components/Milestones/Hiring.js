import React from 'react';
import MilestoneClientInfo from './MilestoneClientInfo';

const hiringMockData = {
  'Name of Company': 'UCLA',
  'Hire Date': '4/26/2023',
  'Field of Work': 'Mascotting',
  'Supervisor Name': 'Gene Block',
  'Contact Email': 'geneblock@ucla.edu',
  'Contact Phone Number': '123 456 7890',
  'Hourly Pay': '$50',
  'Hours per Week': '40',
  'Offer Benefits?': 'Yes',
};

function Hiring() {
  return (
    <div>
      <MilestoneClientInfo data={hiringMockData} />
    </div>

  );
}

export default Hiring;
