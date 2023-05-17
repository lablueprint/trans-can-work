/*eslint-disable*/
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
  Landing,
  JobseekerData,
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';
import Header from './Components/Navigation/Header';
import Splash from './Components/Splash';
import approvalIcon from './Assets/mobile_friendly_24px.png';
import AdminView from './Components/AdminView';
import ScrollToTop from './Pages/scrollToTop';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<><ScrollToTop/><Login /></>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<><ScrollToTop/><Register /></>} />
        <Route path="/dashboard/navigator" element={<NavigatorDashboard />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/onboard" element={<JobseekerData useremail="solia@goodpl.us" username="solia tennis" />} />
        <Route path="/adminview" element={<AdminView />} />
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
      {/* <Header /> */} 
      <Footer />
    </div>
  );
}
// temporarily commented out the nav-bar!
export default App;
