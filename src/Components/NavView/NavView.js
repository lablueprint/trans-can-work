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
      const tempUserData = await fetchUser('js_angela@gmail.com');
      const tempJobseekerData = await fetchJobseekerData('js_angela@gmail.com');
      setUserData(tempUserData.data());
      setJobseekerData(tempJobseekerData.data());
      setEmail(tempUserData.id);
    };
    asyncFn();
  }, []);

  useEffect(() => {
    if (jobseekerData !== undefined) {
      updateJobseekerData('js_angela@gmail.com', jobseekerData);
    }
  }, [jobseekerData]);

  useEffect(() => {
    if (userData !== undefined) {
      updateUser('js_angela@gmail.com', userData);
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
