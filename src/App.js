import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Home,
  Login,
  Register,
  Reset,
  Profile,
  Onboard
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Navigation/Header'; 

function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/onboard" element={<Onboard />} />
      </Routes>
      <Header /> 
      <Footer />
    </div>
  );
}

export default App;