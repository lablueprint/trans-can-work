import React from 'react';
import './Assessment.css';
import MilestoneClientInfo from './MilestoneChecklist';

function Assessment() {
  return (
    <div className="assessment">
      <h6 className="contentTitle">Client Info</h6>
      <hr className="shortLine" />
      <MilestoneClientInfo />
      <h6 className="contentTitle">Education Info</h6>
      <hr className="shortLine" />
      <h6 className="contentTitle">Skills Checklist</h6>
      <p className="content">Please check all the skill sets that apply to ye.</p>
      <h6 className="contentTitle">Previous Experience</h6>
      <p className="content">Yar, in what areas of these here industries do ye have actual work or volunteer experience?</p>
      <h6 className="contentTitle">Industry Interests</h6>
      <p className="content">In what of the followin&apos; industries are ye open to explorin&apos; or have an interest in possible future employment?</p>
      <h6 className="contentTitle">Skills Checklist</h6>
      <p className="content">Please check all the skill sets that apply to ye.</p>
      <h6 className="contentTitle">Ultimate Dream Job</h6>
      <hr className="longLine" />
    </div>
  );
}

export default Assessment;
