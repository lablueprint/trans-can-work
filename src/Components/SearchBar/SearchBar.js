import React from 'react';
import propTypes from 'prop-types';

function SearchBar({
  value, setValue,
}) {
  return (
    <div>
      <p className="titleText"> Search Bar </p>
      <input
        type="text"
        className="searchBar"
        onChange={(event) => setValue(event.target.value)}
        value={value}
      />
    </div>
  );
}

SearchBar.propTypes = {
  value: propTypes.string.isRequired,
  setValue: propTypes.func.isRequired,
};

export default SearchBar;
