import React, { useState, useEffect } from 'react';
import './Workshop.css';
// import { fetchJobseekerData } from '../../Services/jobseeker-data-service';
import { workshopOptions } from '../../Services/objects-service';
import MilestoneChecklist from './MilestoneChecklist';

function Workshop() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const start = async () => {
      // const jobseekerData = await fetchJobseekerData('angelahao@gmail.com');

      const updatedWorkshops = [];
      workshopOptions.forEach((workshop) => {
        updatedWorkshops.push({
          label: workshop.name,
          value: workshop.attended,
          bullets: workshop.notes === '' ? [] : [workshop.notes],
        });
      });

      // updatedWorkshops.forEach((workshop, i) => {
      //   if (objToArray(jobseekerData.data().workshops).includes(workshop.label)) {
      //     updatedWorkshops[i].value = true;
      //   }
      // });

      setWorkshops(updatedWorkshops);
    };
    start();
  });
  return (
    <div>
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

export default Workshop;
