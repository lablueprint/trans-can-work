/* eslint-disable */
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import {
  Login,
  NavigatorDashboard,
  Register,
  Reset,
  ProfileTemp,
  ArchiveTemp,
  Landing,
  JobseekerData,
  Home,
  NavDashboard,
  AdminDashboard,
  AdminView
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';
import Splash from './Components/Splash/Splash';
import approvalIcon from './Assets/Images/trans-flag-graphic.png';
import ScrollToTop from './Pages/scrollToTop';
import NavigatorMenu from './Components/Navigation/NavigatorMenu';
import MilestoneMap from './Components/Milestones/MilestoneMap';
import Internships from './Components/Internships/Internships';
import Assessment from './Components/Assessment/Assessment';
import NavView from './Components/NavView/NavView';
import Workshops from './Components/Workshops/Workshops';
import JobFairs from './Components/JobFairs/JobFairs';
import JobBoards from './Components/JobBoards/JobBoards';
import HiredInfo from './Components/HiredInfo/HiredInfo';
import Resources from './Components/Resources/Resources';
import OnlineProfiles from './Components/OnlineProfiles/OnlineProfiles';
import TrainingPrograms from './Components/TrainingPrograms/TrainingPrograms';
import { login, logout } from "./Redux/Slice/authSlices";
import { fetchUser, addUser } from './Services/user-service';
import ConfirmPopup from './Components/ConfirmPopup/confirmPopup';
import { auth } from './firebase';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.value);

  useEffect(() => {
    // on any firebase auth change 
    const unsubscribe = onAuthStateChanged(auth, async (state) => {
      // if logged in
      if (state != null) {
        // refresh the user data and redux state
        fetchUser(state.email).then((doc) => {
          const userState = {
            email: state.email,
            accessToken: state.accessToken,
            refreshToken: state.refreshToken,
            user: doc !== undefined ? doc.data(): undefined,
          }
          dispatch(login(userState));
        }).catch((error) => {
        });
      // if logged out
      } else if (user != undefined) {
        // clear redux state
        dispatch(logout());
      }
    });
    return()=>{
      unsubscribe();
    }
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="App">
        <Routes>
          <Route
            exact path="/"
            element={(
              <>
                <ScrollToTop />
                <Login />
              </>
            )}
          />
          <Route
            path="/jobseekerView"
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
          {user != undefined && 
          (
          <>
          <Route path="/clientRoadmap/:emailParam" element={<NavigatorMenu />}/>
            {/* <Route path="roadmap" element={<MilestoneMap />} />
            <Route path="assessment" element={<Assessment />} />
            <Route path="onlineprofiles" element={<OnlineProfiles />} />
            <Route path="training" element={<TrainingPrograms />} />
            <Route path="internships" element={<Internships />} />
            <Route path="workshops" element={<Workshops />} />
            <Route path="jobfairs" element={<JobFairs />} />
            <Route path="jobboards" element={<JobBoards />} />
            <Route path="resources" element={<Resources />} />
            <Route path="hiredinfo" element={<HiredInfo />} /> */}
          {/* </Route> */}
          
          <Route path="/onboard" element={<NavView />} />
          </>)
  }
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard/navigator" element={<NavigatorDashboard />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/adminview" element={<AdminView />} />

          <Route path="/archivepopuptesting" element={<ArchiveTemp />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/navdashboard" element={<NavDashboard />} />

          <Route path="/roadmap" element={<MilestoneMap />} />
          <Route
            path="/splash"
            element={
              <Splash
                header="Awaiting Approval"
                description="You have successfully signed up for an account. Please await approval from a TransCanWork Administator."
                graphic={<img alt="" src={approvalIcon} />}
              />
            }
          />
          <Route
            path = "/testConfirm" element = {<ConfirmPopup open handleClose = {()=> {}} handleConfirm = {()=> {}} title="DeleteConfirm" subtitle="subtitle goes here"/>}
          />
        </Routes>
        <Footer />
      </div>
    </LocalizationProvider>
  );
}
export default App;