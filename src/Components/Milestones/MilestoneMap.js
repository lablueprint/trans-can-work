/*eslint-disable*/
import React from 'react';
import './MilestoneMap.css';
import MilestoneButton from './MilestoneButton';
import title from '../../Assets/Images/title.png';

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
      },
      {
        uid: 7,
        imageDefault: require('../../Assets/Images/job-board(b&w).png'),
        imageUpdated: require('../../Assets/Images/job-board.png'),
        imageHover: require('../../Assets/Images/job-boardH.png'),
        imageUHover: require('../../Assets/Images/job-boardUH.png'),
        title: require('../../Assets/Images/job-board-title.png'),
        id: 'job-board',
        status: false,
      },
      {
        uid: 8,
        imageDefault: require('../../Assets/Images/resource(b&w).png'),
        imageUpdated: require('../../Assets/Images/resource.png'),
        imageHover: require('../../Assets/Images/resourceH.png'),
        imageUHover: require('../../Assets/Images/resourceUH.png'),
        title: require('../../Assets/Images/resource-title.png'),
        id: 'resource',
        status: false,
      },
      {
        uid: 9,
        imageDefault: require('../../Assets/Images/hiring-info(b&w).png'),
        imageUpdated: require('../../Assets/Images/hiring-info.png'),
        imageHover: require('../../Assets/Images/hiring-infoH.png'),
        imageUHover: require('../../Assets/Images/hiring-infoUH.png'),
        title: require('../../Assets/Images/hiring-info-title.png'),
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
      status={x.status}
    >
      <MilestoneButton image={imagePath} imageHover={hoveredPath} title={x.title} />
    </div>
  );
});

function MilestoneMap() {
  return (
    <div id="parent">
      <div className="grid-container">
        {MilestoneButtons}
      </div>
      <div id="roadmap-title"><img src={title} alt="roadmap title" /></div>
    </div>
  );
}

export default MilestoneMap;

/* later: the margins are hard-coded #s so not good for all screen sizes */
/* later: the bool variable status is hard-coded for now */
