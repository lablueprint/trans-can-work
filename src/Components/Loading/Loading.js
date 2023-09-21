import React from 'react';
import './Loading.css';

const transFlag = require('../../Assets/Images/trans-flag-graphic.png');
const loadingTitle = require('../../Assets/Images/loading.png');

function Loading() {
  return (
    <div className="container">
      <img src={loadingTitle} className="loadingTitle" alt="awaitingApproval" />
      <img src={transFlag} className="transFlag" alt="transFlag" />
    </div>
  );
}

export default Loading;
