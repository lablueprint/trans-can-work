import React, { useState, useEffect } from 'react';
import './Assessment.css';
import { useSelector } from 'react-redux';

import {
  FormControl, InputLabel, NativeSelect,
} from '@mui/material';
import { TextField } from '@material-ui/core';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';
import { createJobseeker } from '../../Services/jobseeker-service';
import Checkboxes from '../Checkboxes/Checkboxes';

const styles = {
  dropdownOptions: {
    fontFamily: 'Montserrat',
    color: '#49454F',
    fontSize: '0.9vw',
    fontWeight: 'bold',
    border: '1.5px solid #0c0ca4',
    borderRadius: '4px',
    width: '55.0vw',
    height: '3.2vw',
    paddingLeft: '1.7%',
    textDecoration: 'none',
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
  inputLabelNew: {
    color: '#0c0ca4',
    fontSize: '0.9vw',
  },
  formControl: {
    width: '55.0vw',
    textAlign: 'left',
    textDecoration: 'none',
  },
  purpleBackground: {
    backgroundColor: 'purple',
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
    'Admin',
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
  ];
  const previousExperience2 = [
    'Hospitality',
    'Management',
    'Marketing',
    'Patient Scheduling Software',
    'Nonprofit',
    'Photograher',
    'Programming Languages (ex. Perl, Python, Java, and Ruby)',
    'Retail',
    'Security',
    'Search Engine and Keyword Optimization',
    'Talent/Actor',
    'Tech',
    'Writer',
  ];

  const skills1 = [
    'Applied Academic Skills',
    'Critical Thinking Skills',
    'Interpersonal Skills',
    'Personal Qualities',
  ];

  const skills2 = [
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
  let checkedSkills = [];
  let checkedPrev = [];

  const [checkedSkills1, setCheckedSkills1] = useState(new Array(skills1.length).fill(false));
  const [checkedSkills2, setCheckedSkills2] = useState(new Array(skills2.length).fill(false));
  const [checkedInt1, setCheckedInt1] = useState(new Array(interests1.length).fill(false));
  const [checkedInt2, setCheckedInt2] = useState(new Array(interests2.length).fill(false));
  const [checkedPrev1,
    setCheckedPrev1] = useState(new Array(previousExperience1.length).fill(false));
  const [checkedPrev2,
    setCheckedPrev2] = useState(new Array(previousExperience2.length).fill(false));

  const store = useSelector((state) => state.auth.value);

  const [jobseeker, setJobseeker] = useState({
    name: store.user.firstName,
    pronouns: 'Pronouns',
    phone: 'Phone',
    email: store.email,
    cityState: 'City/State',
    ethnicity: 'Ethnicity',
    age: 'Age',
    genderIdentity: 'Gender Identity',
    sexuality: 'Sexuality',
    veteran: 'Veteran',
    disability: 'Disability',
    housingSituation: 'Housing Situation',
    employmentStatus: 'Employment Status',
    convictions: 'Convictions',
    interests: {},
    skills: {},
    previousExperience: {},
    education: [{
      degree: '',
      degreeType: '',
      certificate: '',
      certificateType: '',
    }],
    occupation: [''],
    dreamjob: 'Dream Job',
  });

  function combineCheckboxes() {
    checkedInterests = checkedInt1.concat(checkedInt2);
    checkedSkills = checkedSkills1.concat(checkedSkills2);
    checkedPrev = checkedPrev1.concat(checkedPrev2);
  }

  async function populateInterests() {
    const tempInterests = interests1.concat(interests2);
    const interestPairs = {};
    tempInterests.forEach((interest, index) => {
      interestPairs[interest] = checkedInterests[index];
    });
    const tempSkills = skills1.concat(skills2);
    const skillPairs = {};
    tempSkills.forEach((skill, index) => {
      skillPairs[skill] = checkedSkills[index];
    });
    const tempPrev = previousExperience1.concat(previousExperience2);
    const prevPairs = {};
    tempPrev.forEach((prev, index) => {
      prevPairs[prev] = checkedPrev[index];
    });
    await setJobseeker({
      ...jobseeker,
      interests: interestPairs,
      skills: skillPairs,
      previousExperience: prevPairs,
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
    console.log(index);
    // const temp = [...jobseeker.education];
    // temp.splice(index, 1);
    // setJobseeker({
    //   ...jobseeker,
    //   education: temp,
    // });
  };

  const deleteOccupation = (index) => {
    setJobseeker((prevJobseeker) => {
      const temp = { ...prevJobseeker };
      temp.occupation.splice(index, 1);
      return { ...temp };
    });
    console.log(jobseeker.occupation);
  };

  const clientInfo = [{ title: 'Authentic Name', toChange: 'name', placeholder: jobseeker.name },
    { title: 'Pronouns', toChange: 'pronouns', placeholder: jobseeker.pronouns },
    { title: 'Phone', toChange: 'phone', placeholder: jobseeker.phone },
    { title: 'Email', toChange: 'email', placeholder: jobseeker.email },
    { title: 'City/State', toChange: 'cityState', placeholder: jobseeker.cityState },
    { title: 'Ethnicity', toChange: 'ethnicity', placeholder: jobseeker.ethnicity },
    { title: 'Age', toChange: 'age', placeholder: jobseeker.age },
    { title: 'Gender Identity', toChange: 'genderIdentity', placeholder: jobseeker.genderIdentity },
    { title: 'Sexuality', toChange: 'sexuality', placeholder: jobseeker.sexuality },
    { title: 'Veteran?', toChange: 'veteran', placeholder: jobseeker.veteran },
    { title: 'Disability?', toChange: 'disability', placeholder: jobseeker.disability },
    { title: 'Housing Situation', toChange: 'housingSituation', placeholder: jobseeker.housingSituation },
    { title: 'Currently Employed?', toChange: 'employmentStatus', placeholder: jobseeker.employmentStatus },
    { title: 'Prior Convictions?', toChange: 'convictions', placeholder: jobseeker.convictions },
  ];

  useEffect(() => {
    saveJobseeker();
  }, [checkedInt1, checkedInt2, checkedPrev1,
    checkedPrev2, checkedSkills1, checkedSkills2]);

  useEffect(() => {
    createJobseeker(jobseeker.email, jobseeker);
  }, [jobseeker]);

  return (
    <div>
      <div className="content">
        <div className="op-between-inputs" />
        <div className="op-between-inputs" />
        <div>
          <div className="assessment-section-title">Client Info</div>
          <div className="baby-divider" />
          <form>
            <div className="inputWrapper">
              <div>
                {clientInfo.map((item) => (
                  <div>
                    <TextField
                      id="outlined-basic"
                      label={item.title}
                      variant="outlined"
                      placeholder={item.placeholder}
                      focused
                      onChange={(e) => {
                        setJobseeker({
                          ...jobseeker,
                          [item.toChange]: e.target.value,
                        });
                      }}
                      InputProps={textFieldStyles.inputProps}
                      InputLabelProps={textFieldStyles.labelProps}
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
          <div className="baby-divider" />
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
                  <div className="op-between-inputs" />
                </div>
                {(jobseeker.education[index].degree === 'Progress' || jobseeker.education[index].degree === 'Yes') && (
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Type of Degree"
                      placeholder={jobseeker.education[index].degreeType}
                      variant="outlined"
                      focused
                      onChange={(e) => editEducation(e, 'degreeType', index)}
                      InputProps={textFieldStyles.inputProps}
                      InputLabelProps={textFieldStyles.labelProps}
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
                  <div className="op-between-inputs" />
                </div>
                {(jobseeker.education[index].certificate === 'Progress' || jobseeker.education[index].certificate === 'Yes') && (
                  <div>
                    <TextField
                      id="outlined-basic"
                      label="Type of Certificate"
                      placeholder={jobseeker.education[index].certificateType}
                      variant="outlined"
                      focused
                      onChange={(e) => editEducation(e, 'certificateType', index)}
                      InputProps={textFieldStyles.inputProps}
                      InputLabelProps={textFieldStyles.labelProps}
                    />
                  </div>
                )}
              </form>
              <div className="baby-divider" />
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
          <div className="baby-divider" />
          <form>
            <div>
              {jobseeker.occupation.map((occupationObject, index) => (
                <div>
                  <form>
                    <TextField
                      id="outlined-basic"
                      label={`Occupation ${index + 1}`}
                      value={occupationObject}
                      placeholder={occupationObject}
                      variant="outlined"
                      focused
                      onChange={(e) => editOccupation(e, index)}
                      InputProps={textFieldStyles.inputProps}
                      InputLabelProps={textFieldStyles.labelProps}
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
          <div className="assessment-section-title">Skills Checklist</div>
          <div className="assessment-section-subtitle">
            Please check all the skill sets that apply to ye.
          </div>
          <div className="columns-container">
            <div className="checkboxes-column-left">
              <Checkboxes
                skills={skills1}
                checkedArr={checkedSkills1}
                setCheckedArr={setCheckedSkills1}
                subskills={subskills1}
              />
            </div>
            <div className="checkboxes-column-right">
              <Checkboxes
                skills={skills2}
                checkedArr={checkedSkills2}
                setCheckedArr={setCheckedSkills2}
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
                placeholder={jobseeker.dreamjob}
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
