import React from 'react';
import ReactDOM from 'react-dom/client';
import './OnlineProfile.css';
import PropTypes from 'prop-types';

function OnlineProfile({ jobseeker, setJobseeker }) {
  const handleChange = (event, param) => {
    const { value } = event.target;
    const tempJobseeker = { ...jobseeker };
    tempJobseeker.onlineProfiles[param].username = value;
    setJobseeker(tempJobseeker);
  };

  if (jobseeker === undefined) {
    return <div>Loading</div>;
  }

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
              className="profileInput"
              type="text"
              name="linkedin"
              value={jobseeker.onlineProfiles[0].username}
              onChange={(e) => { handleChange(e, 0); }}
            />
          </label>
          <label htmlFor="facebook" className="onlineProfile-row-label">
            Facebook
            <input
              className="profileInput"
              type="text"
              name="facebook"
              value={jobseeker.onlineProfiles[1].username}
              onChange={(e) => { handleChange(e, 1); }}
            />
          </label>
        </div>
        <div className="onlineProfile-row">
          <label htmlFor="glassdoor" className="onlineProfile-row-label">
            Glassdoor
            <input
              className="profileInput"
              type="text"
              name="glassdoor"
              value={jobseeker.onlineProfiles[2].username}
              onChange={(e) => { handleChange(e, 2); }}
            />
          </label>
          <label htmlFor="other" className="onlineProfile-row-label">
            Other
            <input
              className="profileInput"
              type="text"
              name="other"
              value={jobseeker.onlineProfiles[3].username}
              onChange={(e) => { handleChange(e, 3); }}
            />
          </label>
        </div>
      </form>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<OnlineProfile />);

OnlineProfile.propTypes = {
  jobseeker: PropTypes.func.isRequired,
  setJobseeker: PropTypes.func.isRequired,
};

export default OnlineProfile;
