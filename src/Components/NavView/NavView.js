import './NavView.css';
import React, { useState, useEffect } from 'react';
import { fetchUser, updateUser } from '../../Services/user-service';
import { fetchJobseekerData, updateJobseekerData } from '../../Services/jobseeker-data-service';
import InitialHeader from '../InitialHeader/InitialHeader';
import InitialAssessment from '../InitialAssessment/InitialAssessment';
import Loading from '../Loading/Loading';

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

  if (jobseekerData === undefined) {
    return (<Loading />);
  }

  return (
    <div>
      <div>
        <InitialHeader />
        <InitialAssessment
          userData={userData}
          setUserData={setUserData}
          setJobseekerProp={setJobseekerData}
          email={email}
        />
      </div>
    </div>

  );
}

export default NavView;
