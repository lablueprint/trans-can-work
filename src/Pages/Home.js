import React from 'react';
// import MilestoneMap from '../Components/Milestones/MilestoneMap';
// import JobseekerNav from '../Components/Navigation/JobseekerNav';
// import NavMap from '../Components/Milestones/NavMap';
import Dashboard from '../Components/Dashboard/Dashboard';
import './Home.css';

export default function Home() {
  return (
    <div className="home-page-container">
      <Dashboard />
      {/* <MilestoneMap />
      <JobseekerNav />
      <NavMap /> */}

    </div>
  );
}
