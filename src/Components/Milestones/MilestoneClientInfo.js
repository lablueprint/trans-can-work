import React from 'react';
import './MilestoneClientInfo.css';

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
    <div className="container">
      <div className="infoWrapper">
        {infos}
      </div>
    </div>
  );
}

export default MilestoneClientInfo;
