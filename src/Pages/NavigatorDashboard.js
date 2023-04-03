import React, { useEffect, useState } from 'react';
import {
  collection, query, where, getDocs, /* doc, */
} from 'firebase/firestore';
import { db } from '../Components/firebase';
import './NavigatorDashboard.css';
import Checkboxes from './Checkboxes';

// later we can make each tab a different component, the individual tabs take a jobseeker as a prob

function NavigatorDashboard() {
  // eslint-disable-next-line no-unused-vars
  const [seekerID, setSeekerID] = useState('');
  const updateJobseeker = async () => {
  // const ref = doc(db, 'jobseekers', { seekerID });
  // await update need to update db first
  };
  const [jobseeker, setJobseeker] = useState({
    name: 'Name',
    pronouns: 'Pronouns',
    phone: 'Phone',
    email: 'Email',
    ethnicity: 'Ethnicity',
    degree: 'No',
    degreeType: 'None',
    certificate: 'No',
    certificateType: 'None',
  });
  const {
    name, pronouns, phone, email, ethnicity, degree, degreeType, certificate, certificateType,
  } = jobseeker;
  const skills = ['Accounting Software', 'Administrative', 'Adobe Software Suite', 'Bilingual', 'Brand Management', 'Cold Calling']; // can expand to all skills on spreadsheet

  const [checkedArr, setCheckedArr] = useState(new Array(skills.length).fill(false));

  const getSeeker = async () => {
    const Ref = collection(db, 'jobseekers');

    const q = query(Ref, where('name', '==', 'Sol I Adams'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      setSeekerID(doc.id);
      setJobseeker({
        name: data.name,
        pronouns: data.pronouns,
        phone: data.phone,
        email: data.email,
        ethnicity: data.ethnicity,
        degree: data.degree,
        degreeType: data.degreeType,
        certificate: data.certificate,
        certificateType: data.certificateType,
      });
    });
  };
  useEffect(() => {
    getSeeker(setJobseeker);
  }, [setJobseeker]);

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
                <input id="authName" placeholder={name} type="text" />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="pronouns">
                Pronouns
                <input id="pronouns" placeholder={pronouns} type="text" />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="phone">
                Phone
                <input id="phone" placeholder={phone} type="text" />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="email">
                Email
                <input id="email" placeholder={email} type="text" />
              </label>
            </div>
            {/* <div className="inputWrapper">
                        <label for="location">City/State</label>
                        <input id="location" placeholder="Kevin" type="text"></input>
                    </div> */}
            <div className="inputWrapper">
              <label htmlFor="ethnicity">
                Ethnicity
                <input id="ethnicity" placeholder={ethnicity} type="text" />
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
                <select id="degree" placeholder={degree} type="text">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="degreeType">
                Type of Degree
                <input id="degreeType" placeholder={degreeType} type="text" />
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="cert">
                Certificate?
                <select id="cert" placeholder={certificate} type="text">
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
              </label>
            </div>
            <div className="inputWrapper">
              <label htmlFor="certType">
                Type of Certificate:
                <input id="certType" placeholder={certificateType} type="text" />
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
        <button type="button" onClick={updateJobseeker}>Save Changes</button>
      </div>
    </div>
  );
}
export default NavigatorDashboard;
