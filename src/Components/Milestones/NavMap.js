/*eslint-disable*/
import React from 'react';
import MilestoneButton from './MilestoneButton';
import './NavMap.css';

const jobseekerData = {
  content: {
    body: [
      {
        uid: 'island1',
        imageDefault: require('../../Assets/Images/Assessment.png'),
        imageUpdated: require('../../Assets/Images/Assessment.png'),
        imageUHover: require('../../Assets/Images/assessmentH.png'),
        title: require('../../Assets/Images/assessment-title.png'),
        id: 'assessmentN',
        status: true,
      },
      {
        uid: 'island2',
        imageDefault: require('../../Assets/Images/online-profile(b&w).png'),
        imageUpdated: require('../../Assets/Images/online-profile.png'),
        imageHover: require('../../Assets/Images/online-profileH.png'),
        imageUHover: require('../../Assets/Images/online-profileUH.png'),
        title: require('../../Assets/Images/online-profile-title.png'),
        id: 'online-profileN',
        status: false,
      },
      {
        uid: 'island3',
        imageDefault: require('../../Assets/Images/training-program(b&w).png'),
        imageUpdated: require('../../Assets/Images/training-program.png'),
        imageHover: require('../../Assets/Images/training-programH.png'),
        imageUHover: require('../../Assets/Images/training-programUH.png'),
        title: require('../../Assets/Images/training-program-title.png'),
        id: 'training-programN',
        status: false,
      },
      {
        uid: 'island4',
        imageDefault: require('../../Assets/Images/workshop(b&w).png'),
        imageUpdated: require('../../Assets/Images/workshop.png'),
        imageHover: require('../../Assets/Images/workshopH.png'),
        imageUHover: require('../../Assets/Images/workshopUH.png'),
        title: require('../../Assets/Images/workshop-title.png'),
        id: 'workshopN',
        status: false,
      },
      {
        uid: 'island5',
        imageDefault: require('../../Assets/Images/internship(b&w).png'),
        imageUpdated: require('../../Assets/Images/internships.png'),
        imageHover: require('../../Assets/Images/internshipH.png'),
        imageUHover: require('../../Assets/Images/internshipUH.png'),
        title: require('../../Assets/Images/internship-title.png'),
        id: 'internshipN',
        status: false,
      },
      {
        uid: 'island6',
        imageDefault: require('../../Assets/Images/job-fair(b&w).png'),
        imageUpdated: require('../../Assets/Images/job-fair.png'),
        imageHover: require('../../Assets/Images/job-fairH.png'),
        imageUHover: require('../../Assets/Images/job-fairUH.png'),
        title: require('../../Assets/Images/job-fair-title.png'),
        id: 'job-fairN',
        status: false,
      },
      {
        uid: 'island7',
        imageDefault: require('../../Assets/Images/job-board(b&w).png'),
        imageUpdated: require('../../Assets/Images/job-board.png'),
        imageHover: require('../../Assets/Images/job-boardH.png'),
        imageUHover: require('../../Assets/Images/job-boardUH.png'),
        title: require('../../Assets/Images/job-board-title.png'),
        id: 'job-boardN',
        status: false,
      },
      {
        uid: 'island8',
        imageDefault: require('../../Assets/Images/resource(b&w).png'),
        imageUpdated: require('../../Assets/Images/resource.png'),
        imageHover: require('../../Assets/Images/resourceH.png'),
        imageUHover: require('../../Assets/Images/resourceUH.png'),
        title: require('../../Assets/Images/resource-title.png'),
        id: 'resourceN',
        status: false,
      },
      {
        uid: 'island9',
        imageDefault: require('../../Assets/Images/hiring-info(b&w).png'),
        imageUpdated: require('../../Assets/Images/hiring-info.png'),
        imageHover: require('../../Assets/Images/hiring-infoH.png'),
        imageUHover: require('../../Assets/Images/hiring-infoUH.png'),
        title: require('../../Assets/Images/hiring-info-title.png'),
        id: 'hiring-infoN',
        status: false,
      },
    ],
  },
};

const NavMapButtons = jobseekerData.content.body.map((x) => {
  let imagePath = x.imageDefault;
  let hoveredPath = x.imageHover;
  if (x.status === true) {
    imagePath = x.imageUpdated;
    hoveredPath = x.imageUHover;
  }
  return (
    <div
      key={x.uid}
      id={x.id}
      status={x.status}
    >
      <MilestoneButton image={imagePath} imageHover={hoveredPath} title={x.title} />
    </div>
  );
});

function NavMap() {
  return (
    <div className="grid">
      {NavMapButtons}
    </div>
  );
}

export default NavMap;
