/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import title from '../../Assets/Images/title.png';
import { fetchJobseekerData, updateJobseekerData } from '../../Services/jobseeker-data-service';
import MilestoneButton from './MilestoneButton';
import './MilestoneMap.css';
import background from '../../Assets/Images/roadmap-background.png';
import detailsDesktop from '../../Assets/Images/roadmap-details-desktop.png';
import detailsMobile from '../../Assets/Images/roadmap-details-mobile.png';
import {useParams} from 'react-router-dom';

const data = {
  content: {
    body: [
      {
        uid: 1,
        imageDefault: require('../../Assets/Images/Assessment.png'),
        imageUpdated: require('../../Assets/Images/Assessment.png'),
        imageHover: require('../../Assets/Images/assessmentH.png'),
        imageUHover: require('../../Assets/Images/assessmentH.png'),
        title: require('../../Assets/Images/assessment-title.png'),
        id: 'assessment',
      },
      {
        uid: 2,
        imageDefault: require('../../Assets/Images/online-profile(b&w).png'),
        imageUpdated: require('../../Assets/Images/online-profile.png'),
        imageHover: require('../../Assets/Images/online-profileH.png'),
        imageUHover: require('../../Assets/Images/online-profileUH.png'),
        title: require('../../Assets/Images/online-profile-title.png'),
        id: 'online-profile',
      },
      {
        uid: 3,
        imageDefault: require('../../Assets/Images/training-program(b&w).png'),
        imageUpdated: require('../../Assets/Images/training-program.png'),
        imageHover: require('../../Assets/Images/training-programH.png'),
        imageUHover: require('../../Assets/Images/training-programUH.png'),
        title: require('../../Assets/Images/training-program-title.png'),
        id: 'training-program',
      },
      {
        uid: 4,
        imageDefault: require('../../Assets/Images/workshop(b&w).png'),
        imageUpdated: require('../../Assets/Images/Assessment.png'),
        imageHover: require('../../Assets/Images/workshopH.png'),
        imageUHover: require('../../Assets/Images/workshopUH.png'),
        title: require('../../Assets/Images/workshop-title.png'),
        id: 'workshop',
      },
      {
        uid: 5,
        imageDefault: require('../../Assets/Images/internship(b&w).png'),
        imageUpdated: require('../../Assets/Images/internships.png'),
        imageHover: require('../../Assets/Images/internshipH.png'),
        imageUHover: require('../../Assets/Images/internshipUH.png'),
        title: require('../../Assets/Images/internship-title.png'),
        id: 'internship',
      },
      {
        uid: 6,
        imageDefault: require('../../Assets/Images/job-fair(b&w).png'),
        imageUpdated: require('../../Assets/Images/job-fair.png'),
        imageHover: require('../../Assets/Images/job-fairH.png'),
        imageUHover: require('../../Assets/Images/job-fairUH.png'),
        title: require('../../Assets/Images/job-fair-title.png'),
        id: 'job-fair',
      },
      {
        uid: 7,
        imageDefault: require('../../Assets/Images/job-portal(b&w).png'),
        imageUpdated: require('../../Assets/Images/job-portal.png'),
        imageHover: require('../../Assets/Images/job-portalH.png'),
        imageUHover: require('../../Assets/Images/job-portalUH.png'),
        title: require('../../Assets/Images/job-portal-title.png'),
        id: 'job-board',
      },
      {
        uid: 8,
        imageDefault: require('../../Assets/Images/resource(b&w).png'),
        imageUpdated: require('../../Assets/Images/resource.png'),
        imageHover: require('../../Assets/Images/resourceH.png'),
        imageUHover: require('../../Assets/Images/resourceUH.png'),
        title: require('../../Assets/Images/resource-title.png'),
        id: 'resources',
      },
      {
        uid: 9,
        imageDefault: require('../../Assets/Images/hiring-info(b&w).png'),
        imageUpdated: require('../../Assets/Images/hiring-info.png'),
        imageHover: require('../../Assets/Images/hiring-infoH.png'),
        imageUHover: require('../../Assets/Images/hiring-infoUH.png'),
        title: require('../../Assets/Images/hiring-info-title.png'),
        id: 'hiring-info',
      },
    ],
  },
};

function MilestoneMap({emailParam}) {
  const [buttonData, setButtonData] = useState(data);
  const [jobseeker, setJobseeker] = useState();
  const [prevJobseeker, setPrevJobseeker] = useState();

  useEffect(() => {
    fetchJobseekerData(emailParam).then((jobseekerData) => {
      setJobseeker(jobseekerData.data());
      setPrevJobseeker(jobseekerData.data());
    });
  }, []);

  useEffect(() => {
    if (jobseeker !== undefined && prevJobseeker !== undefined && JSON.stringify(jobseeker) !== JSON.stringify(prevJobseeker)) {
      setPrevJobseeker(jobseeker)
      updateJobseekerData(emailParam, jobseeker);
    }
  }, [jobseeker]);

  if (jobseeker === undefined) {
    return (<div>loading</div>);
  }

  return (
    <div>
      <div 
        className="background-desktop" 
        style={{ 
          background: `url(${background})`
        }}
      >
        <div 
          className="roadmap-contents-desktop" 
          style={{ 
            background: `url(${detailsDesktop})`
          }}
        >
          <div>
            {buttonData.content.body.map((x) => {
            return (
              <div
                key={x.uid}
                id={x.id}
              >
                <MilestoneButton image={jobseeker.milestones[x.id.replace(/-/g, ' ')] === 'complete' ? x.imageUpdated : x.imageDefault} imageHover={jobseeker.milestones[x.id.replace(/-/g, ' ')] === 'complete' ? x.imageUHover : x.imageHover} title={x.title} id={x.id.replace(/-/g, ' ')} jobseeker={jobseeker} setJobseeker={setJobseeker}/>
              </div>
            );
            })}
          </div>
        </div>
      </div>
      <div 
        className="background-mobile" 
        style={{ 
          background: `url(${background})`
        }}
      >
        <div 
          className="roadmap-contents-mobile" 
          style={{ 
            background: `url(${detailsMobile})`
          }}
        >
          <div>
            {buttonData.content.body.map((x) => {
            return (
              <div
                key={x.uid}
                id={x.id}
              >
                <MilestoneButton image={jobseeker.milestones[x.id.replace(/-/g, ' ')] === 'complete' ? x.imageUpdated : x.imageDefault} imageHover={jobseeker.milestones[x.id.replace(/-/g, ' ')] === 'complete' ? x.imageUHover : x.imageHover} title={x.title} id={x.id.replace(/-/g, ' ')} jobseeker={jobseeker} setJobseeker={setJobseeker}/>
              </div>
            );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MilestoneMap;