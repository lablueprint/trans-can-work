import './NavView.css';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { fetchUser, updateUser } from '../../Services/user-service';
import { updateJobseekerData } from '../../Services/jobseeker-data-service';
import InitialHeader from '../InitialHeader/InitialHeader';
import InitialAssessment from '../InitialAssessment/InitialAssessment';
import Loading from '../Loading/Loading';
import { jobseekerDataObject } from '../../Services/objects-service';

function NavView() {
  const store = useSelector((state) => state.auth.value);
  const [userData, setUserData] = useState();
  const [jobseekerData, setJobseekerData] = useState(jobseekerDataObject);
  const [email, setEmail] = useState();

  useEffect(() => {
    const asyncFn = async () => {
      const tempUserData = await fetchUser(store.email);
      setUserData(tempUserData.data());
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

  if (userData === undefined || jobseekerData === undefined) {
    return (<Loading />);
  }

  return (
    <div>
      <div>
        <InitialHeader />
        <InitialAssessment
          userData={userData}
          setUserData={setUserData}
          jobseeker={jobseekerData}
          setJobseeker={setJobseekerData}
          email={email}
        />
      </div>
    </div>

  );
}

export default NavView;
