import React from 'react';
import {
  Route, Routes,
} from 'react-router-dom';
// import { Archive } from '@mui/icons-material';
import {
  Home,
  Login,
  NavigatorDashboard,
  Register,
  Reset,
  Profile,
  ProfileTemp,
  ArchiveTemp,
} from './Pages';
import './App.css';
// import Footer from './Components/Footer/Footer';
// import Header from './Components/Navigation/Header';
import Splash from './Components/Splash';
import approvalIcon from './Assets/trans flag graphic.svg';
import AdminView from './Components/AdminView';
import NavigatorMenu from './Components/Navigation/NavigatorMenu';
import MilestoneMap from './Components/Milestones/MilestoneMap';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<NavigatorMenu />}>
          <Route path="roadmap" element={<MilestoneMap />} />
          <Route path="assessment" element={<NavigatorDashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard/navigator" element={<NavigatorDashboard />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/newprofile" element={<ProfileTemp />} />
        <Route path="/adminview" element={<AdminView />} />
        <Route path="/archivepopuptesting" element={<ArchiveTemp />} />

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
      {/* <Header />
      <Footer /> */}
    </div>
  );
}
// temporarily commented out the nav-bar!
export default App;
