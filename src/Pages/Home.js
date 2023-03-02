import React from "react";
import JobseekerNav from "../Components/Navigation/JobseekerNav";

export default function Home() {
    return (
      <div className="App">
        <header className="App-header">
          <JobseekerNav/>
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