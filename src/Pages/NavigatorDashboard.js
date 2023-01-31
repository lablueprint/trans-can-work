import React, { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../Components/firebase";
import "./NavigatorDashboard.css"



function NavigatorDashboard() {
    const temp = async () => {
        const Ref = collection(db, "jobseekers");

    const q = query(Ref, where("name", "==", "Joe Bruin"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data();
    setName(data.name)
    setPronouns(data.pronouns)
    setPhone(data.phone)
    setEmail(data.email)
    setEthnicity(data.ethnicity)
    });
    }
    temp();

    const [name, setName] = useState("Name")
    const [pronouns, setPronouns] = useState("Pronouns")
    const [phone, setPhone] = useState("Phone")
    const [email, setEmail] = useState("Email")
    const [ethnicity, setEthnicity] = useState("Ethnicity")
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
                        <input id="degree" placeholder={name} type="text"></input>
                    </div>
                    <div className="inputWrapper">
                        <label for="degreeType">Type of Degree</label>
                        <input id="degreeType" placeholder={pronouns} type="text"></input>
                    </div>
                    <div className="inputWrapper">
                        <label for="cert">Certificate?</label>
                        <select id="cert" placeholder="Select" type="text">
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>
                    <div className="inputWrapper">
                        <label for="certType">Type of Certificate</label>
                        <input id="certType" placeholder={email} type="text"></input>
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
        </div>
    </div>
  );
}
export default NavigatorDashboard;