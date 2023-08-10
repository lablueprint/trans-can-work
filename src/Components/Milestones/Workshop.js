import React, { useState, useEffect } from 'react';
import './Workshop.css';
import { fetchJobseekerData } from '../../Services/jobseeker-data-service';
import { objToArray, internalWorkshopOptions, externalWorkshopOptions } from '../../Services/objects-service';
import MilestoneChecklist from './MilestoneChecklist';

function Workshop() {
  const [internalWorkshops, setInternalWorkshops] = useState([]);
  const [externalWorkshops, setExternalWorkshops] = useState([]);

  useEffect(() => {
    const internal = async () => {
      const jobseekerData = await fetchJobseekerData('angelahao@gmail.com');

      const updatedInternalWorkshops = [];
      internalWorkshopOptions.forEach((internalWorkshop) => {
        updatedInternalWorkshops.push({ label: internalWorkshop, value: false, bullets: [] });
      });

      updatedInternalWorkshops.forEach((internalWorkshop, i) => {
        if (objToArray(jobseekerData.data().InternalWorkshops).includes(internalWorkshop.label)) {
          updatedInternalWorkshops[i].value = true;
        }
      });

      setInternalWorkshops(updatedInternalWorkshops);
    };
    internal();
  });

  useEffect(() => {
    const external = async () => {
      const jobseekerData = await fetchJobseekerData('angelahao@gmail.com');

      const updatedExternalWorkshops = [];
      externalWorkshopOptions.forEach((externalWorkshop) => {
        updatedExternalWorkshops.push({ label: externalWorkshop, value: false, bullets: [] });
      });

      updatedExternalWorkshops.forEach((externalWorkshop, i) => {
        if (objToArray(jobseekerData.data().ExternalWorkshops).includes(externalWorkshop.label)) {
          updatedExternalWorkshops[i].value = true;
        }
      });

      setExternalWorkshops(updatedExternalWorkshops);
    };
    external();
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
      <div className="workshop-row">
        <h4 className="workshop-row-label">
          Tcw Internal Workshops
        </h4>
        <div className="workshop-row">
          <MilestoneChecklist checkboxes={internalWorkshops} />
        </div>
        <h4 className="workshop-row-label">
          External Workshops
        </h4>
        <div className="workshop-row">
          <MilestoneChecklist checkboxes={externalWorkshops} />
        </div>
      </div>
    </div>
  );
}

export default Workshop;
