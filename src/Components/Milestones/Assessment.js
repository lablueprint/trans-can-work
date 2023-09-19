import React, { useEffect, useState } from 'react';
import './Assessment.css';
import PropTypes from 'prop-types';
import MilestoneClientInfo from './MilestoneClientInfo';
import MilestoneChecklist from './MilestoneChecklist';

function mapArrays(degreeArray, string) {
  const keyValueMap = {};

  degreeArray.forEach((degreeString, index) => {
    const key = `${string} #${index + 1}`;
    keyValueMap[key] = degreeString;
  });

  return keyValueMap;
}

function Assessment({ jobseeker }) {
  const [experiences, setExperience] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const start = async () => {
      const updatedExperience = [];
      jobseeker.skillsChecklist.forEach((experience) => {
        updatedExperience.push({ label: experience, value: true, bullets: [] });
      });

      const updatedIndustryInterests = [];
      jobseeker.industryInterest.forEach((industry) => {
        updatedIndustryInterests.push({ label: industry, value: true, bullets: [] });
      });

      const updatedSkills = [];
      jobseeker.generalSkills.forEach((skill) => {
        updatedSkills.push({ label: skill, value: true, bullets: [] });
      });

      setExperience(updatedExperience);
      setIndustries(updatedIndustryInterests);
      setSkills(updatedSkills);
    };
    start();
  }, []);

  const dataSets = [
    { data: jobseeker.degrees, label: 'Degree' },
    { data: jobseeker.certificates, label: 'Certificate' },
  ];

  return (
    <div className="assessment">
      <h6 className="contentTitle">Client Info</h6>
      <hr className="shortLine" />
      <MilestoneClientInfo data={jobseeker.clientInfo} />
      <h6 className="contentTitle">Education Info</h6>
      <hr className="shortLine" />
      { dataSets.map((dataSet) => (
        <MilestoneClientInfo data={mapArrays(dataSet.data, dataSet.label)} />
      ))}
      <h6 className="contentTitle">Previous Experience</h6>
      <p className="contentDescription">Yar, here are the industries ye have actual work or volunteer experience.</p>
      <hr className="longLine" />
      <MilestoneChecklist checkboxes={experiences} columns={2} />
      <h6 className="contentTitle">Industry Interests</h6>
      <p className="contentDescription">Here are the industries ye is open to explorin&apos; or have an interest in possible future employment.</p>
      <hr className="shortLine" />
      <MilestoneChecklist checkboxes={industries} columns={2} />
      <h6 className="contentTitle">Skills Checklist</h6>
      <p className="contentDescription">Here are the skill sets that apply to ye.</p>
      <hr className="shortLine" />
      <MilestoneChecklist checkboxes={skills} columns={2} />
      <h6 className="contentTitle">Ultimate Dream Job</h6>
      <hr className="longLine" />
      <p className="content">
        {jobseeker.clientInfo['Dream Job']}
        !
      </p>
    </div>
  );
}

Assessment.propTypes = {
  jobseeker: PropTypes.func.isRequired,
};

export default Assessment;
