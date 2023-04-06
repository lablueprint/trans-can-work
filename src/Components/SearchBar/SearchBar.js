import React, { useState, useEffect } from 'react';
import {
  fetchAllJobseekers,
} from '../../Services/jobseeker-service';

function SearchBar() {
  const [value, setValue] = useState('');
  const [result, setResult] = useState([]);
  const names = [];

  useEffect(() => {
    fetchAllJobseekers()
      .then((docs) => {
        docs.forEach((doc) => {
          names.push(doc.data().name);
        });
        names.sort();
        if (value.length > 0) {
          setResult([]);
          const searchQuery = value.toLowerCase();
          for (let step = 0; step < names.length; step += 1) {
            const nam = names[step].toLowerCase();
            if (nam.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
              setResult((prevResult) => [...prevResult, names[step]]);
            }
          }
        } else {
          setResult([]);
        }
      });
  }, [value]);

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
        <div className="searchBack">
          {result.map((results, index) => (
            <a href="#/" key={index.id}>
              <div className="searchEntry">
                {results}
              </div>
            </a>
          ))}
        </div>
      </header>
    </div>
  );
}

export default SearchBar;
