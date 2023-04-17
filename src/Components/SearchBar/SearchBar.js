import React from 'react';
import propTypes from 'prop-types';

function SearchBar({
  value, setValue,
}) {
  // const [value, setValue] = useState('');
  // const [result, setResult] = useState([]);

  return (
    <div>
      <header className="App-header">
        <p className="titleText"> Search Bar </p>
        <input
          type="text"
          className="searchBar"
          onChange={(event) => setValue(event.target.value)}
          value={value}
        />
      </header>
    </div>
  );
}

SearchBar.propTypes = {
  value: propTypes.string.isRequired,
  setValue: propTypes.func.isRequired,
};

export default SearchBar;
