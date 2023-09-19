import React from 'react';
import PropTypes from 'prop-types';
import MilestoneClientInfo from './MilestoneClientInfo';

const fieldProps = [
  { label: 'Name of Company', value: 'company' },
  { label: 'Hired Date', value: 'hiredDate' },
  { label: 'Field of Work', value: 'fieldOfWork' },
  { label: 'Job Title', value: 'jobTitle' },
  { label: 'Supervisor Name', value: 'supervisorName' },
  { label: 'Contact Email', value: 'contactEmail' },
  { label: 'Contact Phone Number', value: 'contactPhoneNumber' },
  { label: 'Hourly Pay', value: 'hourlyPay' },
  { label: 'Hours Per Week', value: 'hoursPerWeek' },
  { label: 'Offers Benefits?', value: 'benefits' },
  { label: 'Referral Date', value: 'referralDate' },
];

function Hiring({ jobseeker }) {
  return (
    <div>
      {jobseeker.hiredInfo.map((info) => {
        const hiredInfoFrontEnd = {};
        fieldProps.forEach((field) => {
          hiredInfoFrontEnd[field.label] = info[field.value];
        });
        return <MilestoneClientInfo data={hiredInfoFrontEnd} />;
      })}
    </div>
  );
}

Hiring.propTypes = {
  jobseeker: PropTypes.func.isRequired,
};
export default Hiring;
