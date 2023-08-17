import React from 'react';
import MilestoneClientInfo from './MilestoneClientInfo';
import { hiringInfo } from '../../Services/objects-service';

function Hiring() {
  return (
    <div>
      <MilestoneClientInfo data={hiringInfo} />
    </div>

  );
}

export default Hiring;
