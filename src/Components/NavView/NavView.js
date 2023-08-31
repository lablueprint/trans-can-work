import './NavView.css';
import React, { useState, useEffect } from 'react';
import Assessment from '../Assessment/Assessment';
import Header from '../Header/Header';
import { fetchUser } from '../../Services/user-service';
import { fetchJobseekerData } from '../../Services/jobseeker-data-service';

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

  if (jobseekerData === undefined) {
    // eventually replace with appropriate loading component
    return (<div>loading</div>);
  }

  return (
    <div>
      {jobseekerData && (
      <div>
        <Header />
        <div className="assessment-top-padding" />
        <Assessment
          userData={userData}
          jobseeker={jobseekerData}
          setJobseeker={setJobseekerData}
          email={email}
        />
      </div>
      )}
    </div>

  );
}

export default NavView;
