import React from 'react';

// ES2015 guarantees Object.keys returns insertion order and all browsers comply
const mockData = {
  'Authentic Name': 'demi lovato',
  Pronouns: 'they/them',
  Phone: '(408) 263-0181',
  Email: 'demilovato@urmom.com',
  Location: 'los angeles, ca',
  Ethnicity: 'new mexican',
  Age: '29',
  'Gender Identity': 'nonbinary',
  Sexuality: 'idk',
  Veteran: 'no',
  Disability: 'prolly',
  Housing: 'rehab',
  'Currently Employed': 'yes',
  'Prior Convictions': 'none',
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
  },
  infoCell: {
    fontSize: '.75em',
    color: '#484649',
    lineHeight: '24px',
    fontFamily: 'Montserrat',
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
      <h2 style={style.title}>CLIENT INFO</h2>
      <div style={style.infoWrapper}>
        {infos}
      </div>
    </div>
  );
}

export default MilestoneClientInfo;
