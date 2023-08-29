import React from 'react';
import './MilestoneClientInfo.css';
import PropTypes from 'prop-types';

function MilestoneClientInfo(props) {
  const {
    data,
  } = props;

  const infoLabels = [];
  const infoTexts = [];
  Object.keys(data).forEach((key) => {
    infoLabels.push((<span className="infoLabel">{key}</span>));
    infoTexts.push((<span className="infoText">{data[key]}</span>));
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

MilestoneClientInfo.propTypes = {
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default MilestoneClientInfo;
