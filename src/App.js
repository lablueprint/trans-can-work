/*eslint-disable*/
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import {
  Login,
  NavigatorDashboard,
  Register,
  Reset,
  Landing,
  JobseekerData,
  Home,
} from './Pages';
import './App.css';
import Footer from './Components/Footer/Footer';

import Splash from './Components/Splash/Splash';
import OnlineProfiles from './Components/OnlineProfiles/OnlineProfiles';
import TrainingPrograms from './Components/TrainingPrograms/TrainingPrograms';
import "./App.css";
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
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./Redux/Slice/authSlices";
import { fetchUser, addUser } from './Services/user-service';
import { auth } from "./firebase";


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
          element={
            <Splash
              header="Awaiting Approval"
              description="You have successfully signed up for an account. Please await approval from a TransCanWork Administator."
              graphic={<img alt="" src={approvalIcon} />}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}
export default App;
