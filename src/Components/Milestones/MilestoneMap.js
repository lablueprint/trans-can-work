/*eslint-disable*/
import React from 'react';
import './MilestoneMap.css';
import MilestoneButton from './MilestoneButton';

const data = {
  content: {
    body: [
      {
        uid: 1,
        image: require('../../Assets/assessment.png'),
        id: 'assessment',
        title: '',
      },
      {
        uid: 2,
        image: require('../../Assets/online-profile(b&w).png'),
        id: 'online-profile',
        title: '',
      },
      {
        uid: 3,
        image: require('../../Assets/training(b&w).png'),
        id: 'training-program',
        title: '',
      },
      {
        uid: 4,
        image: require('../../Assets/co-enroll(b&w).png'),
        id: 'co-enroll',
        title: '', 
      },
      {
        uid: 5,
        image: require('../../Assets/workshop(b&w).png'),
        id: 'workshop',
        title: '',
      },
      {
        uid: 6,
        image: require('../../Assets/internship(b&w).png'),
        id: 'internship',
        title: '',
      },
      {
        uid: 7,
        image: require('../../Assets/job-fair(b&w).png'),
        id: 'job-fair',
      },
      {
        uid: 8,
        image: require('../../Assets/job-board(b&w).png'),
        id: 'job-board',
      },
      {
        uid: 9,
        image: require('../../Assets/resource(b&w).png'),
        id: 'resource',
      },
      {
        uid: 10,
        image: require('../../Assets/hiring(b&w).png'),
        id: 'hiring-info',
      },
    ],
  },
};

const MilestoneButtons = data.content.body.map((x) => <div key={x.uid} id={x.id}><MilestoneButton title={x.title} image={(x.image)} /></div>);

function MilestoneMap() {
  return (
    <div>
      <div className="grid-container">
        {MilestoneButtons}
      </div>
      <div id="roadmap-title"><img src={require('../../Assets/title.png')} alt="roadmap title" /></div>
    </div>
  );
}

export default MilestoneMap;

/* later: the margins are hard-coded #s so not good for all screen sizes
         the map is slightly larger than the screen size so islands are cut off at the bottom */
