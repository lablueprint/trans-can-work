import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import propTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

export default function FilterChips({
  skills, checkedSkills, setCheckedSkills, interests, checkedInterests, setCheckedInterests,
}) {
  const [skillChips, setSkillChips] = useState([]);
  const [interestChips, setInterestChips] = useState([]);

  const handleDeleteSkills = (position) => {
    const updatedCheckedState = checkedSkills.map((item, index) => (index === position
      ? !item : item));

    setCheckedSkills(updatedCheckedState);
  };

  const handleDeleteInterests = (position) => {
    const updatedCheckedState = checkedInterests.map((item, index) => (index === position
      ? !item : item));
    setCheckedInterests(updatedCheckedState);
  };

  // filtering methods
  const getCheckedSkills = () => {
    const checked = [];
    checkedSkills.forEach((item, index) => {
      if (item === true) { checked.push([index, skills[index]]); }
    });
    return checked;
  };

  const getCheckedInterests = () => {
    const checked = [];
    checkedInterests.forEach((item, index) => {
      if (item === true) { checked.push([index, interests[index]]); }
    });
    return checked;
  };

  useEffect(() => {
    setSkillChips(getCheckedSkills());
    setInterestChips(getCheckedInterests());
  }, [checkedInterests, checkedSkills]);

  return (
    <Stack direction="row" spacing={1}>
      {skillChips.map((skill) => (
        <Chip
          key={uuidv4()}
          sx={{ bgcolor: '#5BCEFA', color: '#1D192B' }}
          label={skill[1]}
          onDelete={() => handleDeleteSkills(skill[0])}
        />
      ))}
      {interestChips.map((interest) => (
        <Chip
          key={uuidv4()}
          sx={{ bgcolor: '#F5A9B8', color: '#1D192B' }}
          label={interest[1]}
          onDelete={() => handleDeleteInterests(interest[0])}
        />
      ))}
    </Stack>
  );
}

FilterChips.propTypes = {
  checkedSkills: propTypes.arrayOf(propTypes.bool).isRequired, // i think this is
  setCheckedSkills: propTypes.func.isRequired,
  checkedInterests: propTypes.arrayOf(propTypes.bool).isRequired, // i think this is
  setCheckedInterests: propTypes.func.isRequired,
  skills: propTypes.arrayOf(propTypes.string).isRequired,
  interests: propTypes.arrayOf(propTypes.string).isRequired,
};
