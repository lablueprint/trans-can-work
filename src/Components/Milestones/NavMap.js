/*eslint-disable*/
import React from 'react';
import MilestoneButton from './MilestoneButton';
import './NavMap.css';

const jobseekerData = {
  content: {
    body: [
      {
        uid: 'island1',
        imageDefault: require('../../Assets/Assessment.png'),
        imageUpdated: require('../../Assets/Assessment.png'),
        imageUHover: require('../../Assets/assessmentH.png'),
        title: require('../../Assets/assessmentTitle.png'),
        id: 'assessmentN',
        status: true,
      },
      {
        uid: 'island2',
        imageDefault: require('../../Assets/online-profile(b&w).png'),
        imageUpdated: require('../../Assets/online-profile.png'),
        imageHover: require('../../Assets/online-profileH.png'),
        imageUHover: require('../../Assets/online-profileUH.png'),
        title: require('../../Assets/online-profileTitle.png'),
        id: 'online-profileN',
        status: false,
      },
      {
        uid: 'island3',
        imageDefault: require('../../Assets/training-program(b&w).png'),
        imageUpdated: require('../../Assets/training-program.png'),
        imageHover: require('../../Assets/training-programH.png'),
        imageUHover: require('../../Assets/training-programUH.png'),
        title: require('../../Assets/training-programTitle.png'),
        id: 'training-programN',
        status: false,
      },
      {
        uid: 'island4',
        imageDefault: require('../../Assets/workshop(b&w).png'),
        imageUpdated: require('../../Assets/workshop.png'),
        imageHover: require('../../Assets/workshopH.png'),
        imageUHover: require('../../Assets/workshopUH.png'),
        title: require('../../Assets/workshopTitle.png'),
        id: 'workshopN',
        status: false,
      },
      {
        uid: 'island5',
        imageDefault: require('../../Assets/internship(b&w).png'),
        imageUpdated: require('../../Assets/internships.png'),
        imageHover: require('../../Assets/internshipH.png'),
        imageUHover: require('../../Assets/internshipUH.png'),
        title: require('../../Assets/internshipTitle.png'),
        id: 'internshipN',
        status: false,
      },
      {
        uid: 'island6',
        imageDefault: require('../../Assets/job-fair(b&w).png'),
        imageUpdated: require('../../Assets/job-fair.png'),
        imageHover: require('../../Assets/job-fairH.png'),
        imageUHover: require('../../Assets/job-fairUH.png'),
        title: require('../../Assets/job-fairTitle.png'),
        id: 'job-fairN',
        status: false,
      },
      {
        uid: 'island7',
        imageDefault: require('../../Assets/job-board(b&w).png'),
        imageUpdated: require('../../Assets/job-board.png'),
        imageHover: require('../../Assets/job-boardH.png'),
        imageUHover: require('../../Assets/job-boardUH.png'),
        title: require('../../Assets/job-boardTitle.png'),
        id: 'job-boardN',
        status: false,
      },
      {
        uid: 'island8',
        imageDefault: require('../../Assets/resource(b&w).png'),
        imageUpdated: require('../../Assets/resource.png'),
        imageHover: require('../../Assets/resourceH.png'),
        imageUHover: require('../../Assets/resourceUH.png'),
        title: require('../../Assets/resourceTitle.png'),
        id: 'resourceN',
        status: false,
      },
      {
        uid: 'island9',
        imageDefault: require('../../Assets/hiring-info(b&w).png'),
        imageUpdated: require('../../Assets/hiring-info.png'),
        imageHover: require('../../Assets/hiring-infoH.png'),
        imageUHover: require('../../Assets/hiring-infoUH.png'),
        title: require('../../Assets/hiring-infoTitle.png'),
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
