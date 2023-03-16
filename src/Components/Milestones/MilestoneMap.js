import React from 'react';
import './MilestoneMap.css'
import MilestoneButton from './MilestoneButton';

const data = {
    content: {
        body: [
            {
                uid: 1, 
                image: require("../../Assets/JobFair.png"), 
                id: "job-fair", 
                title: ""
            }, 
            {
                uid: 2, 
                image: require("../../Assets/training.png"), 
                id: "training-program", 
                title: ""
            },
            {
                uid: 3, 
                image: require("../../Assets/co-enroll.png"),
                id: "co-enroll", 
                title: ""
            },
            {
                uid: 4, 
                image: require("../../Assets/Assessment.png"), 
                id: "assessment",
                // title: ""
            },
            {
                uid: 5, 
                image: require("../../Assets/hiring.png"), 
                id: "hiring-info", 
                title: ""
            },
            {
                uid: 6, 
                image: require("../../Assets/job-board.png"), 
                id: "job-board", 
                title: ""
            },
            {
                uid: 7, 
                image: require("../../Assets/internships.png"),
                id: "internship", 
            }, 
            {
                uid: 8, 
                image: require("../../Assets/workshop.png"),
                id: "workshop", 
            },
            {
                uid: 9, 
                image: require("../../Assets/online-profile.png"),
                id: "online-profile", 
            },
            {
                uid: 10, 
                image: require("../../Assets/resource.png"),
                id: "resource", 
            }
        ]
    }
  }

const MilestoneButtons = data.content.body.map((x) => <div className="grid-item" key={x.uid} id={x.id}><MilestoneButton title={x.title} image={(x.image)}/></div>);

function MilestoneMap() {
    return (
        <div className="container">
            <div className="grid-container">
                {MilestoneButtons} 
            </div>
            <div id="roadmap-title"><img src={require("../../Assets/title.png")} alt="roadmap title"/></div>
        </div>
    );
}

export default MilestoneMap 

/*later: the margins are hard-coded #s so not good for all screen sizes
         the map is slightly larger than the screen size so islands are cut off at the bottom */