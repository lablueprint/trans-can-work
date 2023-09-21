import './NavView.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../../Services/user-service';
import { fetchJobseekerData, updateJobseekerData } from '../../Services/jobseeker-data-service';
import InitialHeader from '../InitialHeader/InitialHeader';
import InitialAssessment from '../InitialAssessment/InitialAssessment';
import Loading from '../Loading/Loading';

function NavView() {
  const store = useSelector((state) => state.auth.value);
  const [userData, setUserData] = useState();
  const [jobseekerData, setJobseekerData] = useState();
  const [email, setEmail] = useState();

  useEffect(() => {
    const asyncFn = async () => {
      const tempUserData = await fetchUser(store.email);
      const tempJobseekerData = await fetchJobseekerData(store.email);
      setUserData(tempUserData.data());
      setJobseekerData(tempJobseekerData.data());
      setEmail(tempUserData.id);
    };
    asyncFn();
  }, []);

  useEffect(() => {
    if (jobseekerData !== undefined) {
      updateJobseekerData(store.email, jobseekerData);
    }
  }, [jobseekerData]);

  useEffect(() => {
    if (userData !== undefined) {
      updateUser(store.email, userData);
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
