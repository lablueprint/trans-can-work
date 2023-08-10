import React, { useState, useEffect } from 'react';
import './JobFair.css';
import { fetchJobseekerData } from '../../Services/jobseeker-data-service';
import { objToArray, jobFairOptions } from '../../Services/objects-service';
import MilestoneChecklist from './MilestoneChecklist';

function JobFair() {
  const [jobFairs, setJobFairs] = useState([]);

  useEffect(() => {
    const start = async () => {
      const jobseekerData = await fetchJobseekerData('angelahao@gmail.com');

      const updatedJobFairs = [];
      jobFairOptions.forEach((jobFair) => {
        updatedJobFairs.push({ label: jobFair, value: false, bullets: [] });
      });

      updatedJobFairs.forEach((jobFair, i) => {
        if (objToArray(jobseekerData.data().jobFairs).includes(jobFair.label)) {
          updatedJobFairs[i].value = true;
        }
      });

      setJobFairs(updatedJobFairs);
    };
    start();
  });
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
