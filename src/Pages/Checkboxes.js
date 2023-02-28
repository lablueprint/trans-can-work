import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import "./Checkboxes.css"
// later we can make each tab a different component, the individual tabs take a jobseeker as a prob

function Checkboxes(props) {
    const skills = props.props.skills
    const checkedArr = props.props.checkedArr
    const setCheckedArr = props.props.setCheckedArr
    const handleOnChange = (position) => {
      const updatedCheckedState = checkedArr.map((item, index) =>
        index === position ? !item : item
      )
      setCheckedArr(updatedCheckedState)
    };
    console.log(checkedArr)
    return (
    <div>
        {skills.map((name, index) => {
          return (
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
                  <label for={`custom-checkbox-${index}`}>{name}</label>
                </div>
              </div>
          );
        })}
    </div>
  );
}
export default Checkboxes