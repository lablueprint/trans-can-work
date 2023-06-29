import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Button from '@mui/material/Button';
import './OnlineProfile.css';

function OnlineProfile() {
  const [inputs, setInputs] = useState({});
  const [isComplete, setComplete] = React.useState(false);
  const toggleComplete = () => setComplete(!isComplete);

  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <div>
      <h6 className="onlineProfile">
        Please share with us yer username fer any of
        the followin&apos; Social Media sites once ye&apos;ve set&apos; em up.
      </h6>
      <form className="textFields">
        <div className="onlineProfile-row">
          <label htmlFor="linkedin" className="onlineProfile-row-label">
            Linkedin
            <input
              type="text"
              name="linkedin"
              value={inputs.linkedin || ''}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="facebook" className="onlineProfile-row-label">
            Facebook
            <input
              type="text"
              name="facebook"
              value={inputs.facebook || ''}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="onlineProfile-row">
          <label htmlFor="imdb" className="onlineProfile-row-label">
            Imdb
            <input
              type="text"
              name="imdb"
              value={inputs.imdb || ''}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="other" className="onlineProfile-row-label">
            Other
            <input
              type="text"
              name="other"
              value={inputs.other || ''}
              onChange={handleChange}
            />
          </label>
        </div>
      </form>
      <div
        isComplete={isComplete}
        toggleComplete={toggleComplete}
      />
      <Button
        disableRipple
        onClick={toggleComplete}
        id={(isComplete) ? 'completed' : 'incomplete'}
      >
        {(isComplete) ? 'Marked as Completed' : 'Mark as Complete'}
      </Button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<OnlineProfile />);

export default OnlineProfile;
