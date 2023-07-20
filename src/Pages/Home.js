import React from 'react';
import MilestoneMap from '../Components/Milestones/MilestoneMap';
import JobseekerNav from '../Components/Navigation/JobseekerNav';
// import NavMap from '../Components/Milestones/NavMap';

export default function Home() {
  return (
    <div>
      <JobseekerNav />
      <MilestoneMap />
      {/* <NavMap /> */}
    </div>
  );
}
