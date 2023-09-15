import './NavView.css';
import React, { useState, useEffect } from 'react';
// import Assessment from '../Assessment/Assessment';
// import Header from '../Header/Header';
import { fetchUser, updateUser } from '../../Services/user-service';
import { fetchJobseekerData, updateJobseekerData } from '../../Services/jobseeker-data-service';
import Internships from '../Internships/Internships';

function NavView() {
  const [userData, setUserData] = useState();
  const [jobseekerData, setJobseekerData] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    const asyncFn = async () => {
      const tempUserData = await fetchUser('alannguyen711@gmail.com');
      const tempJobseekerData = await fetchJobseekerData('alannguyen711@gmail.com');
      setUserData(tempUserData.data());
      setJobseekerData(tempJobseekerData.data());
      setEmail(tempUserData.id);
    };
    asyncFn();
  }, []);

  useEffect(() => {
    if (jobseekerData !== undefined) {
      updateJobseekerData('alannguyen711@gmail.com', jobseekerData);
    }
  }, [jobseekerData]);

  useEffect(() => {
    if (userData !== undefined) {
      updateUser('alannguyen711@gmail.com', userData);
    }
  }, [userData]);

  useEffect(() => {
    console.log(jobseekerData);
  }, [jobseekerData]);

  if (jobseekerData === undefined) {
    // eventually replace with appropriate loading component
    return (<div>loading</div>);
  }

  return (
    <div>
      {jobseekerData && (
      <div>
        {/* <Header />
        <div className="assessment-top-padding" /> */}
        {/* <Assessment
          userData={userData}
          setUserData={setUserData}
          jobseeker={jobseekerData}
          setJobseeker={setJobseekerData}
          email={email}
        /> */}
        <Internships
          jobseeker={jobseekerData}
          setJobseeker={setJobseekerData}
        />
      </div>
      )}
    </div>

  );
}

export default NavView;
