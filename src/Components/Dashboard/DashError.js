import React from 'react';
import propTypes from 'prop-types';
import NoResultsGraphic from '../../Assets/dashboard-trans-flag-graphic.png';
import './DashError.css';

function DashError({ text }) {
  return (
    <div className="dash-error-container">
      <p className="dash-error-text-container">
        {text}
      </p>
      <img className="dash-error-image" src={NoResultsGraphic} alt="no accounts were found" />
    </div>
  );
}

export default DashError;

DashError.propTypes = {
  text: propTypes.string.isRequired,
};
