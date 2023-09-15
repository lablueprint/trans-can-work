import React, { useState, useEffect } from 'react';
import './HiredInfo.css';
import propTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import { DateField } from '@mui/x-date-pickers/DateField';
import Add from '../../Assets/add.svg';
import Delete from '../../Assets/delete.svg';

function HiredInfo({ jobseeker, setJobseeker }) {
  const textFieldStyles = {
    inputProps: {
      style: {
        fontFamily: 'Montserrat',
        color: '#49454F',
        fontWeight: 'bold',
        borderColor: '#000AA0',
        borderWidth: '1px',
        backgroundColor: '#F7F8FE',
      },
    },
    labelProps: {
      style: {
        fontFamily: 'Montserrat',
        color: '#000AA0',
        backgroundColor: '#FFFFFF',
      },
    },
  };

  const [loaded, setLoaded] = useState(false);
  const [allHiredInfo, setAllHiredInfo] = useState([{}]);

  useEffect(() => {
    setAllHiredInfo(jobseeker.hiredInfo);
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      setJobseeker({
        ...jobseeker,
        hiredInfo: allHiredInfo,
      });
    }
  }, [allHiredInfo]);

  const addHiredInfo = async (event) => {
    event.preventDefault();
    const temp = {
      company: '',
      hiredDate: '',
      fieldOfWork: '',
      jobTitle: '',
      supervisorName: '',
      referralDate: '',
      contactEmail: '',
      contactPhoneNumber: '',
      hourlyPay: '',
      hoursPerWeek: '',
      benefits: '',
      notes: '',
    };
    await setAllHiredInfo([...allHiredInfo, temp]);
  };

  const deleteHiredInfo = async (event, index) => {
    event.preventDefault();
    const temp = [...allHiredInfo];
    temp.splice(index, 1);
    await setAllHiredInfo(temp);
  };

  const editHiredInfo = (event, element, index) => {
    event.preventDefault();
    const temp = [...allHiredInfo];
    temp[index][element] = event.target.value;
    setAllHiredInfo(temp);
    console.log(allHiredInfo);
  };

  const editDate = (newValue, label, index) => {
    const temp = [...allHiredInfo];
    temp[index][label] = newValue;
    setAllHiredInfo(temp);
  };

  const fieldProps = [
    { label: 'Name of Company', value: 'company' },
    { label: 'Hired Date', value: 'date' },
    { label: 'Field of Work', value: 'fieldOfWork' },
    { label: 'Job Title', value: 'jobTitle' },
    { label: 'Supervisor Name', value: 'supervisorName' },
    { label: 'Date Referral Sent (If Applicable)', value: 'referralDate' },
    { label: 'Contact Email', value: 'contactEmail' },
    { label: 'Contact Phone Number', value: 'contactPhoneNumber' },
    { label: 'Hourly Pay', value: 'hourlyPay' },
    { label: 'Hours Per Week', value: 'hoursPerWeek' },
    { label: 'Offers Benefits?', value: 'benefits' },
    { label: 'Notes', value: 'notes' },
  ];

  return (
    <div className="content">
      <div className="i-title">Hired Info</div>
      <div>
        {allHiredInfo.map((internshipObject, index) => (
          <div>
            <div>
              <form>
                <div>
                  {fieldProps.map((field) => (
                    <div>
                      {(field.value === 'company' || field.value === 'fieldOfWork'
                      || field.value === 'jobTitle' || field.value === 'benefits' || field.value === 'notes'
                      || field.value === 'supervisorName' || field.value === 'contactEmail' || field.value === 'contactPhoneNumber'
                      || field.value === 'hourlyPay' || field.value === 'hoursPerWeek')
                      && (
                        <>
                          <TextField
                            id="outlined-basic"
                            label={field.label}
                            variant="outlined"
                            value={internshipObject[field.value]}
                            focused
                            onChange={(e) => editHiredInfo(e, field.value, index)}
                            InputProps={textFieldStyles.inputProps}
                            InputLabelProps={textFieldStyles.labelProps}
                            className="input-field"
                          />
                          <div className="op-between-inputs" />
                        </>
                      )}
                      {(field.label === 'Hired Date' || field.label === 'End Date'
                      || field.label === 'Date Referral Sent (If Applicable)')
                      && (
                        <>
                          <DateField
                            label={field.label}
                            focused
                            value={internshipObject[field.value]}
                            onChange={(newValue) => editDate(newValue, field.value, index)}
                            InputProps={textFieldStyles.inputProps}
                            InputLabelProps={textFieldStyles.labelProps}
                            className="input-field"
                          />
                          <div className="op-between-inputs" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </form>
            </div>
            <div>
              <button type="button" onClick={(e) => deleteHiredInfo(e, index)} className="i-delete-button">
                <img
                  src={Delete}
                  alt="delete icon"
                  style={{ marginRight: '12px' }}
                />
                Delete Section
              </button>
            </div>
            <div className="i-between-buttons" />
          </div>
        ))}
        <div>
          <button type="button" onClick={addHiredInfo} className="i-add-button">
            <img
              src={Add}
              alt="add icon"
              style={{ marginRight: '12px' }}
            />
            Add Section
          </button>
        </div>
      </div>

    </div>
  );
}

export default HiredInfo;

HiredInfo.propTypes = {
  jobseeker: propTypes.shape({
    hiredInfo:
    {
      company: propTypes.string.isRequired,
      hiredDate: propTypes.instanceOf(Date),
      fieldOfWork: propTypes.string.isRequired,
      jobTitle: propTypes.string.isRequired,
      supervisorName: propTypes.string.isRequired,
      referralDate: propTypes.instanceOf(Date),
      contactEmail: propTypes.string.isRequired,
      contactPhoneNumber: propTypes.string.isRequired,
      hourlyPay: propTypes.string.isRequired,
      hoursPerWeek: propTypes.string.isRequired,
      benefits: propTypes.string.isRequired,
      notes: propTypes.string.isRequired,
    },
  }).isRequired,
  setJobseeker: propTypes.func.isRequired,
};
