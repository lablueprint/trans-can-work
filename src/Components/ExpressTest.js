import React, { useState } from 'react';
import axios from 'axios';
import { fetchAllJobseekers } from '../Services/jobseeker-service';

const Form = () => {
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [emailList, setEmailList] = useState([]);

    const sendMail = () => {
        if (email && subject && message) {
            axios.post('http://localhost:3001/send-email', {
                email,
                subject,
                message,
            }).then(() => alert('Message Sent Successfully'))
                .catch(() => alert('Message Failed to Send'));
            return;
        }
        return alert('Fill the required fields.');
    }

    const getAllEmails = async () => {
        fetchAllJobseekers().then(docs => {
            docs.forEach(doc => {
                setEmailList([...emailList, doc.id])
            })
        });
        console.log(emailList)
    }

    return (
        <div>
            <section className='send-single-email'>
                <div>
                    <h2>Email credentials</h2>

                    <form action='#'>
                        <div>
                            <label htmlFor='email'>Enter recepient email</label>
                            <input id='email' type='email' onChange={e => setEmail(e.target.value)} placeholder="tcw@gmail.com" required />
                        </div>
                        <div>
                            <label htmlFor='subject'>Subject</label>
                            <input id='subject' type='text' onChange={e => setSubject(e.target.value)} placeholder='subject of email' required />
                        </div>
                        <div>
                            <label htmlFor='message'>Email Content</label>
                            <textarea id='message' onChange={e => setMessage(e.target.value)} palceholder='Body of the email' rows='4' />
                        </div>
                        <button type='submit' onClick={() => sendMail()}>Send Email</button>
                    </form>
                </div>
            </section>
            <section className='get-all-emails'>
                <button type='button' onClick={() => getAllEmails()}>Load all emails</button>
            </section>
        </div >
    )
}

export default Form;