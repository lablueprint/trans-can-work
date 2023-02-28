import { ForkRightOutlined } from '@mui/icons-material';
import React, {useState, useEffect} from 'react';
import {updateJobseeker, deleteJobseeker, 
  fetchAllJobseekers, fetchJobseeker, createJobseeker} from "../../Services/jobseeker-service.js";

function SearchBar(props)
{
  const [value, setValue] = useState('');
  const [result, setResult] = useState([])
  let names = []

  useEffect(() => {
    fetchAllJobseekers()
            .then(docs => {docs.forEach(doc => {
              names.push(doc.data()['name']);
                   })
                   names.sort();
                  if (value.length > 0) {
                    setResult([]);
                    let searchQuery = value.toLowerCase();
                    for(let step = 0; step < names.length; step++) {
                      let nam = names[step].toLowerCase();
                      if(nam.slice(0, searchQuery.length).indexOf(searchQuery) !== -1) {
                        setResult(prevResult => {
                          return [...prevResult, names[step]]
                        })
                      }
                    }
                  }
                  else {
                    setResult([]);
                  }}
                   
                   );
  }, [value])


  return(
    <div>
      <header className="App-header"> 
      <p className="titleText"> Search Bar </p>
        <input type="text"
        className="searchBar"
        onChange={(event) => setValue(event.target.value)}
        value={value}
        />
        <div className="searchBack">
          {result.map((results, index) => (
            <a href="#" key={index}>
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