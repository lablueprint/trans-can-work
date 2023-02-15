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
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Navigation/Header';
import Users from './Services/express-test';

function App() {
  return (
    <div className="App">
      <Users />
      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
      <Header />
      <Footer /> */}
    </div>
  );
}

export default App;