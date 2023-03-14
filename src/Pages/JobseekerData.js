import React, { useState } from 'react';
import './NavigatorDashboard.css';
import Checkboxes from './Checkboxes';
import { updateJobseeker } from '../Services/jobseeker-service';

// later we can make each tab a different component, the individual tabs take a jobseeker as a prob

function Onboard() {
  // eslint-disable-next-line no-unused-vars

  const [jobseeker, setJobseeker] = useState({
    name: 'Solia Tennis', // from login
    pronouns: 'Pronouns',
    phone: 'Phone',
    email: 'solia@bestpl.us', // from login
    ethnicity: 'Ethnicity',
    degree: 'No',
    degreeType: 'None',
    certificate: 'No',
    certificateType: 'None',
  });

  const skills = ['Accounting Software', 'Administrative', 'Adobe Software Suite', 'Bilingual', 'Brand Management', 'Cold Calling']; // can expand to all skills on spreadsheet

  const [checkedArr, setCheckedArr] = useState(new Array(skills.length).fill(false));

  const saveJobseeker = (event) => {
    event.preventDefault();
    updateJobseeker(jobseeker.email, jobseeker);
    // console.log(jobseeker);
  };

  // TODO: saving the state for skills and education

  return (
    <div>
      <div>
        [Image goes here]
      </div>
      <div className="content">
        <div>
          <h1>Employment Roadmap</h1>
        </div>
        <div>
          <h1>Client Info</h1>
          <form>
            <div className="inputWrapper">
              <label htmlFor="authName">
                Authentic Name
                <input
                  id="authName"
                  placeholder={jobseeker.name}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      name: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="pronouns">
                Pronouns
                <input
                  id="pronouns"
                  placeholder={jobseeker.pronouns}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      pronouns: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="phone">
                Phone
                <input
                  id="phone"
                  placeholder={jobseeker.phone}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      phone: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="email">
                Email
                <input
                  readOnly // because email is the docid, so crucial that you cannot change it.
                  id="email"
                  placeholder={jobseeker.email}
                  type="text"
                />
              </label>
            </div>
            {/* <div className="inputWrapper">
                        <label for="location">City/State</label>
                        <input id="location" placeholder="Kevin" type="text"></input>
                    </div> */}
            <div className="inputWrapper">
              <label htmlFor="ethnicity">
                Ethnicity
                <input
                  id="ethnicity"
                  placeholder={jobseeker.ethnicity}
                  onChange={(e) => {
                    setJobseeker({
                      ...jobseeker,
                      ethnicity: e.target.value,
                    });
                  }}
                  type="text"
                />
              </label>
            </div>
            {/* Submit button and on Click we update info */}
          </form>
        </div>
        <div>
          <h1>Education Info</h1>
          <form>
            <div className="inputWrapper">
              <label htmlFor="degree">
                Degree?
                <select id="degree" placeholder={jobseeker.degree} type="text">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="degreeType">
                Type of Degree
                <input id="degreeType" placeholder={jobseeker.degreeType} type="text" />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="cert">
                Certificate?
                <select id="cert" placeholder={jobseeker.certificate} type="text">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="certType">
                Type of Certificate:
                <input id="certType" placeholder={jobseeker.certificateType} type="text" />
              </label>

            </div>
            {/* <div className="inputWrapper">
                        <label for="location">City/State</label>
                        <input id="location" placeholder="Kevin" type="text"></input>
                    </div> */}
            {/* Submit button and on Click we update info */}
          </form>

        </div>
        <div>
          <h1>Skills Checklist</h1>
          <Checkboxes skills={skills} checkedArr={checkedArr} setCheckedArr={setCheckedArr} />
        </div>
        <button type="button" onClick={saveJobseeker}>Save Changes</button>
      </div>
    </div>
  );
}
export default Onboard;
