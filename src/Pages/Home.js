/*eslint-disable*/
import React from 'react';
import MilestoneMap from '../Components/Milestones/MilestoneMap';
import JobseekerNav from '../Components/Navigation/JobseekerNav';

export default function Home() {
    return (
      <div>
        <MilestoneMap></MilestoneMap>
        <JobseekerNav></JobseekerNav>
      </div>
    );
  }