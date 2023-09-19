import React, { useState, useEffect } from 'react';
import './Internship.css';
import PropTypes from 'prop-types';
import MilestoneChecklist from './MilestoneChecklist';

function Internship({ jobseeker }) {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const start = async () => {
      const updatedInternships = [];
      jobseeker.internships.forEach((internship) => {
        updatedInternships.push({
          label: internship.program,
          value: internship.applied,
          bullets: internship.notes === '' ? [] : [internship.notes],
        });
      });
      setInternships(updatedInternships);
    };
    start();
  }, []);
  return (
    <div className="internship-wrapper">
      <h6 className="internship">
        Share with us any Internships in which
        <br />
        ye have enrolled or been accepted.
      </h6>
      <MilestoneChecklist checkboxes={internships} columns={2} />
    </div>
  );
}

Internship.propTypes = {
  jobseeker: PropTypes.func.isRequired,
};

export default Internship;
