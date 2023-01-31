import { useState } from 'react';
import {updateJobseeker, deleteJobseeker, 
    fetchAllJobseekers, fetchJobseeker, createJobseeker} from "../Services/callable-services/jobseeker-service"

const JobseekerTester = () => {
    const [email, setEmail] = useState(''); 

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
      }

    const data = {"name": "Solia", "paper":"ayub",
     "fun fact": "ableist", "helen keller": "does not exist"}

     const data2 = {"name": "Solia", "paper":"ayub",
     "fun fact": "doubtful of HK", "helen keller": "maybe can exist"}

     return (
        <section>
          <div className="Jobseeker">
            <input
            type="text"
            placeholder="email"
            value={email}
            onChange={handleEmailChange}
            />
            <button type="button" onClick={e => {e.preventDefault(); createJobseeker(email, data);}}>AddJS</button>            
            <button type="button" onClick={e => {e.preventDefault(); fetchJobseeker(email)}}>GetByEmail</button>
            <button type="button" onClick={e => {e.preventDefault(); fetchAllJobseekers()
            .then(docs => docs.forEach(doc => {
                      console.log(doc.data());
                      console.log(doc.id);
                   }));
            
            
            }}>GetAllJS</button>
            <button type="button" onClick={e => {e.preventDefault(); updateJobseeker(email, data2)}}>UpdateJS</button>
            <button type="button" onClick={e => {e.preventDefault(); fetchJobseeker(email)}}>DelJS</button>
          </div>
        </section>
      );
}

export default JobseekerTester;