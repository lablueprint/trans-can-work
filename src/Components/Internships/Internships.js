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
        color: '#000AA0',
        fontSize: '0.95vw',
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
    accepted: '',
    completed: '',
    notes: '',
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
      accepted: '',
      completed: '',
      notes: '',
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

  const fieldProps = [
    { label: 'Company/Org of Internship', value: 'company', changeParameter: 'company' },
    { label: 'Program Name', value: 'program', changeParameter: 'program' },
    { label: 'Position', value: 'position', changeParameter: 'position' },
    { label: 'Start Date', value: 'start', changeParameter: 'start' },
    { label: 'End Date', value: 'end', changeParameter: 'end' },
    { label: 'Date Referral Sent (If Applicable)', value: 'referralDate', changeParameter: 'referralDate' },
    { label: 'Did Client Apply for position? (If Applicable)', value: 'applied', changeParameter: 'applied' },
    { label: 'Client Officially Accepted into internship?', value: 'accepted', changeParameter: 'end' },
    { label: 'Client Successfully Completed Internship?', value: 'completed', changeParameter: 'referralDate' },
    { label: 'Notes', value: 'notes', changeParameter: 'applied' },
  ];

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
                  {fieldProps.map((field) => (
                    <div>
                      <TextField
                        id="outlined-basic"
                        label={field.label}
                        variant="outlined"
                        value={internshipObject[field.value]}
                        focused
                        onChange={(e) => editInternship(e, field.changeParameter, index)}
                        InputProps={textFieldStyles.inputProps}
                        InputLabelProps={textFieldStyles.labelProps}
                      />
                      <div className="op-between-inputs" />
                    </div>
                  ))}
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
