import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Home,
  Login,
  Register,
  Reset,
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
