/* eslint-disable */
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import {
  Login,
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
  const store = useSelector((state) => state.auth.value);

  // change displayed home page depending on the authentication stage/user role
  const getHomeComponent = () => {
    if(store == undefined || !store.isLoggedIn) {
      return <>
              <ScrollToTop />
              <Login />
            </>
    } else if (store.user == undefined) {
      // replace with real loading graphic eventually
      return <div>loading</div> 
    } else if (!store.user.approved) {
        return <Splash
                header="Awaiting Approval"
                description="You have successfully signed up for an account. Please await approval from a TransCanWork Administator."
                graphic={<img alt="" src={approvalIcon} />}
               />
    } else if (store.user.role == "jobseeker") {
      return <MilestoneMap emailParam={store.email}/>
    } else if (store.user.role == "navigator") {
      return <NavDashboard />
    } else if (store.user.role == "admin") {
      return <AdminDashboard />
    }

  }

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
      } else if (store != undefined) {
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
          {/* Home Page - dependent on auth/role */}
          <Route
            exact path="/"
            element={getHomeComponent()}
          />

          {/* Account Creation / Edits */}
          <Route
            path="/register"
            element={(
              <>
                <ScrollToTop />
                <Register />
              </>
            )}
          />
          <Route path="/reset" element={<Reset />} />

          {/* Client Views */}
          {/* <Route path="/onboard" element={<JobseekerData />} /> */}

          {/* Nav/Admin Views */}

          {store != undefined && ( <>
            <Route path="/onboard" element={<div>Onboard Goes Here</div>} />
            <Route path="/clientRoadmap/:emailParam" element={<NavigatorMenu />}/>
            <Route path="/roadmap/" element={<MilestoneMap emailParam={store.email}/>} />
          </>)}

          
          <Route path="/clientRoadmap2/:emailParam" element={<NavigatorMenu />}/>          
          <Route path="/onboardv2" element={<NavView />} />
          

          <Route path="/landing" element={<Landing />} />
          <Route path="/adminview" element={<AdminView />} />
          <Route path="/archivepopuptesting" element={<ArchiveTemp />} />
          
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/navdashboard" element={<NavDashboard />} />

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