import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
import {
  Login,
  NavigatorDashboard,
  Register,
  Reset,
  Landing,
  JobseekerData,
  // ProfileTemp,
  Home,
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';

import Splash from './Components/Splash/Splash';
import OnlineProfiles from './Components/OnlineProfiles/OnlineProfiles';
import TrainingPrograms from './Components/TrainingPrograms/TrainingPrograms';
import approvalIcon from './Assets/Images/trans-flag-graphic.svg';
import AdminView from './Components/Dashboard/AdminView';
import ScrollToTop from './Pages/scrollToTop';
import NavigatorMenu from './Components/Navigation/NavigatorMenu';
import MilestoneMap from './Components/Milestones/MilestoneMap';
import Internships from './Components/Internships/Internships';
import Workshops from './Components/Workshops/Workshops';
import JobFairs from './Components/JobFairs/JobFairs';
import JobBoards from './Components/JobBoards/JobBoards';
import HiredInfo from './Components/HiredInfo/HiredInfo';
import Resources from './Components/Resources/Resources';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={(
            <>
              <ScrollToTop />
              <Login />
            </>
)}
        />
        <Route
          path="/"
          element={<Home />}
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
          <Route path="assessment" element={<JobseekerData />} />
          <Route path="onlineprofiles" element={<OnlineProfiles />} />
          <Route path="training" element={<TrainingPrograms />} />
          <Route path="internships" element={<Internships />} />
          <Route path="workshops" element={<Workshops />} />
          <Route path="jobfairs" element={<JobFairs />} />
          <Route path="jobboards" element={<JobBoards />} />
          <Route path="resources" element={<Resources />} />
          <Route path="hiredinfo" element={<HiredInfo />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/navigator" element={<NavigatorDashboard />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/onboard" element={<JobseekerData useremail="solia@goodpl.us" username="Solia Nasser" />} />
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
