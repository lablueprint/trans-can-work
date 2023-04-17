import React, { useEffect } from 'react';
import propTypes from 'prop-types';
import Checkboxes from '../../Pages/Checkboxes';

// import {
//   fetchAllJobseekers,
// } from '../../Services/jobseeker-service';

function Filtering({
  checkedArr, setCheckedArr,
  checkedInterests, setCheckedInterests,
  jobseekers, setJobseekers,
  filteredNames, setFilteredNames,
  skills, interests,
}) {
  // const [checkedArr, setCheckedArr] = useState(new Array(skills.length).fill(false));
  // const [checkedInterests, setCheckedInterests] =
  // const [jobseekers, setJobseekers] = useState([]);
  // const [filteredNames, setFilteredNames] = useState([]);

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
    </div>
  );
}

Filtering.propTypes = {
  checkedArr: propTypes.arrayOf(propTypes.bool).isRequired, // i think this is
  setCheckedArr: propTypes.func.isRequired,
  checkedInterests: propTypes.arrayOf(propTypes.bool).isRequired, // i think this is
  setCheckedInterests: propTypes.func.isRequired,
  jobseekers: propTypes.arrayOf(propTypes.string).isRequired, // is this right type i dont thinks os
  setJobseekers: propTypes.func.isRequired,
  filteredNames: propTypes.arrayOf(propTypes.string).isRequired, // is this right type
  setFilteredNames: propTypes.func.isRequired,
  skills: propTypes.arrayOf(propTypes.string).isRequired,
  interests: propTypes.arrayOf(propTypes.string).isRequired,
};

export default Filtering;
