import React from "react";
import SearchBar from '../Components/SearchBar/SearchBar';

export default function Home() {
    return (
      <div className="App">
        <header className="App-header">
          <SearchBar></SearchBar>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }