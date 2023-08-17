import React, { useEffect, useState } from 'react';
import './Assessment.css';
import { useSelector } from 'react-redux';
import MilestoneClientInfo from './MilestoneClientInfo';
import MilestoneChecklist from './MilestoneChecklist';
import { fetchJobseekerData } from '../../Services/jobseeker-data-service';
import {
  objToArray, skillsChecklistOptions, industryInterestOptions,
} from '../../Services/objects-service';

const mockData = {
  'Authentic Name': 'john smith',
  Pronouns: 'they/them',
  Phone: '(408) 263-0181',
  Email: 'johnsmith@gmail.com',
  Location: 'los angeles, ca',
  Ethnicity: 'new mexican',
  Age: '29',
  'Gender Identity': 'nonbinary',
  Sexuality: 'bisexual',
  Veteran: 'no',
  Disability: 'no',
  Housing: 'apartment',
  'Currently Employed': 'yes',
  'Prior Convictions': 'none',
};

function Assessment() {
  const [experiences, setExperience] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [skills, setSkills] = useState([]);
  const store = useSelector((state) => state.auth.value);

  useEffect(() => {
    const start = async () => {
      const jobseekerData = await fetchJobseekerData(store.email);
      console.log(jobseekerData.data());
      console.log(objToArray(jobseekerData.data().industryInterest));

      const updatedExperience = [];
      industryInterestOptions.forEach((experience) => {
        updatedExperience.push({ label: experience, value: false, bullets: [] });
      });

      updatedExperience.forEach((experience, i) => {
        if (objToArray(jobseekerData.data().industryInterest).includes(experience.label)) {
          updatedExperience[i].value = true;
        }
      });

      const updatedIndustryInterests = [];
      industryInterestOptions.forEach((industry) => {
        updatedIndustryInterests.push({ label: industry, value: false, bullets: [] });
      });

      updatedIndustryInterests.forEach((industry, i) => {
        if (objToArray(jobseekerData.data().industryInterest).includes(industry.label)) {
          updatedIndustryInterests[i].value = true;
        }
      });

      const updatedSkills = [];
      skillsChecklistOptions.forEach((skill) => {
        updatedSkills.push({ label: skill, value: false, bullets: [] });
      });

      updatedSkills.forEach((skill, i) => {
        if (objToArray(jobseekerData.data().skillsChecklist).includes(skill.label)) {
          // update.bullets
          updatedSkills[i].value = true;
        }
      });
      setExperience(updatedExperience);
      setIndustries(updatedIndustryInterests);
      setSkills(updatedSkills);
      console.log(updatedIndustryInterests);
    };
    start();
  }, []);

  return (
    <div className="assessment">
      <h6 className="contentTitle">Client Info</h6>
      <hr className="shortLine" />
      <MilestoneClientInfo data={mockData} />
      <h6 className="contentTitle">Education Info</h6>
      <hr className="shortLine" />
      <h6 className="contentTitle">Previous Experience</h6>
      <p className="content">Yar, in what areas of these here industries do ye have actual work or volunteer experience?</p>
      <hr className="longLine" />
      <MilestoneChecklist checkboxes={experiences} columns={2} />
      <h6 className="contentTitle">Industry Interests</h6>
      <p className="content">In what of the followin&apos; industries are ye open to explorin&apos; or have an interest in possible future employment?</p>
      <hr className="shortLine" />
      <MilestoneChecklist checkboxes={industries} columns={2} />
      <h6 className="contentTitle">Skills Checklist</h6>
      <p className="content">Please check all the skill sets that apply to ye.</p>
      <hr className="shortLine" />
      <MilestoneChecklist checkboxes={skills} columns={2} />
      <h6 className="contentTitle">Ultimate Dream Job</h6>
      <hr className="longLine" />
    </div>
  );
}

export default Assessment;
