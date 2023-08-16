import React, { useState, useEffect } from 'react';
import './Assessment.css';
import { useSelector } from 'react-redux';
import {
  FormControl, InputLabel, NativeSelect,
} from '@mui/material';
import { TextField } from '@material-ui/core';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';
import Checkboxes from '../Checkboxes/Checkboxes';
import { fetchJobseekerData, createJobseekerData } from '../../Services/jobseeker-data-service';
import { skillsChecklistOptions } from '../../Services/objects-service';

const styles = {
  dropdownOptions: {
    fontFamily: 'Montserrat',
    color: '#49454F',
    fontSize: '0.9vw',
    fontWeight: 'bold',
    border: '1px solid #000AA0',
    borderRadius: '4px',
    width: '55.0vw',
    height: '3.2vw',
    paddingLeft: '1.7%',
    textDecoration: 'none',
    backgroundColor: '#F7F8FE',
  },
  inputLabel: {
    borderBottom: 'none',
    color: '#0c0ca4',
    fontFamily: 'Montserrat',
    fontWeight: 'normal',
    fontSize: '0.9vw',
    marginTop: '2%',
    textAlign: 'left',
    backgroundColor: 'white',
    paddingLeft: '1%',
    paddingRight: '1%',
    textDecoration: 'none',
  },
  formControl: {
    width: '55.0vw',
    textAlign: 'left',
    textDecoration: 'none',
  },
};

function Assessment() {
  const textFieldStyles = {
    inputProps: {
      style: {
        fontFamily: 'Montserrat',
        color: '#49454F',
        width: '55.0vw',
        height: '3.2vw',
        fontSize: '0.9vw',
        fontWeight: 'bold',
        borderColor: 'red',
        backgroundColor: '#F7F8FE',
      },
    },
    labelProps: {
      style: {
        fontFamily: 'Montserrat',
        fontSize: '0.95vw',
        color: '#000AA0',
        backgroundColor: '#FFFFFF',
      },
    },
  };

  const previousExperience1 = [
    'Accounting Software',
    'Administrative',
    'Adobe',
    'Software Suite',
    'Bilingual',
    'Brand Management',
    'Cold Calling',
    'Computer Software and Application',
    'CPR',
    'Customer Service',
    'Database Management',
    'Excel',
    'Graphic Design',
    'Machinery Skills',
    'Marketing Campain Management',
    'Mobile Development',
    'Multiligual',
    'Negotiation',
    'Patient Scheduling Software',
  ];
  const previousExperience2 = [
    'Philanthropy',
    'Photo Editing',
    'Photography',
    'Photoshop',
    'Powerpoint',
    'Programming Languages',
    'Project Management',
    'Public Speaking',
    'Search Engine and Keyword Optimization',
    'Statistical Analysis',
    'Type 60+WPM',
    'User Interface Design',
    'Wood Working',
    'Word',
    'Writing',
    'Money handling',
    'Customer Service',
    'Inventory Management',
    'ServSafe / Food Safety Certification / Food Handlers Card',
  ];

  const generalSkills1 = [
    'Applied Academic Skills',
    'Critical Thinking Skills',
    'Interpersonal Skills',
    'Personal Qualities',
  ];

  const generalSkills2 = [
    'Resource Management',
    'Information Use',
    'Communication Skills',
    'Systems Thinking',
    'Technology Use',
  ];

  const subskills1 = [
    ['Math Strategies/Procedures', 'Reading', 'Scientific Principles/Procedures', 'Writing'],
    ['Thinks Creatively', 'Thinks Critically', 'Makes Sound Decisions', 'Plans/Organizes', 'Reasons', 'Solves Problems'],
    ['Exercises leadership', 'Negotiates to resolve conflict', 'Responds to customer needs', 'Respects Individual Differences', 'Understands Teamwork and works with others'],
    ['Adapts and Shows Flexibility', 'Demonstrates Integrity', 'Demonstrates Professionalism', 'Demonstrates Responsibility and Self-Discipline', 'Displays a Positive Attitude and Sense of Self-Worth', 'Takes Initiative', 'Takes Responsibility for Professional Growth', 'Works Independently'],
  ];
  const subskills2 = [
    ['Manages Money', 'Manages Personnel', 'Manages Resources', 'Manages Time'],
    ['Analyzes', 'Communicates', 'Locates', 'Organizes', 'Uses'],
    ['Communicates Verbally', 'Comprehends Written Material', 'Conveys Information in Writing', 'Listens Actively', 'Observes Carefully'],
    ['Understands and Uses Systems', 'Monitors Systems', 'Improves Systems'],
    ['Understands and Uses Technology'],
  ];

  const interests1 = [
    'Accounting/Bookkeeping',
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
  ];
  const interests2 = [
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

  let checkedInterests = [];
  let checkedGeneralSkills = [];
  let checkedPrev = [];

  const [checkedGeneralSkills1,
    setCheckedGeneralSkills1] = useState(new Array(generalSkills1.length).fill(false));
  const [checkedGeneralSkills2,
    setCheckedGeneralSkills2] = useState(new Array(generalSkills2.length).fill(false));
  const [checkedInt1, setCheckedInt1] = useState(new Array(interests1.length).fill(false));
  const [checkedInt2, setCheckedInt2] = useState(new Array(interests2.length).fill(false));
  const [checkedPrev1,
    setCheckedPrev1] = useState(new Array(previousExperience1.length).fill(false));
  const [checkedPrev2,
    setCheckedPrev2] = useState(new Array(previousExperience2.length).fill(false));

  const store = useSelector((state) => state.auth.value);

  const [jobseeker, setJobseeker] = useState({
    name: store.user.firstName,
    pronouns: store.user.pronouns,
    phone: store.user.phoneNumber,
    email: store.email,
    clientInfo:
    {
      'City/State': 'City/State',
      Ethnicity: 'hhiiii',
      Age: 'Age',
      'Gender Identity': 'Gender Identity',
      Sexuality: 'Sexuality',
      Veteran: 'nooooo',
      Disability: 'Disability',
      'Housing Situation': 'Housing Situation',
      'Currently Employed': 'Employment Status',
      'Prior Convictions': 'arghhhhh',
    },
    industryInterests: {},
    generalSkills: {},
    skillsChecklist: {},
    education: [{
    }],
    occupation: [],
    dreamjob: 'Dream Job',
  });

  function combineCheckboxes() {
    checkedInterests = checkedInt1.concat(checkedInt2);
    checkedGeneralSkills = checkedGeneralSkills1.concat(checkedGeneralSkills2);
    checkedPrev = checkedPrev1.concat(checkedPrev2);
  }

  async function populateInterests() {
    const tempInterests = interests1.concat(interests2);
    const interestPairs = {};
    tempInterests.forEach((interest, index) => {
      interestPairs[interest] = checkedInterests[index];
    });
    const tempSkills = generalSkills1.concat(generalSkills2);
    const skillPairs = {};
    tempSkills.forEach((skill, index) => {
      skillPairs[skill] = checkedGeneralSkills[index];
    });
    const tempPrev = previousExperience1.concat(previousExperience2);
    const prevPairs = {};
    tempPrev.forEach((prev, index) => {
      prevPairs[prev] = checkedPrev[index];
    });
    await setJobseeker({
      ...jobseeker,
      industryInterests: interestPairs,
      generalSkills: skillPairs,
      skillsChecklist: prevPairs,
    });
  }

  const saveJobseeker = async () => {
    combineCheckboxes();
    populateInterests();
  };

  const addEducation = (event) => {
    event.preventDefault();
    const temp = [...jobseeker.education];
    if (temp.length >= 3) {
      alert('If you have more than 3 degrees, please put the most recent three.');
    } else {
      temp.push({
        degree: 'No',
        degreeType: '',
        certificate: 'No',
        certificateType: '',
      });
      setJobseeker({
        ...jobseeker,
        education: temp,
      });
    }
  };

  const addOccupation = (event) => {
    event.preventDefault();
    const temp = [...jobseeker.occupation];
    if (temp.length >= 3) {
      alert('If you have more than three past positions, please put the most recent three.');
    } else {
      temp.push('');
      setJobseeker({
        ...jobseeker,
        occupation: temp,
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
    console.log(skillsChecklistOptions);
  };

  const editOccupation = (event, index) => {
    event.preventDefault();
    const temp = [...jobseeker.occupation];
    temp[index] = event.target.value;
    setJobseeker({
      ...jobseeker,
      occupation: temp,
    });
  };

  const deleteEducation = (event, index) => {
    event.preventDefault();
    const temp = [...jobseeker.education];
    temp.splice(index, 1);
    setJobseeker({
      ...jobseeker, // change this to prevJobseeker
      education: temp,
    });
  };

  const deleteOccupation = (index) => {
    setJobseeker((prevJobseeker) => {
      const temp = { ...prevJobseeker };
      temp.occupation.splice(index, 1);
      return { ...temp };
    });
  };

  const clientInfoFields = [
    { title: 'Authentic Name', toChange: 'name', var: jobseeker.name },
    { title: 'Pronouns', toChange: 'pronouns', var: jobseeker.pronouns },
    { title: 'Phone', toChange: 'phone', var: jobseeker.phone },
    { title: 'Email', toChange: 'email', var: jobseeker.email },
    { title: 'City/State', toChange: 'City/State', var: jobseeker.clientInfo['City/State'] },
    { title: 'Ethnicity', toChange: 'Ethnicity', var: jobseeker.clientInfo.Ethnicity },
    { title: 'Age', toChange: 'Age', var: jobseeker.clientInfo.Age },
    { title: 'Gender Identity', toChange: 'Gender Identity', var: jobseeker.clientInfo['Gender Identity'] },
    { title: 'Sexuality', toChange: 'Sexuality', var: jobseeker.clientInfo.Sexuality },
    { title: 'Veteran?', toChange: 'Veteran', var: jobseeker.clientInfo.Veteran },
    { title: 'Disability?', toChange: 'Disability', var: jobseeker.clientInfo.Disability },
    { title: 'Housing Situation', toChange: 'Housing Situation', var: jobseeker.clientInfo['Housing Situation'] },
    { title: 'Currently Employed?', toChange: 'Currently Employed', var: jobseeker.clientInfo['Currently Employed'] },
    { title: 'Prior Convictions?', toChange: 'Prior Convictions', var: jobseeker.clientInfo['Prior Convictions'] },
  ];

  const [temp, setTemp] = useState(false);

  useEffect(() => {
    if (temp) {
      saveJobseeker();
    }
  }, [checkedInt1, checkedInt2, checkedPrev1,
    checkedPrev2, checkedGeneralSkills1, checkedGeneralSkills2]);

  useEffect(() => {
    if (temp) {
      createJobseekerData(jobseeker.email, jobseeker);
    }
  }, [jobseeker]);

  useEffect(() => {
    const asyncFn = async () => {
      const jobseekerData = await fetchJobseekerData(store.email);
      setJobseeker(jobseekerData.data());
      const sortedInterestKeys = Object.keys(jobseekerData.data().industryInterests).sort();
      const pulledInt1 = [];
      const pulledInt2 = [];
      for (let i = 0; i < sortedInterestKeys.length; i += 1) {
        if (i < 21) {
          pulledInt1.push(jobseekerData.data().industryInterests[sortedInterestKeys[i]]);
        } else {
          pulledInt2.push(jobseekerData.data().industryInterests[sortedInterestKeys[i]]);
        }
      }
      setCheckedInt1(pulledInt1);
      setCheckedInt2(pulledInt2);
      console.log(jobseeker.industryInterests);
      // const sortedSkillKeys = Object.keys(jobseekerData.data().skillsChecklist).sort();
      // const pulledSkills1 = [];
      // const pulledSkills2 = [];
      // for (let i = 0; i < sortedSkillKeys.length; i += 1) {
      //   if (i <= 18) {
      //     pulledSkills1.push(jobseekerData.data().skillsChecklist[sortedSkillKeys[i]]);
      //   } else {
      //     pulledSkills2.push(jobseekerData.data().skillsChecklist[sortedSkillKeys[i]]);
      //   }
      // }
      // console.log(checkedPrev1);
      // console.log(pulledSkills1);
      // setCheckedPrev1(pulledSkills1);
      // setCheckedPrev2(pulledSkills2);
      // const sortedGenSkillsKeys = Object.keys(jobseekerData.data().generalSkills).sort();
      // const pulledGenSkills1 = [];
      // const pulledGenSkills2 = [];
      // for (let i = 0; i < sortedGenSkillsKeys.length; i += 1) {
      //   if (i <= 3) {
      //     pulledGenSkills1.push(jobseekerData.data().generalSkills[sortedGenSkillsKeys[i]]);
      //   } else {
      //     pulledGenSkills2.push(jobseekerData.data().generalSkills[sortedGenSkillsKeys[i]]);
      //   }
      // }
      // setCheckedGeneralSkills1(pulledGenSkills1);
      // setCheckedGeneralSkills2(pulledGenSkills2);
      setTemp(true);
      console.log(jobseekerData.data());
    };
    asyncFn();
  }, []);

  return (
    <div>
      <div className="content">
        <div>
          <div className="assessment-section-title">Client Info</div>
          <div className="baby-divider" />
          <form>
            <div className="inputWrapper">
              <div>
                {clientInfoFields.map((item) => (
                  <div>
                    <TextField
                      id="outlined-basic"
                      label={item.title}
                      variant="outlined"
                      placeholder={item.title}
                      value={item.var}
                      focused
                      onChange={(e) => {
                        if ('clientInfo' in jobseeker && item.toChange in jobseeker.clientInfo) {
                          setJobseeker((prevJobseeker) => ({
                            ...prevJobseeker,
                            clientInfo: {
                              ...prevJobseeker.clientInfo,
                              [item.toChange]: e.target.value,
                            },
                          }));
                        } else {
                          setJobseeker((prevJobseeker) => ({
                            ...prevJobseeker,
                            [item.toChange]: e.target.value,
                          }));
                        }
                      }}
                      InputProps={textFieldStyles.inputProps}
                      InputLabelProps={textFieldStyles.labelProps}
                      className="input-field"
                    />
                    <div className="op-between-inputs" />
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>

        <div>
          <div className="section-divider" />
          <div className="assessment-section-title">Previous Experience</div>
          <div className="assessment-section-subtitle">Please check all the skill sets that apply to ye.</div>
        </div>
        <div className="columns-container">
          <div className="checkboxes-column-left">
            <Checkboxes
              skills={previousExperience1}
              checkedArr={checkedPrev1}
              setCheckedArr={setCheckedPrev1}
            />
          </div>
          <div className="checkboxes-column-right">
            <Checkboxes
              skills={previousExperience2}
              checkedArr={checkedPrev2}
              setCheckedArr={setCheckedPrev2}
            />
          </div>
        </div>

        <div>
          <div className="section-divider" />
          <div className="assessment-section-title">Education Info</div>
          {jobseeker.education.map((educationObject, index) => (
            <div>
              <form>
                <div>
                  <FormControl style={styles.formControl}>
                    <InputLabel style={styles.inputLabel}>
                      Degree?
                    </InputLabel>
                    <NativeSelect
                      defaultValue="No"
                      style={styles.dropdownOptions}
                      onChange={(e) => editEducation(e, 'degree', index)}
                      menuprops={{
                        PaperProps: {
                          style: styles.purpleBackground,
                        },
                      }}
                    >
                      <option value="Yes" className="dropit">Yes</option>
                      <option value="No" className="dropit">No</option>
                      <option value="Progress" className="dropit">Still Working On</option>
                    </NativeSelect>
                  </FormControl>
                </div>
                {(jobseeker.education[index].degree === 'Progress' || jobseeker.education[index].degree === 'Yes') && (
                  <div>
                    <div className="op-between-inputs" />
                    <TextField
                      id="outlined-basic"
                      label="Type of Degree"
                      placeholder="Type of Degree"
                      value={jobseeker.education[index].degreeType}
                      variant="outlined"
                      focused
                      onChange={(e) => editEducation(e, 'degreeType', index)}
                      InputProps={textFieldStyles.inputProps}
                      InputLabelProps={textFieldStyles.labelProps}
                      className="input-field"
                    />
                  </div>
                )}
                <div>
                  <FormControl style={styles.formControl}>
                    <InputLabel style={styles.inputLabel}>
                      Certificate
                    </InputLabel>
                    <NativeSelect
                      defaultValue="No"
                      style={styles.dropdownOptions}
                      onChange={(e) => editEducation(e, 'certificate', index)}
                    >
                      <option value="Yes" style={styles.dropdownOptions}>Yes</option>
                      <option value="No" style={styles.dropdownOptions}>No</option>
                      <option value="Progress" style={styles.dropdownOptions}>Still Working On</option>
                    </NativeSelect>
                  </FormControl>
                </div>
                {(jobseeker.education[index].certificate === 'Progress' || jobseeker.education[index].certificate === 'Yes') && (
                  <div>
                    <div className="op-between-inputs" />
                    <TextField
                      id="outlined-basic"
                      label="Type of Certificate"
                      placeholder="Type of Certificate"
                      value={jobseeker.education[index].certificateType}
                      variant="outlined"
                      focused
                      onChange={(e) => editEducation(e, 'certificateType', index)}
                      InputProps={textFieldStyles.inputProps}
                      InputLabelProps={textFieldStyles.labelProps}
                      className="input-field"
                    />
                  </div>
                )}
              </form>
              <div className="op-between-inputs" />
              <div className="left-button">
                <button type="button" onClick={(e) => deleteEducation(e, index)} className="delete-buttons">
                  <img
                    src={Delete}
                    alt="delete icon"
                    style={{ marginRight: '12px' }}
                  />
                  Delete Education

                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="left-button">
          <button type="button" onClick={addEducation} className="add-buttons">
            <img
              src={Add}
              alt="add icon"
              style={{ marginRight: '12px' }}
            />
            Add Education

          </button>
        </div>

        <div>
          <div className="section-divider" />
          <div className="assessment-section-title">List of Current/Previous Occupations</div>
          <form>
            <div>
              {jobseeker.occupation.map((occupationObject, index) => (
                <div>
                  <form>
                    <div className="baby-divider" />
                    <TextField
                      id="outlined-basic"
                      label={`Occupation ${index + 1}`}
                      value={occupationObject}
                      placeholder={`Occupation ${index + 1}`}
                      variant="outlined"
                      focused
                      onChange={(e) => editOccupation(e, index)}
                      InputProps={textFieldStyles.inputProps}
                      InputLabelProps={textFieldStyles.labelProps}
                      className="input-field"
                    />
                    <div className="op-between-inputs" />
                  </form>
                  <div className="left-button">
                    <button type="button" className="delete-buttons" onClick={(e) => { e.preventDefault(); deleteOccupation(index).then(console.log(jobseeker.occupation)); }}>
                      <img
                        src={Delete}
                        alt="delete icon"
                        style={{ marginRight: '12px' }}
                      />
                      Delete Occupation
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="left-button">
              <button type="button" onClick={addOccupation} className="add-buttons">
                <img
                  src={Add}
                  alt="add icon"
                  style={{ marginRight: '12px' }}
                />
                Add Occupation
              </button>
            </div>
          </form>
        </div>
        <div>
          <div className="section-divider" />
          <div className="assessment-section-title">Industry Interest</div>
          <div className="assessment-section-subtitle">
            In what areas of the followin&apos; industries are
            ye open to explorin&apos; or have an interest in possible future employment?
          </div>
          <div className="columns-container">
            <div className="checkboxes-column-left">
              <Checkboxes
                skills={interests1}
                checkedArr={checkedInt1}
                setCheckedArr={setCheckedInt1}
              />
            </div>
            <div className="checkboxes-column-right">
              <Checkboxes
                skills={interests2}
                checkedArr={checkedInt2}
                setCheckedArr={setCheckedInt2}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="section-divider" />
          <div className="assessment-section-title">Skills Checklist</div>
          <div className="assessment-section-subtitle">
            Please check all the skill sets that apply to ye.
          </div>
          <div className="columns-container">
            <div className="checkboxes-column-left">
              <Checkboxes
                skills={generalSkills1}
                checkedArr={checkedGeneralSkills1}
                setCheckedArr={setCheckedGeneralSkills1}
                subskills={subskills1}
              />
            </div>
            <div className="checkboxes-column-right">
              <Checkboxes
                skills={generalSkills2}
                checkedArr={checkedGeneralSkills2}
                setCheckedArr={setCheckedGeneralSkills2}
                subskills={subskills2}
              />
            </div>
          </div>
        </div>

        <div>
          <div className="section-divider" />
          <div className="assessment-section-title">Ultimate Dream Job</div>
          <div className="baby-divider" />
          <form>
            <div className="inputWrapper">
              <TextField
                id="outlined-basic"
                label="Dream Job"
                placeholder="Dream Job"
                value={jobseeker.dreamjob}
                variant="outlined"
                focused
                onChange={(e) => {
                  setJobseeker({
                    ...jobseeker,
                    dreamjob: e.target.value,
                  });
                }}
                InputProps={textFieldStyles.inputProps}
                InputLabelProps={textFieldStyles.labelProps}
                className="input-field"
              />
            </div>
          </form>
        </div>
        <div className="section-divider" />
      </div>
    </div>
  );
}
export default Assessment;
