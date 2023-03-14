import React, { useState } from "react";
import axios from "axios";
import { fetchAllJobseekers } from "../Services/jobseeker-service";

const Form = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [emailList, setEmailList] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);

  // figure out how to send emailList to backend
  const sendMail = async () => {
    if (subject && message) {
      const resp = await axios
        .post("http://localhost:3001/no-progress-email", {
          emailList,
          subject,
          message,
        })
        .then(() => alert("Message Sent Successfully"))
        .catch(() => alert("Message Failed to Send"));
      return;
    }
    return alert("Fill the required fields.");
  };

  const getAllEmails = () => {
    setIsDisabled(true);
    fetchAllJobseekers().then((docs) => {
      docs.forEach(async (doc) => {
        await setEmailList((e) => [...e, doc.id]);
      });
    });
  };

  return (
    <div>
      <section className="send-single-email">
        <div>
          <h2>Email credentials</h2>

          <form action="#">
            <div>
              <label htmlFor="subject">Subject</label>
              <input
                id="subject"
                type="text"
                onChange={(e) => setSubject(e.target.value)}
                placeholder="subject of email"
                required
              />
            </div>
            <div>
              <label htmlFor="message">Email Content</label>
              <textarea
                id="message"
                onChange={(e) => setMessage(e.target.value)}
                palceholder="Body of the email"
                rows="4"
              />
            </div>
            <button type="submit" onClick={() => sendMail()}>
              Send Email
            </button>
          </form>
        </div>
      </section>
      <section className="get-all-emails">
        <button
          type="button"
          onClick={() => getAllEmails()}
          disabled={isDisabled}
        >
          Load all emails
        </button>
      </section>
    </div>
  );
};

export default Form;
