import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Login,
  NavigatorDashboard,
  Register,
  Reset,
  Profile,
  Landing,
  JobseekerData,
  ProfileTemp,
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';

import Splash from './Components/Splash/Splash';
import approvalIcon from './Assets/Images/trans-flag-graphic.svg';
import AdminView from './Components/Dashboard/AdminView';
import ScrollToTop from './Pages/scrollToTop';
import NavigatorMenu from './Components/Navigation/NavigatorMenu';
import MilestoneMap from './Components/Milestones/MilestoneMap';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <ScrollToTop />
              <Login />
            </>
)}
        />
        <Route
          path="/register"
          element={(
            <>
              <ScrollToTop />
              <Register />
            </>
)}
        />
        <Route path="/home" element={<NavigatorMenu />}>
          <Route path="roadmap" element={<MilestoneMap />} />
          <Route path="assessment" element={<NavigatorDashboard />} />
        </Route>
        <Route path="/dashboard/navigator" element={<NavigatorDashboard />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/onboard" element={<JobseekerData useremail="solia@goodpl.us" username="solia tennis" />} />
        <Route path="/newprofile" element={<ProfileTemp />} />
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
      <Footer />
    </div>
  );
}
export default App;
