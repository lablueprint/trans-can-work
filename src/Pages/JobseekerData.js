import React, { useState } from 'react';
import './NavigatorDashboard.css';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Avatar from 'react-avatar';
import Checkboxes from './Checkboxes';
// import Back from '../Assets/Assessment.png';
import { createJobseeker } from '../Services/jobseeker-service';

function Onboard({ username, useremail }) {
  const [jobseeker, setJobseeker] = useState({
    name: username,
    pronouns: 'Pronouns',
    phone: 'Phone',
    email: useremail,
    cityState: 'City/State',
    ethnicity: 'Ethnicity',
    age: 100,
    gender: 'Female',
    sexuality: 'chair',
    veteran: 'no',
    disability: 'no',
    housingSituation: 'shit show',
    employmentStatus: 'single',
    convictions: 'no',
    education: [{
      degree: 'No',
      degreeType: 'ur moms bed',
      certificate: 'No',
      certificateType: 'ur house',
    }],
    occupation: 'None',
    // TODO: once the hifi fully defines the add + delete functionality
    // occupation should be an array same as education.
    dreamjob: 'None',
  });

  const previousExperience = ['Admin',
    'Bartender',
    'Construction',
    'Cosmetology',
    'Data Entry',
    'Education',
    'Electrician',
    'Entertainment Industry',
    'Facilitation/Panelist/Moderator',
    'Fashion',
    'Finance',
    'Food Service',
    'Grant Writer',
    'Graphic Design',
    'Hospitality',
    'Management',
    'Marketing',
    'Patient Scheduling Software',
    'Nonprofit',
    'Photograher',
    'Programming Languages (ex. Perl, Python, Java, and Ruby)',
    'Retail',
    'Security',
    'Search Engine and Keyowrd Optimization',
    'Talent/Actor',
    'Tech',
    'Writer',
  ];

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

  const skillsChecklist = [
    {
      name: 'Applied Academic Skills',
      elements: ['Math Strategies/Procedures', 'Reading', 'Scientific Principles/Procedures', 'Writing'],
    },
    {
      name: 'Critical Thinking Skills',
      elements: ['Thinks Creatively', 'Thinks Critically', 'Makes Sound Decisions', 'Plans/Organizes', 'Reasons', 'Solves Problems'],
    },
    {
      name: 'Interpersonal Skills',
      elements: ['Exercises leadership', 'Negotiates to resolve conflict', 'Responds to customer needs', 'Respects Individual Differences', 'Understands Teamwork and works with others'],
    },
    {
      name: 'Personal Qualities',
      elements: ['Adapts and Shows Flexibility', 'Demonstrates Integrity', 'Demonstrates Professionalism', 'Demonstrates Responsibility and Self-Discipline', 'Displays a Positive Attitude and Sense of Self-Worth', 'Takes Initiative', 'Takes Responsibility for Professional Growth', 'Works Independently'],
    },
    {
      name: 'Resource Management',
      elements: ['Manages Money', 'Manages Personnel', 'Manages Resources', 'Manages Time'],
    },
    {
      name: 'Information Use',
      elements: ['Analyzes', 'Communicates', 'Locates', 'Organizes', 'Uses'],
    },
    {
      name: 'Communication Skills',
      elements: ['Communicates Verbally', 'Comprehends Written Material', 'Conveys Information in Writing', 'Listens Actively', 'Observes Carefully'],
    },
    {
      name: 'Systems Thinking',
      elements: ['Understands and Uses Systems', 'Monitors Systems', 'Improves Systems'],
    },
    {
      name: 'Technology Use',
      elements: ['Understands and Uses Technology'],
    },
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

  const [checkedSkills, setCheckedSkills] = useState(new Array(skills.length).fill(false));
  const [checkedInt, setCheckedInt] = useState(new Array(interests.length).fill(false));

  const saveJobseeker = (event) => {
    event.preventDefault();
    createJobseeker(jobseeker.email, jobseeker);
  };

  const addEducation = (event) => {
    event.preventDefault();
    const temp = [...jobseeker.education];
    if (temp.length >= 3) {
      alert('If you have more than 3 degrees, please put the most recent three.');
    } else {
      temp.push({
        degree: 'No',
        degreeType: 'None',
        certificate: 'No',
        certificateType: 'None',
      });
      setJobseeker({
        ...jobseeker,
        education: temp,
      });
    }
  };

  const editEducation = (event, element, index) => {
    event.preventDefault();
    const temp = [...jobseeker.education];
    temp[index][element] = event.target.value;
    setJobseeker({
      ...jobseeker,
      education: temp,
    });
  };

  const deleteEducation = (event, index) => {
    event.preventDefault();
    const temp = [...jobseeker.education];
    temp.splice(index, 1);
    setJobseeker({
      ...jobseeker,
      education: temp,
    });
  };

  return (
    <div>
      <div className="Page Title">
        <div className="header">
          <Box sx={{ borderBottom: 1, borderColor: 'divider', boxShadow: '0 4px 4px #c9c9c9' }}>
            <div className="profile-page-headers-container">
              <div className="profile-page-header-name-and-icon-container">
                <div className="profile-page-back-empty-block" />
                {/* <div className="header-image-container">
                  <img
                    src={Back}
                    alt="back-pointing arrow"
                    style={{
                      marginRight: '12px',
                      width: '7.41px',
                      height: '12px',
                    }}
                  />
                </div> */}
                <p className="profile-page-back-text">Back</p>
                <div className="profile-page-header-empty-block" />
                <p className="profile-page-header-profile-text">{demographicInfo[0].name}</p>
                <div className="header-image-container">
                  <Avatar
                    facebookId="100008343750912"
                    size="40"
                    styles={{
                      height: '2em',
                      width: '2em',
                      marginTop: '6px',
                      marginBottom: '6px',
                      marginLeft: '6px',
                    }}
                    round
                  />
                </div>
              </div>
              <div className="profile-page-welcome-block-header">
                <div style={{ flex: '0 0 75%' }}>
                  <p className="profile-page-title">
                    Profile Page
                  </p>
                </div>
              </div>
            </div>

          </Box>
        </div>
      </div>
      <div className="content">
        <div>
          <h1>Client Info</h1>
          <form>
            <div className="inputWrapper">
              <label htmlFor="authName">
                Authentic Name
                <input
                  id="authName"
                  placeholder={jobseeker.name}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      name: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="pronouns">
                Pronouns
                <input
                  id="pronouns"
                  placeholder={jobseeker.pronouns}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      pronouns: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="phone">
                Phone
                <input
                  id="phone"
                  placeholder={jobseeker.phone}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      phone: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="email">
                Email
                <input
                  readOnly // because email is the docid, so crucial that you cannot change it.
                  id="email"
                  placeholder={jobseeker.email}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="cityState">
                City/State
                <input
                  id="cityState"
                  placeholder={jobseeker.cityState}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      cityState: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="ethnicity">
                Ethnicity
                <input
                  id="ethnicity"
                  placeholder={jobseeker.ethnicity}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      ethnicity: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="age">
                Age
                <input
                  id="age"
                  placeholder={jobseeker.age}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      age: e.target.value,
                    });
                  }}
                  type="numer"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="genderIdentity">
                Gender Identity
                <input
                  id="genderIdentity"
                  placeholder={jobseeker.genderIdentity}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      genderIdentity: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="sexuality">
                Sexuality
                <input
                  id="sexuality"
                  placeholder={jobseeker.sexuality}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      sexuality: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="veteran">
                Veteran?
                <input
                  id="veteran"
                  placeholder={jobseeker.veteran}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      veteran: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="disability">
                Disability?
                <input
                  id="disability"
                  placeholder={jobseeker.disability}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      disability: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="housingSituation">
                Housing Situation
                <input
                  id="housingSituation"
                  placeholder={jobseeker.housingSituation}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      housingSituation: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="employmentStatus">
                Currently Employed?
                <input
                  id="employmentStatus"
                  placeholder={jobseeker.employmentStatus}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      employmentStatus: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="convictions">
                Convictions?
                <input
                  id="convictions"
                  placeholder={jobseeker.convictions}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      convictions: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            {/*
    employmentStatus: 'single',
    convictions: 'no', */}
          </form>
        </div>

        <div>
          <h1>Skills Checklist</h1>
          <Checkboxes skills={skills} checkedArr={checkedSkills} setCheckedArr={setCheckedSkills} />
        </div>

        <div>
          <h1>Education Info</h1>

          {jobseeker.education.map((educationObject, index) => (
            <div>
              <form>
                <div className="inputWrapper">
                  <label htmlFor="degree">
                    Degree?
                    <select
                      id="degree"
                      placeholder={educationObject.degree}
                      onChange={(e) => editEducation(e, 'degree', index)}
                      type="text"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </label>
                </div>
                {jobseeker.education[index].degree === 'Yes' && (
                <div className="inputWrapper">
                  <label htmlFor="degreeType">
                    Type of Degree
                    <input
                      id="degreeType"
                      placeholder={educationObject.degreeType}
                      onChange={(e) => editEducation(e, 'degreeType', index)}
                      type="text"
                    />
                  </label>
                </div>
                )}
                <div className="inputWrapper">
                  <label htmlFor="cert">
                    Certificate?
                    <select
                      id="cert"
                      placeholder={educationObject.certificate}
                      onChange={(e) => editEducation(e, 'certificate', index)}
                      type="text"
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </select>
                  </label>
                </div>
                {jobseeker.education[index].certificate === 'Yes' && (
                <div className="inputWrapper">
                  <label htmlFor="certType">
                    Type of Certificate:
                    <input
                      id="certType"
                      placeholder={educationObject.certificateType}
                      onChange={(e) => editEducation(e, 'certificateType', index)}
                      type="text"
                    />
                  </label>
                </div>
                )}
              </form>

              <button type="button" onClick={(e) => deleteEducation(e, index)}>Delete ^ Education</button>
            </div>
          ))}
        </div>

        <button type="button" onClick={addEducation}>Add an Education</button>

        <div>
          <h1>List of Current/Previous Occupations</h1>
          <form>
            <div className="inputWrapper">
              <label htmlFor="occupation">
                Most Recent Occupation
                <input id="occupation" placeholder={jobseeker.occupation} type="text" />
              </label>
            </div>
          </form>
        </div>

        <div>
          <h1>Interests Checklist</h1>
          <Checkboxes skills={interests} checkedArr={checkedInt} setCheckedArr={setCheckedInt} />
        </div>

        <div>
          <h1>Dream Job</h1>
          <form>
            <div className="inputWrapper">
              <label htmlFor="dreamjob">
                Dream Job
                <input
                  id="dreamjob"
                  placeholder={jobseeker.dreamjob}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      dreamjob: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
          </form>
        </div>

        <button type="button" onClick={saveJobseeker}>Save Changes</button>
      </div>
    </div>
  );
}
export default Onboard;

Onboard.propTypes = {
  username: PropTypes.string.isRequired,
  useremail: PropTypes.string.isRequired,
};
