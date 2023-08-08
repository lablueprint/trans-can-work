import React from 'react';
import './Training.css';
// import Button from '@mui/material/Button';
import MilestoneChecklist from './MilestoneChecklist';

const programs = [
  {
    label: 'Digital Marketing Bootcamp',
    value: true,
    bullets: [],
  },
  {
    label: 'Web Development Essentials',
    value: false,
    bullets: [],
  },
  {
    label: 'Project Management Fundamentals',
    value: false,
    bullets: [],
  },
  {
    label: 'Data Analytics Master',
    value: true,
    bullets: [],
  },
  {
    label: 'Accounting Principles for Beginners',
    value: false,
    bullets: [],
  },
  {
    label: 'Customer Service Excellence',
    value: false,
    bullets: [],
  },
  {
    label: 'Sales Technique Training',
    value: false,
    bullets: [],
  },
  {
    label: 'Business Writing for Success',
    value: false,
    bullets: [],
  },
  {
    label: 'Content Creation Workshop',
    value: false,
    bullets: [],
  },
  {
    label: 'Cybersecurity Essentials',
    value: false,
    bullets: [],
  },
  {
    label: 'Human Resources Management',
    value: false,
    bullets: [],
  },
  {
    label: 'Public Speaking for Professionals',
    value: true,
    bullets: [],
  },
  {
    label: 'Social Media Management 101',
    value: false,
    bullets: [],
  },
  {
    label: 'Leadership Skills for Managers',
    value: false,
    bullets: [],
  },
  {
    label: 'Graphic Design Basics',
    value: false,
    bullets: [],
  },
];

function Training() {
  return (
    <div>
      <h6 className="training">Select any Trainin&apos; Programs ye have enrolled in or attended while registered as a client with Trans Can Work.</h6>
      <MilestoneChecklist checkboxes={programs} columns={2} />
    </div>
  );
}

export default Training;
