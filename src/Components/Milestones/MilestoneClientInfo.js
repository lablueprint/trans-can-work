import React from 'react';
// import createUser from '../../Services/user-service';
/* get a firebase call to get their user data and jobseekerData
use redux to get the current user (get the user from the redux call)

1) focus on making mock data models that reflect the
backend & what changes you want to make in the backend
and get that to display on the frontend

2) then pull from the backend
 */

const mockData = {
  uid: '123456',
  email: 'hellokitty@gmail.com',
  role: 'jobseeker',
  firstName: 'hello',
  lastName: 'kitty',
  pronouns: 'she/her',
  bio: 'I am a kitty looking for a job',
  phoneNumber: '987-654-3211',
};

const style = {
  container: {
    width: '40vw',
    alignSelf: 'center',
  },
  title: {
    fontFamily: 'Pirates',
  },
  infoWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridAutoRows: 'minmax(auto, auto)',
    gridGap: '10px',
    textAlign: 'center',

    // flexWrap: 'wrap',
    // justifyContent: 'center',
    // alignItems: 'center',
    // placeItems: 'center',
    // margin: '0 auto',
    // justifyContent: 'center',
    // justifyItems: 'center',
    // alignContent: 'center',
    // alignItems: 'center',
    // alignSelf: 'center',
    // justifyContent: 'center', // Center horizontally
    // alignItems: 'center', // Center vertically
  },
  infoCell: {
    fontSize: '.75em',
    color: '#484649',
    lineHeight: '24px',
    fontFamily: 'Montserrat',
    // justifyContent: 'center', // Center horizontally
    // alignItems: 'center', // Center vertically
    textAlign: 'center',

  },
  infoLabel: {
    float: 'left',
    width: 'fit-content',
    fontWeight: '700',
    letter: '0.5px',

  },
  infoText: {
    float: 'right',
    width: 'fit-content',
  },
};

function MilestoneClientInfo() {
  const infoLabels = [];
  const infoTexts = [];
  Object.keys(mockData).forEach((key) => {
    infoLabels.push((<span className="infoLabel">{key}</span>));
    infoTexts.push((<span className="infoText">{mockData[key]}</span>));
  });

  const infos = infoLabels.map((labelSpan, i) => (
    <div className="infoCell">
      {labelSpan}
      {infoTexts[i]}
    </div>
  ));

  return (
    <div style={style.container}>
      <div style={style.infoWrapper}>
        {infos}
      </div>
    </div>
  );
}

export default MilestoneClientInfo;
