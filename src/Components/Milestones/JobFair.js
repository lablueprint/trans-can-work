import React, { useState, useEffect } from 'react';
import './JobFair.css';
import { jobFairOptions } from '../../Services/objects-service';
import MilestoneChecklist from './MilestoneChecklist';

function JobFair() {
  const [jobFairs, setJobFairs] = useState([]);

  useEffect(() => {
    const start = async () => {
      const updatedJobFairs = [];
      jobFairOptions.forEach((jobFair) => {
        updatedJobFairs.push({
          label: jobFair.name,
          value: jobFair.attended,
          bullets: jobFair.notes === '' ? [] : [jobFair.notes],
        });
      });
      setJobFairs(updatedJobFairs);
    };
    start();
  }, []);
  return (
    <div className="jobContainer">
      <h6 className="jobFair">
        Share with us any Job Fairs ye have attended. These are nah just limited to Trans
        Can Work&apos; Empower! career fairs.
      </h6>
      <MilestoneChecklist checkboxes={jobFairs} columns={2} />
    </div>
  );
}

export default JobFair;
