import React, { useState } from 'react';
import './TrainingPrograms.css';
import { TextField } from '@material-ui/core';
import { styled, makeStyles } from '@material-ui/core/styles';
import Add from '../../Assets/add.svg';

function TrainingPrograms() {
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

  const classes = useStyles();

  const [allPrograms, setAllPrograms] = useState([{
    program: '',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: '',
    notes: '',
  },
  {
    program: '',
    referral: '',
    start: '',
    enrolled: '',
    end: '',
    completed: '',
    notes: '',
  }]);

  const addProgram = async (event) => {
    event.preventDefault();
    console.log(allPrograms);
    const temp = [...allPrograms];
    console.log(temp);
    temp.push({
      website: '',
      tools: '',
      created: '',
      notes: '',
    });
    console.log(temp);
    await setAllPrograms((pastProfiles) => pastProfiles.push(temp));
    console.log(allPrograms);
  };

  const editProgram = (event, element, index) => {
    console.log(event.target.value);
    event.preventDefault();
    console.log(allPrograms[index][element]);
    const temp = [...allPrograms];
    console.log(temp[index][element]);
    temp[index][element] = event.target.value;
    setAllPrograms(temp);
    console.log(allPrograms);
  };

  return (
    <div>
      <div className="temp" />
      <div className="op-title">Training Programs</div>
      <div className="between-inputs" />
      <div className="width-55vw">
        <button type="button" onClick={addProgram} className="op-add-button">
          <img
            src={Add}
            alt="add icon"
            style={{ marginRight: '12px' }}
          />
          Add Profile
        </button>
      </div>
      <div className="between-inputs" />
      <div>
        {allPrograms.map((profileObject, index) => (
          <div>
            <form>
              <div>
                <CssTextField
                  focusColor="#0c0ca4"
                  label="Training Program"
                  variant="outlined"
                  FormHelperTextProps={{ children: 'Label' }}
                  focused
                  onChange={(e) => editProgram(e, 'program', index)}
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
                <div className="between-inputs" />
                <CssTextField
                  focusColor="#0c0ca4"
                  label="Date Referral Sent"
                  variant="outlined"
                  FormHelperTextProps={{ children: 'Label' }}
                  focused
                  onChange={(e) => editProgram(e, 'referral', index)}
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
                <div className="between-inputs" />
                <CssTextField
                  focusColor="#0c0ca4"
                  label="Start Date"
                  variant="outlined"
                  FormHelperTextProps={{ children: 'Label' }}
                  focused
                  onChange={(e) => editProgram(e, 'start', index)}
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
                <div className="between-inputs" />
                <CssTextField
                  focusColor="#0c0ca4"
                  label="Date Officially Enrolled"
                  variant="outlined"
                  FormHelperTextProps={{ children: 'Label' }}
                  focused
                  onChange={(e) => editProgram(e, 'enrolled', index)}
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
                <div className="between-inputs" />
                <CssTextField
                  focusColor="#0c0ca4"
                  label="End Date"
                  variant="outlined"
                  FormHelperTextProps={{ children: 'Label' }}
                  focused
                  onChange={(e) => editProgram(e, 'end', index)}
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
                <div className="between-inputs" />
                <CssTextField
                  focusColor="#0c0ca4"
                  label="Date Completed Training"
                  variant="outlined"
                  FormHelperTextProps={{ children: 'Label' }}
                  focused
                  onChange={(e) => editProgram(e, 'completed', index)}
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
                <div className="between-inputs" />
                <CssTextField
                  focusColor="#0c0ca4"
                  label="Notes"
                  variant="outlined"
                  FormHelperTextProps={{ children: 'Label' }}
                  focused
                  onChange={(e) => editProgram(e, 'notes', index)}
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
                <div className="next-program" />
              </div>
            </form>
          </div>
        ))}
      </div>

    </div>
  );
}

export default TrainingPrograms;
