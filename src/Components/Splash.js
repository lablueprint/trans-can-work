import React from 'react';
import './Splash.css';

const transFlag = require('../Assets/transFlag.png');
const awaitingApproval = require('../Assets/awaitingApproval.png');
const awaitingText = require('../Assets/awaitingText.png');

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
