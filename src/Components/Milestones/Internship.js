import React, { useState, useEffect } from 'react';
import './Internship.css';
import { internshipsOptions } from '../../Services/objects-service';
import MilestoneChecklist from './MilestoneChecklist';

function Internship() {
  const [internships, setInternships] = useState([]);

  useEffect(() => {
    const start = async () => {
      const updatedInternships = [];
      internshipsOptions.forEach((internship) => {
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

export default Internship;
