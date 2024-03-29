import React from 'react';
import propTypes from 'prop-types';
import './SearchBar.css';

function SearchBar({
  value, setValue, placeholder,
}) {
  return (
    <input
      type="text"
      className="search-bar"
      onChange={(event) => setValue(event.target.value)}
      value={value}
      placeholder={placeholder}
    />
  );
}

SearchBar.propTypes = {
  value: propTypes.string.isRequired,
  setValue: propTypes.func.isRequired,
  placeholder: propTypes.string.isRequired,
};

export default SearchBar;
