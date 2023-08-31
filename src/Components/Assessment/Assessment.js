import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import './Assessment.css';
import {
  FormControl, InputLabel, NativeSelect,
} from '@mui/material';
import { TextField } from '@material-ui/core';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';
import Checkboxes from '../Checkboxes/Checkboxes';
import {
  skillsChecklistOptions, industryInterestOptions, generalSkills,
  arrayToObj, checkedSkills, checkedInterests, checkedGeneralSkills, generalSubskills,
} from '../../Services/objects-service';

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

function Assessment(userData, jobseeker, setJobseeker) {
  useEffect(() => {
    console.log(userData);
    console.log(jobseeker);
  }, [userData, jobseeker]);
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

  const [skillsObj, setSkillsObj] = useState(arrayToObj(checkedSkills, skillsChecklistOptions));
  const [skillBool, setSkillBool] = useState([]);
  const [skillBool1, setSkillBool1] = useState([]);
  const [skillBool2, setSkillBool2] = useState([]);
  const [intObj, setIntObj] = useState(arrayToObj(checkedInterests, industryInterestOptions));
  const [intBool, setIntBool] = useState([]);
  const [intBool1, setIntBool1] = useState([]);
  const [intBool2, setIntBool2] = useState([]);
  const [genObj, setGenObj] = useState(arrayToObj(checkedGeneralSkills, generalSkills));
  const [genBool, setGenBool] = useState([]);
  const [genBool1, setGenBool1] = useState([]);
  const [genBool2, setGenBool2] = useState([]);
  const splitObjects = () => {
    if (Object.keys(skillsObj).length !== skillsChecklistOptions.length) {
      skillsChecklistOptions.forEach((key) => {
        if (!(Object.keys(skillsObj).includes(key))) {
          console.log(key);
        }
      });
    }
    const temp1 = Object.keys(skillsObj).sort();
    if (skillBool.length === 0) {
      temp1.forEach((key) => {
        const tempSkill = skillBool;
        tempSkill.push(skillsObj[key]);
        setSkillBool(tempSkill);
      });
    }
    const tempSkillBool1 = skillBool.slice(0, Math.ceil(skillBool.length / 2));
    setSkillBool1(tempSkillBool1);
    const tempSkillBool2 = skillBool.slice(Math.ceil(skillBool.length / 2));
    setSkillBool2(tempSkillBool2);
    const temp2 = Object.keys(intObj).sort();
    if (intBool.length === 0) {
      temp2.forEach((key) => {
        const tempInt = intBool;
        tempInt.push(intObj[key]);
        setIntBool(tempInt);
      });
    }
    const tempIntBool1 = intBool.slice(0, Math.ceil(intBool.length / 2));
    setIntBool1(tempIntBool1);
    const tempIntBool2 = intBool.slice(Math.ceil(intBool.length / 2));
    setIntBool2(tempIntBool2);
    const temp3 = Object.keys(genObj).sort();
    if (genBool.length === 0) {
      temp3.forEach((key) => {
        const tempGen = genBool;
        tempGen.push(genObj[key]);
        setGenBool(tempGen);
      });
    }
    const tempGenBool1 = genBool.slice(0, Math.ceil(genBool.length / 2));
    setGenBool1(tempGenBool1);
    const tempGenBool2 = genBool.slice(Math.ceil(genBool.length / 2));
    setGenBool2(tempGenBool2);
  };

  useEffect(() => {
    splitObjects();
  }, []);

  // function that updates the object
  const repopulateSkills = () => {
    const tempSkillObj = {};
    skillsChecklistOptions.sort().forEach((option, index) => {
      tempSkillObj[option] = skillBool[index];
    });
    setSkillsObj(tempSkillObj);
  };

  const repopulateInts = () => {
    const tempIntObj = {};
    industryInterestOptions.sort().forEach((option, index) => {
      tempIntObj[option] = intBool[index];
    });
    setIntObj(tempIntObj);
  };

  const repopulateGen = () => {
    const tempGenObj = {};
    generalSkills.sort().forEach((option, index) => {
      tempGenObj[option] = genBool[index];
    });
    setGenObj(tempGenObj);
  };

  useEffect(() => {
    setSkillBool(skillBool1.concat(skillBool2));
  }, [skillBool1, skillBool2]);

  useEffect(() => {
    setIntBool(intBool1.concat(intBool2));
  }, [intBool1, intBool2]);

  useEffect(() => {
    setGenBool(genBool1.concat(genBool2));
  }, [genBool1, genBool2]);

  useEffect(() => {
    repopulateSkills();
  }, [skillBool]);

  useEffect(() => {
    repopulateInts();
  }, [intBool]);

  useEffect(() => {
    repopulateGen();
  }, [genBool]);

  // const [skillsObj, setSkillsObj] = useState(arrayToObj(checkedSkills, skillsChecklistOptions));
  // const [interestsObj, setInterestsObj] = useState(arrayToObj(
  //   checkedInterests,
  //   industryInterestOptions,
  // ));
  // const [generalSkillsObj, setGeneralSkillsObj] = useState(arrayToObj(
  //   checkedGeneralSkills,
  //   generalSkills,
  // ));

  // const skillLabel = [];
  // const [skillBool, setSkillBool] = useState([]);
  // const interestLabel = [];
  // const interestBool = [];
  // const genSkillLabel = [];
  // const genSkillBool = [];
  // const [skillBool1, setSkillBool1] = useState([]);
  // const splitObjects = () => {
  //   const temp1 = Object.keys(skillsObj);
  //   if (skillLabel.length === 0) {
  //     temp1.forEach((key) => {
  //       skillLabel.push(key);
  //       const tempSkill = skillBool;
  //       tempSkill.push(skillsObj[key]);
  //       setSkillBool(tempSkill);
  //     });
  //   }
  //   const temp2 = Object.keys(interestsObj);
  //   temp2.forEach((key) => {
  //     interestLabel.push(key);
  //     interestBool.push(interestsObj[key]);
  //   });
  //   Object.keys(generalSkillsObj).forEach((key) => {
  //     genSkillLabel.push(key);
  //     genSkillBool.push(generalSkillsObj[key]);
  //   });
  //   console.log(skillBool);
  //   console.log(skillLabel);
  //   console.log(skillBool.slice(0, Math.ceil(skillBool.length / 2)));
  //   const tempSkillBool1 = skillBool.slice(0, Math.ceil(skillBool.length / 2));
  //   setSkillBool1(tempSkillBool1);
  // };
  // const [skillLabel1, setSkillLabel1] = useState([]);

  // useEffect(() => {
  //   splitObjects();
  //   setSkillLabel1(skillLabel.slice(0, Math.ceil(skillBool.length / 2)));
  //   console.log(skillLabel1);
  // }, []);

  // const [genSkillBool1,
  //   setgenSkillBool1] = useState(genSkillBool.slice(0, Math.ceil(genSkillBool.length / 2)));

  // let checkedInterests = [];
  // let checkedGeneralSkills = [];
  // let checkedPrev = [];

  // const [checkedGeneralSkills1,
  //   setCheckedGeneralSkills1] = useState(new Array(generalSkills1.length).fill(false));
  // const [checkedGeneralSkills2,
  //   setCheckedGeneralSkills2] = useState(new Array(generalSkills2.length).fill(false));
  // const [checkedInt1, setCheckedInt1] = useState(new Array(interests1.length).fill(false));
  // const [checkedInt2, setCheckedInt2] = useState(new Array(interests2.length).fill(false));
  // const [checkedPrev1,
  //   setCheckedPrev1] = useState(new Array(previousExperience1.length).fill(false));
  // const [checkedPrev2,
  //   setCheckedPrev2] = useState(new Array(previousExperience2.length).fill(false));

  // const [jobseeker, setJobseeker] = useState({
  //   name: store.user.firstName,
  //   pronouns: store.user.pronouns,
  //   phone: store.user.phoneNumber,
  //   email: store.email,
  //   clientInfo:
  //   {
  //     'City/State': 'City/State',
  //     Ethnicity: 'Ethnicity',
  //     Age: 'Age',
  //     'Gender Identity': 'Gender Identity',
  //     Sexuality: 'Sexuality',
  //     Veteran: 'Veteran',
  //     Disability: 'Disability',
  //     'Housing Situation': 'Housing Situation',
  //     'Currently Employed': 'Employment Status',
  //     'Prior Convictions': 'Prior Convictions',
  //   },
  //   industryInterests: [],
  //   generalSkills: [],
  //   skillsChecklist: [],
  //   education: [{
  //   }],
  //   occupation: [],
  //   dreamjob: 'Dream Job',
  // });

  // function combineCheckboxes() {
  //   checkedInterests = checkedInt1.concat(checkedInt2);
  //   checkedGeneralSkills = checkedGeneralSkills1.concat(checkedGeneralSkills2);
  //   checkedPrev = checkedPrev1.concat(checkedPrev2);
  // }

  // async function populateInterests() {
  //   const tempInterests = interests1.concat(interests2);
  //   const interestPairs = {};
  //   tempInterests.forEach((interest, index) => {
  //     interestPairs[interest] = checkedInterests[index];
  //   });
  //   const tempSkills = generalSkills1.concat(generalSkills2);
  //   const skillPairs = {};
  //   tempSkills.forEach((skill, index) => {
  //     skillPairs[skill] = checkedGeneralSkills[index];
  //   });
  //   const tempPrev = previousExperience1.concat(previousExperience2);
  //   const prevPairs = {};
  //   tempPrev.forEach((prev, index) => {
  //     prevPairs[prev] = checkedPrev[index];
  //   });
  //   await setJobseeker({
  //     ...jobseeker,
  //     industryInterests: interestPairs,
  //     generalSkills: skillPairs,
  //     skillsChecklist: prevPairs,
  //   });
  // }

  // const saveJobseeker = async () => {
  //   combineCheckboxes();
  //   populateInterests();
  // };

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

  // const [temp, setTemp] = useState(false);

  // useEffect(() => {
  //   if (temp) {
  //     saveJobseeker();
  //   }
  // }, [checkedInt1, checkedInt2, checkedPrev1,
  //   checkedPrev2, checkedGeneralSkills1, checkedGeneralSkills2]);

  // useEffect(() => {
  //   if (temp) {
  //     createJobseekerData(jobseeker.email, jobseeker);
  //   }
  // }, [jobseeker]);

  // useEffect(() => {
  //   const asyncFn = async () => {
  //     const jobseekerData = await fetchJobseekerData(store.email);
  //     setJobseeker(jobseekerData.data());
  //     const sortedInterestKeys = Object.keys(jobseekerData.data().industryInterests).sort();
  //     const pulledInt1 = [];
  //     const pulledInt2 = [];
  //     for (let i = 0; i < sortedInterestKeys.length; i += 1) {
  //       if (i < 21) {
  //         pulledInt1.push(jobseekerData.data().industryInterests[sortedInterestKeys[i]]);
  //       } else {
  //         pulledInt2.push(jobseekerData.data().industryInterests[sortedInterestKeys[i]]);
  //       }
  //     }
  //     setCheckedInt1(pulledInt1);
  //     setCheckedInt2(pulledInt2);
  //     console.log(jobseeker.industryInterests);
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
  //     setTemp(true);
  //     console.log(jobseekerData.data());
  //   };
  //   asyncFn();
  // }, []);

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
              skills={Object.keys(skillsObj).sort()
                .slice(0, Math.ceil(skillsChecklistOptions.length / 2))}
              checkedArr={skillBool1}
              setCheckedArr={setSkillBool1}
            />
          </div>
          <div className="checkboxes-column-right">
            <Checkboxes
              skills={Object.keys(skillsObj).sort()
                .slice(Math.ceil(skillsChecklistOptions.length / 2))}
              checkedArr={skillBool2}
              setCheckedArr={setSkillBool2}
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
                skills={Object.keys(intObj).sort()
                  .slice(0, Math.ceil(industryInterestOptions.length / 2))}
                checkedArr={intBool1}
                setCheckedArr={setIntBool1}
              />
            </div>
            <div className="checkboxes-column-right">
              <Checkboxes
                skills={Object.keys(intObj).sort()
                  .slice(Math.ceil(industryInterestOptions.length / 2))}
                checkedArr={intBool2}
                setCheckedArr={setIntBool2}
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
                skills={Object.keys(genObj).sort()
                  .slice(0, Math.ceil(generalSkills.length / 2))}
                checkedArr={genBool1}
                setCheckedArr={setGenBool1}
                subskills={generalSubskills.slice(Math.ceil(0, generalSkills.length / 2))}
              />
            </div>
            <div className="checkboxes-column-right">
              <Checkboxes
                skills={Object.keys(genObj).sort()
                  .slice(Math.ceil(generalSkills.length / 2))}
                checkedArr={genBool2}
                setCheckedArr={setGenBool2}
                subskills={generalSubskills.slice(Math.ceil(generalSkills.length / 2))}
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

// Assessment.propTypes = {
//   userData: propTypes.object.isRequired,
//   jobseeker: propTypes.object.isRequired,
// };
