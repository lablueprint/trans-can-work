import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Home,
  Login,
  NavigatorDashboard,
  Register,
  Reset,
  Profile,
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';
import Splash from './Components/Splash';
import approvalIcon from './Assets/mobile_friendly_24px.png';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/navigator" element={<NavigatorDashboard />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/splash"
          element={(
            <Splash
              header="Awaiting Approval"
              description="You have successfully signed up for an account. Please await approval from a TransCanWork Administator."
              graphic={<img alt="" src={approvalIcon} />}
            />
          )}
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
