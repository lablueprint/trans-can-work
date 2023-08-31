/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './MilestoneMap.css';
import MilestoneButton from './MilestoneButton';
import title from '../../Assets/Images/title.png';
import { fetchJobseekerData } from '../../Services/jobseeker-data-service';

const data = {
  content: {
    body: [
      {
        uid: 1,
        imageDefault: require('../../Assets/Images/Assessment.png'),
        imageUpdated: require('../../Assets/Images/Assessment.png'),
        imageUHover: require('../../Assets/Images/assessmentH.png'),
        title: require('../../Assets/Images/assessment-title.png'),
        id: 'assessment',
        status: true,
        originalStatus: 'incomplete',
      },
      {
        uid: 2,
        imageDefault: require('../../Assets/Images/online-profile(b&w).png'),
        imageUpdated: require('../../Assets/Images/online-profile.png'),
        imageHover: require('../../Assets/Images/online-profileH.png'),
        imageUHover: require('../../Assets/Images/online-profileUH.png'),
        title: require('../../Assets/Images/online-profile-title.png'),
        id: 'online-profile',
        status: false,
        originalStatus: 'incomplete',
      },
      {
        uid: 3,
        imageDefault: require('../../Assets/Images/training-program(b&w).png'),
        imageUpdated: require('../../Assets/Images/training-program.png'),
        imageHover: require('../../Assets/Images/training-programH.png'),
        imageUHover: require('../../Assets/Images/training-programUH.png'),
        title: require('../../Assets/Images/training-program-title.png'),
        id: 'training-program',
        status: false,
        originalStatus: 'incomplete',
      },
      {
        uid: 4,
        imageDefault: require('../../Assets/Images/workshop(b&w).png'),
        imageUpdated: require('../../Assets/Images/Assessment.png'),
        imageHover: require('../../Assets/Images/workshopH.png'),
        imageUHover: require('../../Assets/Images/workshopUH.png'),
        title: require('../../Assets/Images/workshop-title.png'),
        id: 'workshop',
        status: false,
        originalStatus: 'incomplete',
      },
      {
        uid: 5,
        imageDefault: require('../../Assets/Images/internship(b&w).png'),
        imageUpdated: require('../../Assets/Images/internships.png'),
        imageHover: require('../../Assets/Images/internshipH.png'),
        imageUHover: require('../../Assets/Images/internshipUH.png'),
        title: require('../../Assets/Images/internship-title.png'),
        id: 'internship',
        status: false,
        originalStatus: 'incomplete',
      },
      {
        uid: 6,
        imageDefault: require('../../Assets/Images/job-fair(b&w).png'),
        imageUpdated: require('../../Assets/Images/job-fair.png'),
        imageHover: require('../../Assets/Images/job-fairH.png'),
        imageUHover: require('../../Assets/Images/job-fairUH.png'),
        title: require('../../Assets/Images/job-fair-title.png'),
        id: 'job-fair',
        status: false,
        originalStatus: 'incomplete',
      },
      {
        uid: 7,
        imageDefault: require('../../Assets/Images/job-portal(b&w).png'),
        imageUpdated: require('../../Assets/Images/job-portal.png'),
        imageHover: require('../../Assets/Images/job-portalH.png'),
        imageUHover: require('../../Assets/Images/job-portalUH.png'),
        title: require('../../Assets/Images/job-portal-title.png'),
        id: 'job-portal',
        status: false,
        originalStatus: 'incomplete',
      },
      {
        uid: 8,
        imageDefault: require('../../Assets/Images/resource(b&w).png'),
        imageUpdated: require('../../Assets/Images/resource.png'),
        imageHover: require('../../Assets/Images/resourceH.png'),
        imageUHover: require('../../Assets/Images/resourceUH.png'),
        title: require('../../Assets/Images/resource-title.png'),
        id: 'resources',
        status: false,
        originalStatus: 'incomplete',
      },
      {
        uid: 9,
        imageDefault: require('../../Assets/Images/hiring-info(b&w).png'),
        imageUpdated: require('../../Assets/Images/hiring-info.png'),
        imageHover: require('../../Assets/Images/hiring-infoH.png'),
        imageUHover: require('../../Assets/Images/hiring-infoUH.png'),
        title: require('../../Assets/Images/hiring-info-title.png'),
        id: 'hiring-info',
        status: true,
        originalStatus: 'incomplete',
      },
    ],
  },
};

function MilestoneMap() {
  const store = useSelector((state) => state.auth.value);
  const [buttonData, setButtonData] = useState(data);
  console.log(buttonData)
  useEffect(() => {
    fetchJobseekerData('js_angela@gmail.com').then((jobseekerData) => {
      // setButtonData((data) => {
      //   const updatedButton = data.content.body.map((object) => ({
      //     ...object,
      //     originalStatus: jobseekerData.data().milestones[object.id],
      //   }));
      //   return {
      //     content: {
      //       body: updatedButton,
      //     },
      //   };
      // });
      setButtonData(buttonData[content][body].forEach((object) => { // LEFT OFF HERE (line 120 is not printing)
        console.log(object);
        object.originalStatus = jobseekerData.data().milestones[object.id];
      }));
    });
  }, [store]);
  useEffect(() => {
    console.log(buttonData);
  }, [buttonData]);
  return (
    <div>
      <div className="grid-container">
        <div id="roadmap-title"><img src={title} alt="roadmap title" /></div>
        {buttonData.content.body.map((x) => {
        return (
          <div
            key={x.uid}
            id={x.id}
          >
            <MilestoneButton image={x.originalStatus === 'complete' ? x.imageUpdated : x.imageDefault} imageHover={x.originalStatus === 'complete' ? x.imageUHover : x.imageHover} title={x.title} id={x.id} originalStatus={x.originalStatus}/>
          </div>
        );
        })}
      </div>
    </div>
  );
}

export default MilestoneMap;