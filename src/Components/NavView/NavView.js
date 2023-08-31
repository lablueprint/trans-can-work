import './NavView.css';
import React, { useState, useEffect } from 'react';
import Assessment from '../Assessment/Assessment';
import Header from '../Header/Header';
import { fetchUser } from '../../Services/user-service';
import { fetchJobseekerData } from '../../Services/jobseeker-data-service';

function NavView() {
  const [userData, setUserData] = useState({});
  const [jobseekerData, setJobseekerData] = useState({});

  useEffect(() => {
    const asyncFn = async () => {
      const tempUserData = await fetchUser('alannguyen711@gmail.com');
      const tempJobseekerData = await fetchJobseekerData('alannguyen711@gmail.com');
      setUserData(tempUserData.data());
      setJobseekerData(tempJobseekerData.data());
      console.log(tempUserData.data());
      console.log(tempJobseekerData.data());
      console.log(tempJobseekerData.data().clientInfo['City/State']);
    };
    asyncFn();
  }, []);

  return (
    <div>
      <Header />
      <div className="assessment-top-padding" />
      <Assessment
        userData={userData}
        jobseeker={jobseekerData}
        setJobseeker={setJobseekerData}
      />
    </div>

  );
}

export default NavView;
