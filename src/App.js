/*eslint-disable*/
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
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
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Splash from "./Components/Splash";
import approvalIcon from "./Assets/mobile_friendly_24px.png";
import AdminView from "./Components/AdminView";
import ScrollToTop from './Pages/scrollToTop';
import NavigatorMenu from './Components/Navigation/NavigatorMenu';
import MilestoneMap from './Components/Milestones/MilestoneMap';
import { onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./Redux/Slice/authSlices";
import {fetchUser} from './Services/user-service';
import { auth } from "./firebase";


function App() {
  const user = useSelector((state) => state.auth.value);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        fetchUser(user.email).then((doc) => {
          const userState ={
            email: user.email,
            accessToken: user.accessToken,
            refreshToken: user.refreshToken,
            user: doc.data(),
          }
          dispatch(login(userState));
        });
      } else {
        dispatch(logout());
      }
    });
    unsubscribe();
  }, [auth]);

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
