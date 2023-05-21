import React from 'react';
import propTypes from 'prop-types';
import Checkboxes from '../Checkboxes/Checkboxes';

function Filtering({
  checkedArr, setCheckedArr,
  checkedInterests, setCheckedInterests,
  skills, interests,
}) {
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
  skills: propTypes.arrayOf(propTypes.string).isRequired,
  interests: propTypes.arrayOf(propTypes.string).isRequired,
};

export default Filtering;
