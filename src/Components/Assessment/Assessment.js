import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import './Assessment.css';
import {
  FormControl, InputLabel,
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { TextField } from '@material-ui/core';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';
import Checkboxes from '../Checkboxes/Checkboxes';
import {
  skillsChecklistOptions, industryInterestOptions, generalSkills,
  arrayToObj, generalSubskills, objToArray,
} from '../../Services/objects-service';

const styles = {
  dropdownOptions: {
    fontFamily: 'Montserrat',
    color: '#49454F',
    fontSize: '0.9vw',
    fontWeight: 'bold',
    paddingLeft: '1.7%',
    textDecoration: 'none',
  },
  inputLabel: {
    fontFamily: 'Montserrat',
    color: '#49454F',
    width: '55.0vw',
    height: '3.2vw',
    fontSize: '0.9vw',
    fontWeight: 'bold',
    backgroundColor: '#F7F8FE',
  },
  formControl: {
    width: '55.0vw',
    textAlign: 'left',
    textDecoration: 'none',
  },
};

function Assessment({
  userData, setUserData, jobseeker, setJobseeker, email,
}) {
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

  // each set of checkboxes has 4 state variables:
  // an object with label/bool pairs
  // an array holding just the booleans for the checklist
  // an array holding the booleans for the left column
  // an array holding the booleans for the right column
  const [skillsObj, setSkillsObj] = useState();
  const [skillBool, setSkillBool] = useState([]);
  const [skillBool1, setSkillBool1] = useState();
  const [skillBool2, setSkillBool2] = useState();
  const [intObj, setIntObj] = useState();
  const [intBool, setIntBool] = useState([]);
  const [intBool1, setIntBool1] = useState();
  const [intBool2, setIntBool2] = useState();
  const [genObj, setGenObj] = useState();
  const [genBool, setGenBool] = useState([]);
  const [genBool1, setGenBool1] = useState();
  const [genBool2, setGenBool2] = useState();

  // function to split up into left and right column booleans
  const splitObjects = () => {
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

  // loaded variable keeps track of once jobseeker loaded in from backend
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    if (jobseeker !== undefined) {
      setLoaded(true);
    }
  }, [jobseeker]);

  // only assign object once the backend calls are loaded in
  useEffect(() => {
    if (loaded) {
      setSkillsObj(arrayToObj(jobseeker.skillsChecklist, skillsChecklistOptions));
      setIntObj(arrayToObj(jobseeker.industryInterest, industryInterestOptions));
      setGenObj(arrayToObj(jobseeker.generalSkills, generalSkills));
    }
  }, [loaded]);

  // as long as things are defined, change jobseeker to match frontend changes
  useEffect(() => {
    if (skillBool1 === undefined && skillsObj !== undefined) {
      splitObjects();
    } else if (skillsObj !== undefined) {
      const tempSkillsArray = objToArray(skillsObj);
      const tempJobseeker = {
        ...jobseeker,
        skillsChecklist: tempSkillsArray,
      };
      if (tempJobseeker !== jobseeker) {
        setJobseeker(tempJobseeker);
      }
    }
  }, [skillsObj]);

  // as long as things are defined, change jobseeker to match frontend changes
  useEffect(() => {
    if (intBool1 === undefined && intObj !== undefined) {
      splitObjects();
    } else if (intObj !== undefined) {
      const tempIntArray = objToArray(intObj);
      const tempJobseeker = {
        ...jobseeker,
        industryInterest: tempIntArray,
      };
      if (tempJobseeker !== jobseeker) {
        setJobseeker(tempJobseeker);
      }
    }
  }, [intObj]);

  // as long as things are defined, change jobseeker to match frontend changes
  useEffect(() => {
    if (genBool1 === undefined && genObj !== undefined) {
      splitObjects();
    } else if (genObj !== undefined) {
      const tempGenArray = objToArray(genObj);
      const tempJobseeker = {
        ...jobseeker,
        generalSkills: tempGenArray,
      };
      if (tempJobseeker !== jobseeker) {
        setJobseeker(tempJobseeker);
      }
    }
  }, [genObj]);

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
    if (skillBool1 !== undefined && skillBool2 !== undefined) {
      setSkillBool(skillBool1.concat(skillBool2));
    }
  }, [skillBool1, skillBool2]);

  useEffect(() => {
    if (intBool1 !== undefined && intBool2 !== undefined) {
      setIntBool(intBool1.concat(intBool2));
    }
  }, [intBool1, intBool2]);

  useEffect(() => {
    if (genBool1 !== undefined && genBool2 !== undefined) {
      setGenBool(genBool1.concat(genBool2));
    }
  }, [genBool1, genBool2]);

  // when the lengthy bool is updated then call repopulateSkills to update object
  useEffect(() => {
    if (skillBool.length !== 0) {
      repopulateSkills();
    }
  }, [skillBool]);

  // when the lengthy bool is updated then call repopulateInts to update object
  useEffect(() => {
    if (intBool.length !== 0) {
      repopulateInts();
    }
  }, [intBool]);

  // when the lengthy bool is updated then call repopulateGen to update object
  useEffect(() => {
    if (genBool.length !== 0) {
      repopulateGen();
    }
  }, [genBool]);

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
    if (element === 'certificate' && event.target.value === 'No') {
      temp[index].certificateType = '';
    }
    if (element === 'degree' && event.target.value === 'No') {
      temp[index].degreeType = '';
    }
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
      ...jobseeker,
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
    { title: 'First Name', toChange: 'firstName', var: userData.firstName },
    { title: 'Last Name', toChange: 'lastName', var: userData.lastName },
    { title: 'Pronouns', toChange: 'pronouns', var: userData.pronouns },
    { title: 'Phone', toChange: 'phoneNumber', var: userData.phoneNumber },
    { title: 'Email', toChange: 'email', var: email },
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

  if (skillBool1 === undefined) {
    // eventually replace with appropriate loading component
    return (<div>loading</div>);
  }

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
                        if (item.toChange === 'firstName' || item.toChange === 'lastName'
                        || item.toChange === 'pronouns' || item.toChange === 'phoneNumber') {
                          setUserData((prevUserData) => ({
                            ...prevUserData,
                            [item.toChange]: e.target.value,
                          }));
                        } else if ('clientInfo' in jobseeker && item.toChange in jobseeker.clientInfo) {
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
                  <div className="baby-divider" />
                  <FormControl
                    fullWidth
                    focused
                    style={styles.formControl}
                  >
                    <InputLabel id="demo-simple-select-label">Degree?</InputLabel>
                    <Select
                      defaultValue="No"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Degree"
                      onChange={(e) => editEducation(e, 'degree', index)}
                      style={styles.inputLabel}
                    >
                      <MenuItem value="Yes" style={styles.dropdownOptions}>Yes</MenuItem>
                      <MenuItem value="No" style={styles.dropdownOptions}>No</MenuItem>
                      <MenuItem value="Progress" style={styles.dropdownOptions}>Still Working On</MenuItem>
                    </Select>
                  </FormControl>
                  <div className="op-between-inputs" />
                </div>
                {(jobseeker.education[index].degree === 'Progress' || jobseeker.education[index].degree === 'Yes') && (
                  <div>
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
                    <div className="op-between-inputs" />
                  </div>
                )}
                <div>
                  <FormControl
                    fullWidth
                    focused
                    style={styles.formControl}
                  >
                    <InputLabel id="demo-simple-select-label">Certificate?</InputLabel>
                    <Select
                      defaultValue="No"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label="Degree"
                      onChange={(e) => editEducation(e, 'certificate', index)}
                      style={styles.inputLabel}
                    >
                      <MenuItem value="Yes" style={styles.dropdownOptions}>Yes</MenuItem>
                      <MenuItem value="No" style={styles.dropdownOptions}>No</MenuItem>
                      <MenuItem value="Progress" style={styles.dropdownOptions}>Still Working On</MenuItem>
                    </Select>
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
                    <button type="button" className="delete-buttons" onClick={(e) => { e.preventDefault(); deleteOccupation(index); }}>
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
                value={jobseeker.clientInfo['Dream Job']}
                variant="outlined"
                focused
                onChange={(e) => {
                  setJobseeker((prevJobseeker) => ({
                    ...prevJobseeker,
                    clientInfo: {
                      ...prevJobseeker.clientInfo,
                      'Dream Job': e.target.value,
                    },
                  }));
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

Assessment.propTypes = {
  email: propTypes.string.isRequired,
  userData: propTypes.shape({
    firstName: propTypes.string.isRequired,
    lastName: propTypes.string.isRequired,
    phoneNumber: propTypes.string.isRequired,
    pronouns: propTypes.string.isRequired,
  }).isRequired,
  jobseeker: propTypes.shape({
    clientInfo:
    {
      'City/State': propTypes.string.isRequired,
      Ethnicity: propTypes.string.isRequired,
      Age: propTypes.string.isRequired,
      'Gender Identity': propTypes.string.isRequired,
      Sexuality: propTypes.string.isRequired,
      Veteran: propTypes.string.isRequired,
      Disability: propTypes.string.isRequired,
      'Housing Situation': propTypes.string.isRequired,
      'Currently Employed': propTypes.string.isRequired,
      'Prior Convictions': propTypes.string.isRequired,
    },
    industryInterest: propTypes.arrayOf(
      propTypes.string.isRequired,
    ),
    generalSkills: propTypes.arrayOf(
      propTypes.string.isRequired,
    ),
    skillsChecklist: propTypes.arrayOf(
      propTypes.string.isRequired,
    ),
    education: [{
    }],
    occupation: [],
    dreamjob: propTypes.string.isRequired,
  }).isRequired,
  setJobseeker: propTypes.func.isRequired,
  setUserData: propTypes.func.isRequired,
};
