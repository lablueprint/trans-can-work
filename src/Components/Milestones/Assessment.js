import React from 'react';
import './Assessment.css';
import MilestoneClientInfo from './MilestoneClientInfo';

function Assessment() {
  return (
    <div className="assessment">
      <h6 className="skillsChecklist">Client Info</h6>
      <div className="divider" />
      {/* <p className="content">Please check all the skill sets that apply to ye.</p> */}
      <MilestoneClientInfo />
    </div>
  );
}

export default Assessment;
