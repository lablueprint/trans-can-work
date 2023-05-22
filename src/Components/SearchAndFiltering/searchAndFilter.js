import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import TuneIcon from '@mui/icons-material/Tune';
import { Dialog, Slide } from '@mui/material';
import Filtering from './Filtering';
import SearchBar from './SearchBar';

import './searchAndFilter.css';

const skills = ['Accounting Software',
  'Administrative',
  'Adobe Software Suite',
  'Bilingual',
  'Brand Management',
  'Cold Calling',
  'Computer Software and Application Software',
  'CPR',
  'Customer Service',
  'Database Management',
  'Excel',
  'Graphic Design',
  'Machinery Skills',
  'Marketing Campaign Management',
  'Mobile Development',
  'Multilingual',
  'Negotiation',
  'Patient Scheduling Software',
  'Philanthropy',
  'Photo Editing',
  'Photography',
  'Photoshop',
  'Powerpoint',
  'Programming Languages: Ex. Perl, Python, Java and Ruby',
  'Project Management',
  'Public Speaking',
  'Search Engine and Keyword Optimization',
  'Statistical Analysis',
  'Type 60+WPM',
  'User Interface Design',
  'Wood Working',
  'Word',
  'Writing',
  'Money Handling',
  'Customer Service',
  'Inventory Management',
  'ServSafe / Food Safety Certification / Food Handlers Card',
];

const interests = ['Accounting/Bookkeeping',
  'App Type Jobs',
  'Architecture/Construction',
  'Audio/Video Technology & Communication',
  'Barista',
  'Bartender',
  'Bookkeeping',
  'Business Management and Administration',
  'Call Center',
  'Caregiver',
  'Carpenter',
  'Cashier',
  'Data Entry',
  'Delivery Driver',
  'Education & Training',
  'Engineering',
  'Finance',
  'Fundraising',
  'Graphic Design',
  'Health/Medical',
  'Hospitality',
  'Human Resources',
  'IT (Information Technology)',
  'Janitorial',
  'Legal',
  'Marketing/Sales',
  'Massage Therapy',
  'Non Profit',
  'Personal Assistant',
  'Pharmasist',
  'Philantropy',
  'Photographer',
  'Production',
  'Public Relations',
  'Real Estate',
  'Remote',
  'Retail',
  'Sales',
  'Security',
  'Server/Host',
  'Social Media Management',
  'Web Design',
];

const Transition = React.forwardRef((props, ref) => (
  <Slide direction="right" ref={ref} {...props} />
));

function SearchAndFilter({
  accounts, setOutput,
}) {
  const [searchTerms, setSearchTerms] = useState('');
  const [checkedArr, setCheckedArr] = useState(new Array(skills.length).fill(false));
  const [checkedInterests, setCheckedInterests] = useState(new Array(interests.length).fill(false));

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
            console.log(skill);
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
};

export default SearchAndFilter;
