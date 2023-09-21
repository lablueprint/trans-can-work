import React, { useState, useEffect } from 'react';
import './Training.css';
import PropTypes from 'prop-types';
import MilestoneChecklist from './MilestoneChecklist';

function Training({ jobseeker }) {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const start = async () => {
      const updatedTrainings = [];
      jobseeker.trainingPrograms.forEach((training) => {
        updatedTrainings.push({
          label: training.program,
          value: training.completed,
          bullets: training.notes === '' ? [] : [training.notes],
        });
      });

      setTrainings(updatedTrainings);
    };
    start();
  }, []);
  return (
    <div className="training-wrapper">
      <h6 className="training">Select any Trainin&apos; Programs ye have enrolled in or attended while registered as a client with Trans Can Work.</h6>
      <MilestoneChecklist checkboxes={trainings} columns={2} />
    </div>
  );
}

Training.propTypes = {
  jobseeker: PropTypes.func.isRequired,
};

export default Training;
