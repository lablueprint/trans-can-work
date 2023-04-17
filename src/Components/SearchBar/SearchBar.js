import React, { useState, useEffect } from 'react';
// import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import TuneIcon from '@mui/icons-material/Tune';
import './SearchBar.css';

function SearchBar({ names, setOutput, placeholder }) {
  const [value, setValue] = useState('');
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (value.length > 0) {
      setResult([]);
      const searchQuery = value.toLowerCase();
      for (let step = 0; step < names.length; step += 1) {
        const nam = names[step].name.toLowerCase();
        if (nam.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
          setResult((prevResult) => [...prevResult, names[step]]);
        }
      }
    } else {
      setResult(names);
    }
  }, [value]);

  useEffect(() => setOutput(result), [result]);

  return (
    <div className="search-bar-container">
      <div style={{
        display: 'flex', flexDirection: 'row', border: '1px solid #D9D9D9', borderRadius: '30px', padding: '0 10px 0 20px', placeItems: 'center',
      }}
      >
        <input
          type="text"
          className="search-bar"
          onChange={(event) => setValue(event.target.value)}
          value={value}
          placeholder={placeholder}
        />
        <TuneIcon />
      </div>
    </div>
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  names: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    archived: PropTypes.string,
    field: PropTypes.string,
    email: PropTypes.string.isRequired,
  })).isRequired,
  setOutput: PropTypes.func.isRequired,
};

SearchBar.defaultProps = {
  placeholder: '',
};

export default SearchBar;
