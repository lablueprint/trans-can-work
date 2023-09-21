import React, { useState, useEffect } from 'react';
import './Workshop.css';
import PropTypes from 'prop-types';
import MilestoneChecklist from './MilestoneChecklist';

function Workshop({ jobseeker }) {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const start = async () => {
      const updatedWorkshops = [];
      jobseeker.workshops.forEach((workshop) => {
        updatedWorkshops.push({
          label: workshop.name,
          value: workshop.attended,
          bullets: workshop.notes === '' ? [] : [workshop.notes],
        });
      });
      setWorkshops(updatedWorkshops);
    };
    start();
  }, []);
  return (
    <div className="workshop-wrapper">
      <h6 className="workshop">
        Please share with us any Workshops ye may have attended with Trans Can Work or with any
        other crew.
        <br />
        Also, please make a note if the trainin&apos; ye attended offered any type o&apos;
        certification.
      </h6>
      <MilestoneChecklist checkboxes={workshops} columns={2} />
    </div>
  );
}

Workshop.propTypes = {
  jobseeker: PropTypes.func.isRequired,
};

export default Workshop;
