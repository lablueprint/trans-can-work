import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Home
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
