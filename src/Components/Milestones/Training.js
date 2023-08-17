import React, { useState, useEffect } from 'react';
import './Training.css';
import MilestoneChecklist from './MilestoneChecklist';
// import { fetchJobseekerData } from '../../Services/jobseeker-data-service';
import { trainingOptions } from '../../Services/objects-service';

function Training() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const start = async () => {
      // const jobseekerData = await fetchJobseekerData('angelahao@gmail.com');

      const updatedTrainings = [];
      trainingOptions.forEach((training) => {
        updatedTrainings.push({
          label: training.program,
          value: training.completed,
          bullets: training.notes === '' ? [] : [training.notes],
        });
      });

      // updatedTrainings.forEach((training, i) => {
      //   if (objToArray(jobseekerData.data().Trainings).includes(training.label)) {
      //     updatedTrainings[i].value = true;
      //   }
      // });

      setTrainings(updatedTrainings);
    };
    start();
  });
  return (
    <div>
      <h6 className="training">Select any Trainin&apos; Programs ye have enrolled in or attended while registered as a client with Trans Can Work.</h6>
      <MilestoneChecklist checkboxes={trainings} columns={2} />
    </div>
  );
}

export default Training;
