/* eslint-disable */
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
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
import approvalIcon from './Assets/Images/trans-flag-graphic.svg';
import AdminView from './Components/Dashboard/AdminView';
import ScrollToTop from './Pages/scrollToTop';
import NavigatorMenu from './Components/Navigation/NavigatorMenu';
import MilestoneMap from './Components/Milestones/MilestoneMap';
import { login, logout } from './Redux/slice/authSlices';
import { fetchUser, addUser } from './Services/user-service';
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
            user: doc !== undefined ? doc.data() : undefined,
          };
          dispatch(login(userState));
        }).catch((error) => {
        });
      // if logged out
      } else if (user != undefined) {
        // clear redux state
        dispatch(logout());
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
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
          <Route path="assessment" element={<NavigatorDashboard />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/navigator" element={<NavigatorDashboard />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/onboard" element={<JobseekerData useremail="solia@goodpl.us" username="Solia Nasser" />} />
        <Route path="/adminview" element={<AdminView />} />
        <Route path="/roadmap" element={<MilestoneMap />} />

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
