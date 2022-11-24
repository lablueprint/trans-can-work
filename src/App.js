import React from 'react';
import './App.css';
import {
  Route, Routes,
} from 'react-router-dom';
import Header from './Components/Navigation/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <p>hello</p>
      <Routes>
        <Route path="/" />
      </Routes>
    </div>
  );
}

export default App;
