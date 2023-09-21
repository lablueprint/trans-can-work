import React from 'react';

const transFlag = require('../../Assets/Images/trans-flag-graphic.png');
const pageNotFound = require('../../Assets/Images/page-not-found.png');
const notFoundText = require('../../Assets/Images/not-found-text.png');

function PageNotFound() {
  return (
    <div className="container">
      <img src={pageNotFound} className="awaitingApproval" alt="awaitingApproval" />
      <img src={notFoundText} className="awaitingText" alt="awaitingText" />
      <img src={transFlag} className="transFlag" alt="transFlag" />
    </div>
  );
}

export default PageNotFound;
