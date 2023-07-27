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

// createUser(
//   mockData2.uid,
//   mockData2.email,
//   mockData2.role,
//   mockData2.firstName,
//   mockData2.lastName,
//   mockData2.pronouns,
//   mockData2.bio,
//   mockData2.phoneNumber,
// );

// register(mockData2) {
//   .then(() => {
//     console.log('User created successfully');
//   })
//   .catch((error) => {
//     console.error('Error creating user:', error);
//   })
// }
// ES2015 guarantees Object.keys returns insertion order and all browsers comply
// const mockData = {
//   'Authentic Name': 'demi lovato',
//   Pronouns: 'they/them',
//   Phone: '(408) 263-0181',
//   Email: 'demilovato@urmom.com',
//   Location: 'los angeles, ca',
//   Ethnicity: 'new mexican',
//   Age: '29',
//   'Gender Identity': 'nonbinary',
//   Sexuality: 'idk',
//   Veteran: 'no',
//   Disability: 'prolly',
//   Housing: 'rehab',
//   'Currently Employed': 'yes',
//   'Prior Convictions': 'none',
// };

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
    infoLabels.push((<span style={style.infoLabel}>{key}</span>));
    infoTexts.push((<span style={style.infoText}>{mockData[key]}</span>));
  });

  const infos = infoLabels.map((labelSpan, i) => (
    <div style={style.infoCell}>
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
