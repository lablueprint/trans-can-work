import React, { useState } from 'react';
import './NavigatorDashboard.css';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Avatar from 'react-avatar';
import {
  FormControl, InputLabel, NativeSelect,
} from '@mui/material';
import './JobseekerData.css';
// import Back from '../Assets/Assessment.png';
import { TextField } from '@material-ui/core';
// import InputAdornment from '@mui/material/InputAdornment';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import GoogleIcon from '@mui/icons-material/Google';
import { styled, makeStyles } from '@material-ui/core/styles';
import Save from '../Assets/save.svg';
import Add from '../Assets/add.svg';
import Delete from '../Assets/delete.svg';
import Back from '../Assets/back.svg';
import { createJobseeker } from '../Services/jobseeker-service';
import Checkboxes from './Checkboxes';

const CssTextField = styled(TextField, {
  shouldForwardProp: (props) => props !== 'focusColor',
})((p) => ({
  // input label when focused
  '& label.Mui-focused': {
    color: p.focusColor,
  },
  // focused color for input with variant='standard'
  '& .MuiInput-underline:after': {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='filled'
  '& .MuiFilledInput-underline:after': {
    borderBottomColor: p.focusColor,
  },
  // focused color for input with variant='outlined'
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: p.focusColor,
    },
  },
}));

const useStyles = makeStyles({
  labelInput: {
    fontSize: '0.9vw',
  },
  button: {
    border: '3px solid',
  },
});

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
  formControl: {
    // no font properties in this?
    width: '55.0vw',
    textAlign: 'left',
    textDecoration: 'none',
  },
};

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
    occupation: ['None'],
    dreamjob: 'None',
  });

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

  // const skills = ['Accounting Software',
  //   'Administrative',
  //   'Adobe Software Suite',
  //   'Bilingual',
  //   'Brand Management',
  //   'Cold Calling',
  //   'Computer Software and Application Software',
  //   'CPR',
  //   'Customer Service',
  //   'Database Management',
  //   'Excel',
  //   'Graphic Design',
  //   'Machinery Skills',
  //   'Marketing Campaign Management',
  //   'Mobile Development',
  //   'Multilingual',
  //   'Negotiation',
  //   'Patient Scheduling Software',
  //   'Philanthropy',
  //   'Photo Editing',
  //   'Photography',
  //   'Photoshop',
  //   'Powerpoint',
  //   'Programming Languages: Ex. Perl, Python, Java and Ruby',
  //   'Project Management',
  //   'Public Speaking',
  //   'Search Engine and Keyword Optimization',
  //   'Statistical Analysis',
  //   'Type 60+WPM',
  //   'User Interface Design',
  //   'Wood Working',
  //   'Word',
  //   'Writing',
  //   'Money Handling',
  //   'Customer Service',
  //   'Inventory Management',
  //   'ServSafe / Food Safety Certification / Food Handlers Card',
  // ];

  // eslint-disable-next-line no-unused-vars
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

  // eslint-disable-next-line no-unused-vars
  // const [checkedSkills1, setCheckedSkills1] = useState(new Array(skills1.length).fill(false));
  // const [checkedSkills2, setCheckedSkills2] = useState(new Array(skills2.length).fill(false));
  // eslint-disable-next-line no-unused-vars
  const [checkedInt1, setCheckedInt1] = useState(new Array(interests1.length).fill(false));
  const [checkedInt2, setCheckedInt2] = useState(new Array(interests2.length).fill(false));
  const [checkedPrev1, setCheckedPrev1] = useState(new Array(previousExperience1.length).fill(false));
  const [checkedPrev2, setCheckedPrev2] = useState(new Array(previousExperience2.length).fill(false));

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
  const addOccupation = (event) => {
    event.preventDefault();
    const temp = [...jobseeker.occupation];
    if (temp.length >= 3) {
      alert('If you have more than three past positions, please put the most recent three.');
    } else {
      temp.push('None');
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
      ...jobseeker,
      education: temp,
    });
  };

  const deleteOccupation = (event, index) => {
    event.preventDefault();
    const temp = [...jobseeker.occupation];
    temp.splice(index, 1);
    setJobseeker({
      ...jobseeker,
      occupation: temp,
    });
  };

  const clientInfo = [{ title: 'Authentic Name', toChange: jobseeker.name, placeholder: jobseeker.name },
    { title: 'Pronouns', toChange: jobseeker.pronouns, placeholder: jobseeker.pronouns },
    { title: 'Phone', toChange: jobseeker.phone, placeholder: jobseeker.phone },
    { title: 'Email', toChange: jobseeker.email, placeholder: jobseeker.email },
    { title: 'City/State', toChange: jobseeker.cityState, placeholder: jobseeker.cityState },
    { title: 'Ethnicity', toChange: jobseeker.ethnicity, placeholder: jobseeker.ethnicity },
    { title: 'Age', toChange: jobseeker.age, placeholder: jobseeker.age },
    { title: 'Gender Identity', toChange: jobseeker.genderIdentity, placeholder: jobseeker.genderIdentity },
    { title: 'Sexuality', toChange: jobseeker.sexuality, placeholder: jobseeker.sexuality },
    { title: 'Veteran?', toChange: jobseeker.veteran, placeholder: jobseeker.veteran },
    { title: 'Disability?', toChange: jobseeker.disability, placeholder: jobseeker.disability },
    { title: 'Housing Situation', toChange: jobseeker.housingSituation, placeholder: jobseeker.housingSituation },
    { title: 'Currently Employed?', toChange: jobseeker.employmentStatus, placeholder: jobseeker.employmentStatus },
    { title: 'Prior Convictions?', toChange: jobseeker.convictions, placeholder: jobseeker.convictions },
  ];

  const classes = useStyles();

  console.log(jobseeker.cityState);

  return (
    <div>
      <div className="Page Title">
        <div className="header">
          <Box sx={{ borderBottom: 1, borderColor: 'divider', boxShadow: '0 4px 4px #c9c9c9' }}>
            <div className="assessment-page-headers-container">
              <div className="assessment-page-header-name-and-icon-container">
                <div className="assessment-page-back-empty-block" />
                <div className="header-image-container">
                  <img
                    src={Back}
                    alt="back-pointing arrow"
                    style={{ marginRight: '1em' }}
                  />
                </div>
                <p className="assessment-page-back-text">Return to Clients List</p>
                <div className="assessment-page-header-empty-block" />
                <p className="assessment-page-header-profile-text">{username}</p>
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
              <div className="assessment-page-welcome-block-header">
                <div style={{ flex: '0 0 75%' }}>
                  <p className="assessment-page-title">
                    {username}
                    &apos;s Roadmap
                  </p>
                </div>
              </div>
            </div>

          </Box>
        </div>
      </div>
      <div className="content">
        <div>
          <div className="section-divider" />
          <h1>Client Info</h1>
          <div className="baby-divider" />
          <form>
            <div className="inputWrapper">
              <div>
                {clientInfo.map((item) => (
                  <CssTextField
                    focusColor="#0c0ca4"
                    label={item.title}
                    variant="outlined"
                    FormHelperTextProps={{ children: 'Label' }}
                    focused
                  // value={email}
                    onChange={(e) => {
                      setJobseeker({
                        ...jobseeker,
                        toChange: e.target.value,
                      });
                    }}
                    placeholder={item.placeholder}
                    style={{ paddingBottom: '1%' }}
                    InputProps={{
                      className: classes.root,
                      style: {
                        fontFamily: 'Montserrat',
                        color: '#49454F',
                        paddingLeft: '0.5%',
                        width: '55.0vw',
                        height: '3.2vw',
                        fontSize: '0.9vw',
                        fontWeight: 'bold',
                      },
                    }}
                    InputLabelProps={{
                      className: classes.labelInput,
                      style: {
                        fontFamily: 'Montserrat',
                        paddingLeft: '0.3%',
                        backgroundColor: 'white',
                      },
                    }}
                  />
                ))}
              </div>
            </div>
          </form>
        </div>

        <div>
          <div className="section-divider" />
          <h1>Previous Experience</h1>
          <h2>Please check all the skill sets that apply to ye.</h2>
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
          <h1 className="h1-altered">Education Info</h1>
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
                    >
                      <option value="Yes" style={styles.dropdownOptions}>Yes</option>
                      <option value="No" style={styles.dropdownOptions}>No</option>
                      <option value="Progress" style={styles.dropdownOptions}>In Progress</option>
                    </NativeSelect>
                  </FormControl>
                </div>
                {(jobseeker.education[index].degree === 'Progress' || jobseeker.education[index].degree === 'Yes') && (
                  <div>
                    <div className="baby-divider" />
                    <CssTextField
                      focusColor="#0c0ca4"
                      label="Type of Degree"
                      variant="outlined"
                      FormHelperTextProps={{ children: 'Label' }}
                      focused
                // value={email}
                      onChange={(e) => editEducation(e, 'degreeType', index)}
                    // placeholder={item.placeholder}
                      style={{ paddingBottom: '1%' }}
                      InputProps={{
                        className: classes.root,
                        style: {
                          fontFamily: 'Montserrat',
                          color: '#49454F',
                          paddingLeft: '0.5%',
                          width: '55.0vw',
                          height: '3.2vw',
                          fontSize: '0.9vw',
                          fontWeight: 'bold',
                        },
                      }}
                      InputLabelProps={{
                        className: classes.labelInput,
                        style: {
                          fontFamily: 'Montserrat',
                          paddingLeft: '0.3%',
                          backgroundColor: 'white',
                        },
                      }}
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
                      <option value="Progress" style={styles.dropdownOptions}>In Progress</option>
                    </NativeSelect>
                  </FormControl>
                </div>
                {(jobseeker.education[index].certificate === 'Progress' || jobseeker.education[index].certificate === 'Yes') && (
                  <div>
                    <div className="baby-divider" />
                    <CssTextField
                      focusColor="#0c0ca4"
                      label="Type of Certificate"
                      variant="outlined"
                      FormHelperTextProps={{ children: 'Label' }}
                      focused
                // value={email}
                      onChange={(e) => editEducation(e, 'certificateType', index)}
                    // placeholder={item.placeholder}
                      style={{ paddingBottom: '1%' }}
                      InputProps={{
                        className: classes.root,
                        style: {
                          fontFamily: 'Montserrat',
                          color: '#49454F',
                          paddingLeft: '0.5%',
                          width: '55.0vw',
                          height: '3.2vw',
                          fontSize: '0.9vw',
                          fontWeight: 'bold',
                        },
                      }}
                      InputLabelProps={{
                        className: classes.labelInput,
                        style: {
                          fontFamily: 'Montserrat',
                          paddingLeft: '0.3%',
                          backgroundColor: 'white',
                        },
                      }}
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
          <h1 className="h1-altered">List of Current/Previous Occupations</h1>
          <div className="baby-divider" />
          <form>
            <div>
              {jobseeker.occupation.map((occupationObject, index) => (
                <div>
                  <form>
                    <CssTextField
                      focusColor="#0c0ca4"
                      label={`Occupation ${index + 1}`}
                      variant="outlined"
                      FormHelperTextProps={{ children: 'Label' }}
                      focused
                // value={email}
                      onChange={(e) => editOccupation(e, index)}
                    // placeholder={item.placeholder}
                      style={{ paddingBottom: '1%' }}
                      InputProps={{
                        className: classes.root,
                        style: {
                          fontFamily: 'Montserrat',
                          color: '#49454F',
                          paddingLeft: '0.5%',
                          width: '55.0vw',
                          height: '3.2vw',
                          fontSize: '0.9vw',
                          fontWeight: 'bold',
                        },
                      }}
                      InputLabelProps={{
                        className: classes.labelInput,
                        style: {
                          fontFamily: 'Montserrat',
                          paddingLeft: '0.3%',
                          backgroundColor: 'white',
                        },
                      }}
                    />
                  </form>
                  <div className="left-button">
                    <button type="button" onClick={(e) => deleteOccupation(e, index)} className="delete-buttons">
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
          <h1>Industry Interest</h1>
          <h2>
            In what areas of the followin&apos; industries are
            ye open to explorin&apos; or have an interest in possible future employment?

          </h2>
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

        {/* <div>
          <h1>Skills Checklist</h1>
          <Checkboxes
            skills={skillsChecklist}
            checkedArr={checkedInt}
            setCheckedArr={setCheckedInt}
          />
        </div> */}

        <div>
          <div className="section-divider" />
          <h1>Ultimate Dream Job</h1>
          <form>
            <div className="inputWrapper">
              <CssTextField
                focusColor="#0c0ca4"
                label="Dream Job"
                variant="outlined"
                FormHelperTextProps={{ children: 'Label' }}
                focused
                // value={email}
                onChange={(e) => {
                  setJobseeker({
                    ...jobseeker,
                    dreamjob: e.target.value,
                  });
                }}
                placeholder={jobseeker.dreamjob}
                style={{ paddingBottom: '1%' }}
                InputProps={{
                  className: classes.root,
                  style: {
                    fontFamily: 'Montserrat',
                    color: '#49454F',
                    paddingLeft: '0.5%',
                    width: '55.0vw',
                    height: '3.2vw',
                    fontSize: '0.9vw',
                    fontWeight: 'bold',
                  },
                }}
                InputLabelProps={{
                  className: classes.labelInput,
                  style: {
                    fontFamily: 'Montserrat',
                    paddingLeft: '0.3%',
                    backgroundColor: 'white',
                  },
                }}
              />
            </div>
          </form>
        </div>
        <div className="left-button">
          <button type="button" onClick={saveJobseeker} className="add-buttons">
            <img
              src={Save}
              alt="save icon"
              style={{ marginRight: '12px' }}
            />
            Save Changes
          </button>
        </div>
        <div className="section-divider" />
      </div>
    </div>
  );
}
export default Onboard;

Onboard.propTypes = {
  username: PropTypes.string.isRequired,
  useremail: PropTypes.string.isRequired,
};
