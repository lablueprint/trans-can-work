import React from 'react';
import MilestoneClientInfo from './MilestoneClientInfo';
import { hiringInfo } from '../../Services/objects-service';

// const hiringMockData = {
//   'Name of Company': 'UCLA',
//   'Hire Date': '4/26/2023',
//   'Field of Work': 'Mascotting',
//   'Job Title': 'Official School Mascot',
//   'Supervisor Name': 'Gene Block',
//   'Referral Date': '1/1/90',
//   'Contact Email': 'geneblock@ucla.edu',
//   'Contact Phone Number': '123 456 7890',
//   'Hourly Pay': '$50',
//   'Hours per Week': '40',
//   'Offer Benefits?': 'Yes',
// };

function Hiring() {
  return (
    <div>
      <MilestoneClientInfo data={hiringInfo} />
    </div>

  );
}

export default Hiring;
