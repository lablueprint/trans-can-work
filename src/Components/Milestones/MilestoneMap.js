/*eslint-disable*/
import React from 'react';
import './MilestoneMap.css';
import MilestoneButton from './MilestoneButton';
import IslandPopup from './IslandPopup';
import title from '../../Assets/title.png';

const data = {
  content: {
    body: [
      {
        uid: 1,
        imageDefault: require('../../Assets/Assessment.png'),
        imageUpdated: require('../../Assets/Assessment.png'),
        imageUHover: require('../../Assets/assessmentH.png'),
        title: require('../../Assets/assessmentTitle.png'),
        id: 'assessment',
        status: true,
      },
      {
        uid: 2,
        imageDefault: require('../../Assets/online-profile(b&w).png'),
        imageUpdated: require('../../Assets/online-profile.png'),
        imageHover: require('../../Assets/online-profileH.png'),
        imageUHover: require('../../Assets/online-profileUH.png'),
        title: require('../../Assets/online-profileTitle.png'),
        id: 'online-profile',
        status: false,
      },
      {
        uid: 3,
        imageDefault: require('../../Assets/training-program(b&w).png'),
        imageUpdated: require('../../Assets/training-program.png'),
        imageHover: require('../../Assets/training-programH.png'),
        imageUHover: require('../../Assets/training-programUH.png'),
        title: require('../../Assets/training-programTitle.png'),
        id: 'training-program',
        status: false,
      },
      {
        uid: 4,
        imageDefault: require('../../Assets/workshop(b&w).png'),
        imageUpdated: require('../../Assets/workshop.png'),
        imageHover: require('../../Assets/workshopH.png'),
        imageUHover: require('../../Assets/workshopUH.png'),
        title: require('../../Assets/workshopTitle.png'),
        id: 'workshop',
        status: false,
      },
      {
        uid: 5,
        imageDefault: require('../../Assets/internship(b&w).png'),
        imageUpdated: require('../../Assets/internships.png'),
        imageHover: require('../../Assets/internshipH.png'),
        imageUHover: require('../../Assets/internshipUH.png'),
        title: require('../../Assets/internshipTitle.png'),
        id: 'internship',
        status: false,
      },
      {
        uid: 6,
        imageDefault: require('../../Assets/job-fair(b&w).png'),
        imageUpdated: require('../../Assets/job-fair.png'),
        imageHover: require('../../Assets/job-fairH.png'),
        imageUHover: require('../../Assets/job-fairUH.png'),
        title: require('../../Assets/job-fairTitle.png'),
        id: 'job-fair',
        status: false,
      },
      {
        uid: 7,
        imageDefault: require('../../Assets/job-portal(b&w).png'),
        imageUpdated: require('../../Assets/job-portal.png'),
        imageHover: require('../../Assets/job-portalH.png'),
        imageUHover: require('../../Assets/job-portalUH.png'),
        title: require('../../Assets/job-portalTitle.png'),
        id: 'job-portal',
        status: false,
      },
      {
        uid: 8,
        imageDefault: require('../../Assets/resource(b&w).png'),
        imageUpdated: require('../../Assets/resource.png'),
        imageHover: require('../../Assets/resourceH.png'),
        imageUHover: require('../../Assets/resourceUH.png'),
        title: require('../../Assets/resourceTitle.png'),
        id: 'resource',
        status: false,
      },
      {
        uid: 9,
        imageDefault: require('../../Assets/hiring-info(b&w).png'),
        imageUpdated: require('../../Assets/hiring-info.png'),
        imageHover: require('../../Assets/hiring-infoH.png'),
        imageUHover: require('../../Assets/hiring-infoUH.png'),
        title: require('../../Assets/hiring-infoTitle.png'),
        id: 'hiring-info',
        status: false,
      },
    ],
  },
};

const MilestoneButtons = data.content.body.map((x) => {
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
      <MilestoneButton image={imagePath} imageHover={hoveredPath} title={x.title} id={x.id} status={x.status}/>
    </div>
  );
});

function MilestoneMap() {
  return (
    <div>
      <div className="grid-container">
        <div id="roadmap-title"><img src={title} alt="roadmap title" /></div>
        {MilestoneButtons}
      </div>
    </div>
  );
}

export default MilestoneMap;