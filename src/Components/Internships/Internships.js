import React, { useState } from 'react';
import './Internships.css';
import { TextField } from '@material-ui/core';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function Internships() {
  const textFieldStyles = {
    inputProps: {
      style: {
        fontFamily: 'Montserrat',
        color: '#49454F',
        width: '55.0vw',
        height: '3.2vw',
        fontSize: '0.9vw',
        fontWeight: 'bold',
        borderColor: '#000AA0',
      },
    },
    labelProps: {
      style: {
        fontFamily: 'Montserrat',
        fontSize: '0.9vw',
        color: '#000AA0',
      },
    },
  };

  const [allInternships, setAllInternships] = useState([{
    company: '',
    program: '',
    position: '',
    start: '',
    end: '',
    referralDate: '',
    applied: '',
  }]);

  const addInternship = async (event) => {
    event.preventDefault();
    const temp = {
      company: '',
      program: '',
      position: '',
      start: '',
      end: '',
      referralDate: '',
      applied: '',
    };
    await setAllInternships([...allInternships, temp]);
  };

  const deleteInternship = async (event, index) => {
    event.preventDefault();
    const temp = [...allInternships];
    temp.splice(index, 1);
    await setAllInternships(temp);
  };

  const editInternship = (event, element, index) => {
    event.preventDefault();
    const temp = [...allInternships];
    temp[index][element] = event.target.value;
    setAllInternships(temp);
    console.log(allInternships);
  };

  return (
    <div>
      <div className="temp" />
      <div className="i-title">Internships</div>
      <div>
        {allInternships.map((internshipObject, index) => (
          <div>
            <div>
              <form>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="Company/Org of Internship"
                    variant="outlined"
                    value={internshipObject.company}
                    focused
                    onChange={(e) => editInternship(e, 'company', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="op-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Program Name"
                    variant="outlined"
                    value={internshipObject.program}
                    focused
                    onChange={(e) => editInternship(e, 'program', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="i-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Position"
                    variant="outlined"
                    value={internshipObject.position}
                    focused
                    onChange={(e) => editInternship(e, 'position', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="i-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Start Date"
                    variant="outlined"
                    value={internshipObject.start}
                    focused
                    onChange={(e) => editInternship(e, 'start', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="i-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="End Date"
                    variant="outlined"
                    value={internshipObject.end}
                    focused
                    onChange={(e) => editInternship(e, 'end', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="i-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Date Referral Sent (If Applicable)"
                    variant="outlined"
                    value={internshipObject.referralDate}
                    focused
                    onChange={(e) => editInternship(e, 'referralDate', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="i-between-inputs" />
                  <TextField
                    id="outlined-basic"
                    label="Did Client Apply for Position? (If Applicable)"
                    variant="outlined"
                    value={internshipObject.applied}
                    focused
                    onChange={(e) => editInternship(e, 'applied', index)}
                    InputProps={textFieldStyles.inputProps}
                    InputLabelProps={textFieldStyles.labelProps}
                  />
                  <div className="i-between-inputs" />
                </div>
              </form>
            </div>
            <div className="width-55vw">
              <button type="button" onClick={(e) => deleteInternship(e, index)} className="i-delete-button">
                <img
                  src={Delete}
                  alt="delete icon"
                  style={{ marginRight: '12px' }}
                />
                Delete Internship
              </button>
            </div>
            <div className="i-between-buttons" />
          </div>
        ))}
        <div className="width-55vw">
          <button type="button" onClick={addInternship} className="i-add-button">
            <img
              src={Add}
              alt="add icon"
              style={{ marginRight: '12px' }}
            />
            Add Internship
          </button>
        </div>
      </div>

    </div>
  );
}

export default Internships;
