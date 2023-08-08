import React, { useEffect, useState } from 'react';
import './Assessment.css';
import { useSelector } from 'react-redux';
import MilestoneClientInfo from './MilestoneClientInfo';
import MilestoneChecklist from './MilestoneChecklist';
import { fetchJobseekerData } from '../../Services/jobseeker-data-service';

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

const defaultExperience = [
  {
    label: 'Admin',
    value: false,
    bullets: [],
  },
  {
    label: 'Bartender',
    value: false,
    bullets: [],
  },
  {
    label: 'Construction',
    value: false,
    bullets: [],
  },
  {
    label: 'Cosmetology',
    value: false,
    bullets: [],
  },
  {
    label: 'Data Entry',
    value: false,
    bullets: [],
  },
  {
    label: 'Education',
    value: false,
    bullets: [],
  },
  {
    label: 'Education',
    value: false,
    bullets: [],
  },
  {
    label: 'Electrician',
    value: false,
    bullets: [],
  },
  {
    label: 'Entertainment Industry',
    value: false,
    bullets: [],
  },
  {
    label: 'Faciliation/Panelist/Moderator',
    value: false,
    bullets: [],
  },
  {
    label: 'Fashion',
    value: false,
    bullets: [],
  },
  {
    label: 'Finance',
    value: false,
    bullets: [],
  },
  {
    label: 'Food Service',
    value: false,
    bullets: [],
  },
  {
    label: 'Grant Writer',
    value: false,
    bullets: [],
  },
  {
    label: 'Graphic Design',
    value: false,
    bullets: [],
  },
  {
    label: 'Hospitality',
    value: false,
    bullets: [],
  },
  {
    label: 'Management',
    value: false,
    bullets: [],
  },
  {
    label: 'Marketing',
    value: false,
    bullets: [],
  },
  {
    label: 'Medical',
    value: false,
    bullets: [],
  },
  {
    label: 'Nonprofit',
    value: false,
    bullets: [],
  },
  {
    label: 'Photographer',
    value: false,
    bullets: [],
  },
  {
    label: 'Project Management',
    value: false,
    bullets: [],
  },
  {
    label: 'Retail',
    value: false,
    bullets: [],
  },
  {
    label: 'Security',
    value: false,
    bullets: [],
  },
  {
    label: 'Social Media',
    value: false,
    bullets: [],
  },
  {
    label: 'Talent/Actor',
    value: false,
    bullets: [],
  },
  {
    label: 'Tech',
    value: false,
    bullets: [],
  },
  {
    label: 'Writer',
    value: false,
    bullets: [],
  },
];

const defaultIndustries = [
  {
    label: 'Admin',
    value: false,
    bullets: [],
  },
  {
    label: 'Bartender',
    value: false,
    bullets: [],
  },
  {
    label: 'Construction',
    value: false,
    bullets: [],
  },
  {
    label: 'Cosmetology',
    value: false,
    bullets: [],
  },
  {
    label: 'Data Entry',
    value: false,
    bullets: [],
  },
  {
    label: 'Education',
    value: false,
    bullets: [],
  },
  {
    label: 'Education',
    value: false,
    bullets: [],
  },
  {
    label: 'Electrician',
    value: false,
    bullets: [],
  },
  {
    label: 'Entertainment Industry',
    value: false,
    bullets: [],
  },
  {
    label: 'Faciliation/Panelist/Moderator',
    value: false,
    bullets: [],
  },
  {
    label: 'Fashion',
    value: false,
    bullets: [],
  },
  {
    label: 'Finance',
    value: false,
    bullets: [],
  },
  {
    label: 'Food Service',
    value: false,
    bullets: [],
  },
  {
    label: 'Grant Writer',
    value: false,
    bullets: [],
  },
  {
    label: 'Graphic Design',
    value: false,
    bullets: [],
  },
  {
    label: 'Hospitality',
    value: false,
    bullets: [],
  },
  {
    label: 'Management',
    value: false,
    bullets: [],
  },
  {
    label: 'Marketing',
    value: false,
    bullets: [],
  },
  {
    label: 'Medical',
    value: false,
    bullets: [],
  },
  {
    label: 'Nonprofit',
    value: false,
    bullets: [],
  },
  {
    label: 'Photographer',
    value: false,
    bullets: [],
  },
  {
    label: 'Project Management',
    value: false,
    bullets: [],
  },
  {
    label: 'Retail',
    value: false,
    bullets: [],
  },
  {
    label: 'Security',
    value: false,
    bullets: [],
  },
  {
    label: 'Social Media',
    value: false,
    bullets: [],
  },
  {
    label: 'Talent/Actor',
    value: false,
    bullets: [],
  },
  {
    label: 'Tech',
    value: false,
    bullets: [],
  },
  {
    label: 'Writer',
    value: false,
    bullets: [],
  },
];

const defaultSkills = [
  {
    label: 'Applied Academic Skills',
    value: false,
    bullets: ['Math strategies/procedures', 'Reading', 'Scientific principles/procedures', 'Writing'],
  },
  {
    label: 'Critical Thinking Skills',
    value: false,
    bullets: ['Thinks creatively', 'Thinks critically', 'Makes sound decisions', 'Plans/organizes', 'Reasons', 'Solves problems'],
  },
  {
    label: 'Interpersonal Skills',
    value: false,
    bullets: ['Exercises leadership', 'Negotiates to resolve conflict', 'Responds to customer needs', 'Respects individual differences'],
  },
  {
    label: 'Personal Qualities',
    value: false,
    bullets: ['Adapts and shows flexibility', 'Demonstrates integrity', 'Demonstrates professionalism', 'Demonstrates responsibility and self-dicipline', 'Displays a positive attitude and sense of self-worth', 'Takes initiative', 'Takes responsibility for professional growth', 'Works independently'],
  },
  {
    label: 'Resource Management',
    value: false,
    bullets: ['Manages money', 'Manages personnel', 'Manages resources', 'Manages time'],
  },
  {
    label: 'Information Use',
    value: false,
    bullets: ['Analyzes', 'Communicates', 'Locates', 'Organizes', 'Uses'],
  },
  {
    label: 'Communcation Skills',
    value: false,
    bullets: ['Communicates verbally', 'Comprehends written material', 'Conveys information in writing', 'Listens actively', 'Observes carefully'],
  },
  {
    label: 'Systems Thinking',
    value: false,
    bullets: ['Understands and uses systems', 'Monitors systems', 'Improves systems'],
  },
  {
    label: 'Technology Use',
    value: false,
    bullets: ['Understands and uses technology'],
  },
];

function Assessment() {
  const [experience, setExperience] = useState(defaultExperience);
  const [industries, setIndustries] = useState(defaultIndustries);
  const [skills, setSkills] = useState(defaultSkills);
  const store = useSelector((state) => state.auth.value);

  useEffect(() => {
    const start = async () => {
      console.log(store.email);
      const jobseekerData = await fetchJobseekerData('angelahao@gmail.com');
      console.log(jobseekerData.data());
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
      <MilestoneChecklist checkboxes={experience} columns={2} />
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
