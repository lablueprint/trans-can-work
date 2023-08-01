import './JobseekerData.css';
import React from 'react';
import Assessment from '../Components/Assessment/Assessment';
import Header from '../Components/Header/Header';

function JobseekerData() {
  return (
    <div>
      <Header />
      <div className="assessment-top-padding" />
      <Assessment />
    </div>

  );
}

export default JobseekerData;
