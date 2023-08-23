import React from 'react';
import MilestoneClientInfo from './MilestoneClientInfo';
import { hiringInfo } from '../../Services/objects-service';

function Hiring() {
  return (
    <div>
      {hiringInfo.map((singleInfo) => <MilestoneClientInfo data={singleInfo} />)}
    </div>
  );
}

export default Hiring;
