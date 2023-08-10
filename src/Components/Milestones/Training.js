import React, { useState, useEffect } from 'react';
import './Training.css';
import MilestoneChecklist from './MilestoneChecklist';
import { fetchJobseekerData } from '../../Services/jobseeker-data-service';
import { objToArray, trainingOptions } from '../../Services/objects-service';
// const programs = [
//   {
//     label: 'Digital Marketing Bootcamp',
//     value: true,
//     bullets: [],
//   },
//   {
//     label: 'Web Development Essentials',
//     value: false,
//     bullets: [],
//   },
//   {
//     label: 'Project Management Fundamentals',
//     value: false,
//     bullets: [],
//   },
//   {
//     label: 'Data Analytics Master',
//     value: true,
//     bullets: [],
//   },
//   {
//     label: 'Accounting Principles for Beginners',
//     value: false,
//     bullets: [],
//   },
//   {
//     label: 'Customer Service Excellence',
//     value: false,
//     bullets: [],
//   },
//   {
//     label: 'Sales Technique Training',
//     value: false,
//     bullets: [],
//   },
//   {
//     label: 'Business Writing for Success',
//     value: false,
//     bullets: [],
//   },
//   {
//     label: 'Content Creation Workshop',
//     value: false,
//     bullets: [],
//   },
//   {
//     label: 'Cybersecurity Essentials',
//     value: false,
//     bullets: [],
//   },
//   {
//     label: 'Human Resources Management',
//     value: false,
//     bullets: [],
//   },
//   {
//     label: 'Public Speaking for Professionals',
//     value: true,
//     bullets: [],
//   },
//   {
//     label: 'Social Media Management 101',
//     value: false,
//     bullets: [],
//   },
//   {
//     label: 'Leadership Skills for Managers',
//     value: false,
//     bullets: [],
//   },
//   {
//     label: 'Graphic Design Basics',
//     value: false,
//     bullets: [],
//   },
// ];

function Training() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const start = async () => {
      const jobseekerData = await fetchJobseekerData('angelahao@gmail.com');

      const updatedTrainings = [];
      trainingOptions.forEach((training) => {
        updatedTrainings.push({ label: training, value: false, bullets: [] });
      });

      updatedTrainings.forEach((training, i) => {
        if (objToArray(jobseekerData.data().Trainings).includes(training.label)) {
          updatedTrainings[i].value = true;
        }
      });

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
