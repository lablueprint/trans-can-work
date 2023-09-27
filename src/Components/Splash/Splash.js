import React from 'react';
import './Splash.css';

const transFlag = require('../../Assets/Images/trans-flag-graphic.png');
const awaitingApproval = require('../../Assets/Images/awaiting-approval.png');
const awaitingText = require('../../Assets/Images/awaiting-text.png');

function Splash() {
  return (
    <div className="container">
      <img src={awaitingApproval} className="awaitingApproval" alt="awaitingApproval" />
      <img src={awaitingText} className="awaitingText" alt="awaitingText" />
      <a href="/onboard" className="splashbuttonlink">
        <button type="button" className="splash-button">
          Back to Assessment
        </button>
      </a>
      <img src={transFlag} className="transFlag" alt="transFlag" />
    </div>
  );
}

export default Splash;
