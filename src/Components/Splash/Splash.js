import React from 'react';
import './Splash.css';

const transFlag = require('../../Assets/Images/trans-flag-graphic.svg');
const awaitingApproval = require('../../Assets/Images/awaiting-approval.png');
const awaitingText = require('../../Assets/Images/awaiting-text.png');

function Splash() {
  return (
    <div className="container">
      <img src={awaitingApproval} className="awaitingApproval" alt="awaitingApproval" />
      <img src={awaitingText} className="awaitingText" alt="awaitingText" />
      <img src={transFlag} className="transFlag" alt="transFlag" />
    </div>
  );
}

export default Splash;
