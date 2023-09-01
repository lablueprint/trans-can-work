import React from 'react';
import './Checkboxes.css';
import { PropTypes } from 'prop-types';

function Checkboxes({ skills, checkedArr, setCheckedArr }) {
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedArr.map((item, index) => (index === position
      ? !item : item));
    setCheckedArr(updatedCheckedState);
  };
  return (
    <div>
      {skills.map((name, index) => (
        <div className="row" key={name}>
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
  checkedArr: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setCheckedArr: PropTypes.func.isRequired,
};

export default Checkboxes;
