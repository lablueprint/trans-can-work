import React from 'react';
import { PropTypes } from 'prop-types';
import './Splash.css';

function Splash({ header, description, graphic }) {
  return (
    <div className="container">
      <h2 className="header">Trans Can Work</h2>
      <h1 className="header">{header}</h1>
      <p>{description}</p>
      {graphic}
    </div>
  );
}

Splash.propTypes = {
  header: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  graphic: PropTypes.element.isRequired,
};

export default Splash;
