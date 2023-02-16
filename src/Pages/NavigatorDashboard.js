import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Components/firebase";
import "./NavigatorDashboard.css"
import Checkboxes from "./Checkboxes";

// later we can make each tab a different component, the individual tabs take a jobseeker as a prob


const getSeeker = async (setJobseeker) => {
    const Ref = collection(db, "jobseekers");

const q = query(Ref, where("name", "==", "Ryan"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    const data = doc.data();
    console.log(data)
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
    })
});
}

function NavigatorDashboard() {


    const updateJobseeker = () => {
        console.log(1)
    };
    
    const [jobseeker, setJobseeker] = useState({
        name: "Name",
        pronouns: "Pronouns",
        phone: "Phone",
        email: "Email",
        ethnicity: "Ethnicity",
        degree: "No",
        degreeType: "None",
        certificate: "No",
        certificateType: "None",
    })
    const {name, pronouns, phone, email, ethnicity, degree, degreeType, certificate, certificateType} = jobseeker

    useEffect(() => {
        getSeeker(setJobseeker)
    }, [setJobseeker])
    const skills = ['Accounting Software', 'Administrative', 'Adobe Software Suite']
    
    const [checkedArr, setCheckedArr] = useState(new Array(skills.length).fill(false))
    let props = {skills, checkedArr, setCheckedArr}
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
                        <label for="authName">Authentic Name</label>
                        <input id="authName" placeholder={name} type="text"></input>
                    </div>
                    <div className="inputWrapper">
                        <label for="pronouns">Pronouns</label>
                        <input id="pronouns" placeholder={pronouns} type="text"></input>
                    </div>
                    <div className="inputWrapper">
                        <label for="phone">Phone</label>
                        <input id="phone" placeholder={phone} type="text"></input>
                    </div>
                    <div className="inputWrapper">
                        <label for="email">Email</label>
                        <input id="email" placeholder={email} type="text"></input>
                    </div>
                    {/* <div className="inputWrapper">
                        <label for="location">City/State</label>
                        <input id="location" placeholder="Kevin" type="text"></input>
                    </div> */}
                    <div className="inputWrapper">
                        <label for="ethnicity">Ethnicity</label>
                        <input id="ethnicity" placeholder={ethnicity} type="text"></input>
                    </div>
                    {/* Submit button and on Click we update info */}
                </form>
            </div>
            <div>
                <h1>Education Info</h1>
                <form>
                    <div className="inputWrapper">
                        <label for="degree">Degree?</label>
                        <select id="degree" placeholder={degree} type="text">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="inputWrapper">
                        <label for="degreeType">Type of Degree</label>
                        <input id="degreeType" placeholder={degreeType} type="text"></input>
                    </div>
                    <div className="inputWrapper">
                        <label for="cert">Certificate?</label>
                        <select id="cert" placeholder={certificate} type="text">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="inputWrapper">
                        <label for="certType">Type of Certificate</label>
                        <input id="certType" placeholder={certificateType} type="text"></input>
                    </div>
                    {/* <div className="inputWrapper">
                        <label for="location">City/State</label>
                        <input id="location" placeholder="Kevin" type="text"></input>
                    </div> */}
                    {/* Submit button and on Click we update info */}
                </form>
                <button onClick={updateJobseeker}>Save Changes</button>
            </div>
            <div>
                <h1>Skills Checklist</h1>
                <Checkboxes props={props}></Checkboxes>
            </div>
        </div>
    </div>
  );
}
export default NavigatorDashboard