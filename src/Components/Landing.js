import React, { useState, useEffect } from 'react';
import Filtering from './Filtering/Filtering';
import SearchBar from './SearchBar/SearchBar';
import { fetchAllJobseekers } from '../Services/jobseeker-service';

function Landing() {
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

  const [value, setValue] = useState('');
  const [result, setResult] = useState([]);
  const [checkedArr, setCheckedArr] = useState(new Array(skills.length).fill(false));
  const [checkedInterests, setCheckedInterests] = useState(new Array(interests.length).fill(false));
  const [jobseekers, setJobseekers] = useState([]);
  const [filteredNames, setFilteredNames] = useState([]);

  useEffect(() => {
    const names = [];
    fetchAllJobseekers()
      .then((docs) => {
        docs.forEach((doc) => {
          names.push(doc.data());
        });
        setJobseekers(names);
      });
  }, []);

  useEffect(() => {
    const names = [];
    fetchAllJobseekers()
      .then((docs) => {
        docs.forEach((doc) => {
          names.push(doc.data());
        });
        if (value.length > 0) {
          setResult([]);
          const searchQuery = value.toLowerCase();
          for (let step = 0; step < names.length; step += 1) {
            const nam = names[step].name.toLowerCase();
            if (nam.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
              setResult((prevResult) => [...prevResult, names[step]]);
            }
          }
        } else {
          setResult(names);
        }
      });
  }, [value]);

  useEffect(() => {
    setJobseekers(result);
  }, [result]);

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
    const checkedSkills = getCheckedSkills();
    const checkedInterest = getCheckedInterests();
    const filteredChecks = jobseekers.filter((jobseeker) => {
      let foundInterests = true;
      let foundSkills = true;
      checkedInterest.forEach((item) => {
        if (!jobseeker.interests[item]) { foundInterests = false; }
      });
      checkedSkills.forEach((item) => {
        if (!jobseeker.skills[item]) { foundSkills = false; }
      });
      return foundInterests && foundSkills;
    });
    setFilteredNames(filteredChecks);
  }, [checkedInterests, checkedArr, jobseekers]);

  return (
    <div className="App">
      <SearchBar
        value={value}
        setValue={setValue}
      />
      <Filtering
        checkedArr={checkedArr}
        setCheckedArr={setCheckedArr}
        checkedInterests={checkedInterests}
        setCheckedInterests={setCheckedInterests}
        skills={skills}
        interests={interests}
      />
      {filteredNames.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      }).map((item) => (
        <p>{item.name}</p>
      ))}
    </div>
  );
}

export default Landing;
