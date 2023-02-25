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
import NavigatorDashboard from './Pages/NavigatorDashboard';
// import { Provider } from 'react-redux';
// import store from './store';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/navigatordashboard" element={<NavigatorDashboard />} />
      </Routes>
      <Header /> 
      <Footer />
    </div>
  );
}

export default App;