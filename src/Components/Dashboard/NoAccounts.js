import React from 'react';
import NoResultsGraphic from '../../Assets/dashboard-trans-flag-graphic.png';

function NoAccounts() {
  return (
    <div className="no-accounts-container">
      <p className="no-aacounts-text-container">
        You currently have no assigned clients.
        Please contact a TransCanWork administrator if you believe this is a mistake.

      </p>
      <img className="no-accounts-image" src={NoResultsGraphic} alt="no accounts were found" />
    </div>
  );
}

export default NoAccounts;
