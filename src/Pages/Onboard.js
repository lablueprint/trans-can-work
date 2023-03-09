import React, { useState } from 'react';

export default function Onboard() {
  const [name, setName] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [interests, setInterests] = useState({
    javascript: false,
    react: false,
    node: false,
    other: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setInterests({ ...interests, [name]: checked });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({ name, email, message, interests });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </label>
      <label>
        Message:
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
      </label>
      <label>
        Interests:
        <br />
        <input
          type="checkbox"
          name="javascript"
          checked={interests.javascript}
          onChange={handleCheckboxChange}
        />
        <span>Javascript</span>
        <br />
        <input
          type="checkbox"
          name="react"
          checked={interests.react}
          onChange={handleCheckboxChange}
        />
        <span>React</span>
        <br />
        <input
          type="checkbox"
          name="node"
          checked={interests.node}
          onChange={handleCheckboxChange}
        />
        <span>Node.js</span>
        <br />
        <input
          type="checkbox"
          name="other"
          checked={interests.other}
          onChange={handleCheckboxChange}
        />
        <span>Other</span>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}