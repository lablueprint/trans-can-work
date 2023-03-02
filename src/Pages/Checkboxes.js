import React from 'react';
import './Checkboxes.css';
import { PropTypes } from 'prop-types';
// later we can make each tab a different component, the individual tabs take a jobseeker as a prob

function Checkboxes({ skills, checkedArr, setCheckedArr }) {
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedArr.map((item, index) => (index === position
      ? !item : item));
    setCheckedArr(updatedCheckedState);
  };
  console.log(checkedArr);
  return (
    <div>
      {skills.map((name, index) => (
        <div className="row">
          <div>
            <input
              className="clickable"
              type="checkbox"
              id={`custom-checkbox-${index}`}
              name={name}
              value={name}
              checked={checkedArr[index]}
              onChange={() => handleOnChange(index)}
            />
            <label htmlFor={`custom-checkbox-${index}`}>{name}</label>
          </div>
        </div>
      ))}
    </div>
  );
}
Checkboxes.propTypes = {
  skills: PropTypes.arrayOf(PropTypes.string).isRequired,
  checkedArr: PropTypes.arrayOf(PropTypes.boolean).isRequired,
  setCheckedArr: PropTypes.func.isRequired,
};

export default Checkboxes;
