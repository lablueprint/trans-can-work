import React from 'react';
import './JobFair.css';

function JobFair() {
  // const [isComplete, setComplete] = React.useState(false);
  // const toggleComplete = () => setComplete(!isComplete);
  return (
    <div className="jobContainer">
      <h6 className="jobFair">
        Share with us any Job Fairs ye have attended. These are nah just limited to Trans
        Can Work&apos; Empower! career fairs.
      </h6>
      {/* <div className="checkBoxesJob">
        <div className="col1Job">
          <form>
            <label htmlFor="career" className="labelJob">
              CareerCon
              <input type="checkbox" />
            </label>
            <br />
            <label htmlFor="future" className="labelJob">
              FutureWorks
              <input type="checkbox" />
            </label>
            <br />
            <label htmlFor="career" className="labelJob">
              Career Fusion
              <input type="checkbox" />
            </label>
            <br />
            <label htmlFor="job" className="labelJob">
              Jobapalooza
              <input type="checkbox" />
            </label>
          </form>
        </div>
        <div className="col2Job">
          <form>
            <label htmlFor="job" className="labelJob">
              JobQuest
              <input type="checkbox" />
            </label>
            <br />
            <label htmlFor="hire" className="labelJob">
              HireMeNow
              <input type="checkbox" />
            </label>
            <br />
            <label htmlFor="opportunity" className="labelJob">
              Opportunity Expo
              <input type="checkbox" />
            </label>
            <br />
            <label htmlFor="career" className="labelJob">
              CareerLaunch
              <input type="checkbox" />
            </label>
          </form>
        </div>
      </div> */}
      {/* <div
        isComplete={isComplete}
        toggleComplete={toggleComplete}
      /> */}
    </div>
  );
}

export default JobFair;
