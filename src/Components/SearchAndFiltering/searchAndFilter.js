import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TuneIcon from '@mui/icons-material/Tune';
import { Dialog, Slide } from '@mui/material';
import Filtering from './Filtering';
import SearchBar from './SearchBar';
import { skills, interests } from './FilterConstants';
import './searchAndFilter.css';

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="right" ref={ref} {...props} />
));

function SearchAndFilter({
  accounts, setOutput, checkedArr, setCheckedArr, checkedInterests, setCheckedInterests,
}) {
  const [searchTerms, setSearchTerms] = useState('');

  // filtering dialog
  const [open, setOpen] = React.useState(false);

  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (
      anchorRef.current
      && anchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpen(false);
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current?.focus();
    }

    prevOpen.current = open;
  }, [open]);

  // search methods
  const search = (items) => {
    if (searchTerms.length > 0) {
      const searchQuery = searchTerms.toLowerCase();
      return items.filter((element) => element.name.toLowerCase().includes(searchQuery));
    }
    return items;
  };

  // filtering methods
  const getCheckedSkills = () => {
    const checkedSkills = [];
    checkedArr.forEach((item, index) => {
      if (item === true) { checkedSkills.push(skills[index]); }
    });
    return checkedSkills;
  };

  const getCheckedInterests = () => {
    const checkedInterest = [];
    checkedInterests.forEach((item, index) => {
      if (item === true) { checkedInterest.push(interests[index]); }
    });
    return checkedInterest;
  };

  const filter = (items) => {
    const checkedSkills = getCheckedSkills();
    const checkedInterest = getCheckedInterests();

    if (checkedSkills.length || checkedInterest.length) {
      const filteredChecks = items.filter((item) => {
        let foundInterests = true;
        let foundSkills = true;
        checkedInterest.forEach((interest) => {
          // this level of error-checking only necessary due to flawed backend - change in future
          if (!('interests' in item) || item.interests === undefined || !(interest in item.interests) || !item.interests[interest]) {
            foundInterests = false;
          }
        });
        checkedSkills.forEach((skill) => {
          if (!('skills' in item) || item.skills === undefined || !(skill in item.skills) || !item.skills[skill]) {
            foundSkills = false;
          }
        });
        return foundInterests && foundSkills;
      });
      return filteredChecks;
    }
    return items;
  };

  useEffect(() => {
    setOutput(filter(search(accounts)));
  }, [searchTerms, checkedInterests, checkedArr, accounts]);

  return (
    <div className="App">
      <div className="search-bar-container">
        <SearchBar
          value={searchTerms}
          setValue={setSearchTerms}
          placeholder="Search here!"
        />
        <button className="filter-button" aria-label="search bar" type="button" onClick={handleToggle}><TuneIcon /></button>
      </div>

      <Dialog
        className="popup"
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="filtering-dialog-description"
        maxWidth="s"
        PaperProps={{ style: { borderRadius: 30, maxHeight: '750px', maxWidth: '356px' } }}
      >
        <Filtering
          checkedArr={checkedArr}
          setCheckedArr={setCheckedArr}
          checkedInterests={checkedInterests}
          setCheckedInterests={setCheckedInterests}
          skills={skills}
          interests={interests}
          handleClose={handleClose}
        />
      </Dialog>
    </div>
  );
}

SearchAndFilter.propTypes = {
  accounts: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    archived: PropTypes.bool,
    field: PropTypes.string,
    email: PropTypes.string.isRequired,
  })).isRequired,
  setOutput: PropTypes.func.isRequired,
  checkedArr: PropTypes.arrayOf(PropTypes.bool).isRequired, // i think this is
  setCheckedArr: PropTypes.func.isRequired,
  checkedInterests: PropTypes.arrayOf(PropTypes.bool).isRequired, // i think this is
  setCheckedInterests: PropTypes.func.isRequired,
};

export default SearchAndFilter;
