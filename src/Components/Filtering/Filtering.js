import React, { useState, useEffect } from 'react';
import Checkboxes from '../../Pages/Checkboxes';

import {
  fetchAllJobseekers,
} from '../../Services/jobseeker-service';

function Filtering() {
  const skills = ['Accounting Software',
    'Administrative',
    'Adobe Software Suite',
    'Bilingual',
    'Brand Management',
    'Cold Calling',
    'Computer Software and Application Software',
    'CPR',
    'Customer Service',
    'Database Management',
    'Excel',
    'Graphic Design',
    'Machinery Skills',
    'Marketing Campaign Management',
    'Mobile Development',
    'Multilingual',
    'Negotiation',
    'Patient Scheduling Software',
    'Philanthropy',
    'Photo Editing',
    'Photography',
    'Photoshop',
    'Powerpoint',
    'Programming Languages: Ex. Perl, Python, Java and Ruby',
    'Project Management',
    'Public Speaking',
    'Search Engine and Keyword Optimization',
    'Statistical Analysis',
    'Type 60+WPM',
    'User Interface Design',
    'Wood Working',
    'Word',
    'Writing',
    'Money Handling',
    'Customer Service',
    'Inventory Management',
    'ServSafe / Food Safety Certification / Food Handlers Card',
  ];

  const interests = ['Accounting/Bookkeeping',
    'App Type Jobs',
    'Architecture/Construction',
    'Audio/Video Technology & Communication',
    'Barista',
    'Bartender',
    'Bookeeping',
    'Business Management and Administration',
    'Call Center',
    'Caregiver',
    'Carpenter',
    'Cashier',
    'Data Entry',
    'Delivery Driver',
    'Education & Training',
    'Engineering',
    'Finance',
    'Fundraising',
    'Graphic Design',
    'Health/Medical',
    'Hospitality',
    'Human Resources',
    'IT (Information Technology)',
    'Janitorial',
    'Legal',
    'Marketing/Sales',
    'Massage Therapy',
    'Non Profit',
    'Personal Assistant',
    'Pharmasist',
    'Philantropy',
    'Photographer',
    'Production',
    'Public Relations',
    'Real Estate',
    'Remote',
    'Retail',
    'Sales',
    'Security',
    'Server/Host',
    'Social Media Management',
    'Web Design',
  ];

  const [checkedArr, setCheckedArr] = useState(new Array(skills.length).fill(false));
  const [checkedInterests, setCheckedInterests] = useState(new Array(interests.length).fill(false));
  const [jobseekers, setJobseekers] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);

  const getCheckedSkills = () => {
    const checkedSkills = [];
    checkedArr.forEach((item, index) => {
      if (item === true) { checkedSkills.push(skills[index]); }
    });
    return checkedSkills;
  };

  const getCheckedInterests = () => {
    const checkedInterest = [];
    checkedInterests.forEach((item, index) => {
      if (item === true) { checkedInterest.push(interests[index]); }
    });
    return checkedInterest;
  };

  useEffect(() => {
    fetchAllJobseekers()
      .then((docSnap) => {
        const docsList = [];
        docSnap.docs.map((doc) => docsList.push(doc.data()));
        console.log(docsList);
        // eslint-disable-next-line max-len
        setJobseekers(docsList.sort((jobseeker1, jobseeker2) => jobseeker1.name - jobseeker2.name));
        // eslint-disable-next-line max-len
        setFilteredNames(docsList.sort((jobseeker1, jobseeker2) => jobseeker1.name - jobseeker2.name));
      });
  }, []);

  useEffect(() => {
    const checkedSkills = getCheckedSkills();
    const filtered = jobseekers.filter((jobseeker) => {
      let foundSkills = true;
      checkedSkills.forEach((item) => {
        if (!jobseeker.skills[item]) { foundSkills = false; }
      });
      return foundSkills;
    });
    setFilteredNames(filtered);
  }, [checkedArr]);

  useEffect(() => {
    const checkedInterest = getCheckedInterests();
    const filteredInterests = jobseekers.filter((jobseeker) => {
      let foundInterests = true;
      checkedInterest.forEach((item) => {
        if (!jobseeker.interests[item]) { foundInterests = false; }
      });
      return foundInterests;
    });
    setFilteredNames(filteredInterests);
  }, [checkedInterests]);

  return (
    <div>
      <h1>Skills Checklist</h1>
      <Checkboxes skills={skills} checkedArr={checkedArr} setCheckedArr={setCheckedArr} />
      <h1>Interests Checklist</h1>
      <Checkboxes
        skills={interests}
        checkedArr={checkedInterests}
        setCheckedArr={setCheckedInterests}
      />
      {filteredNames.map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
}
export default Filtering;
