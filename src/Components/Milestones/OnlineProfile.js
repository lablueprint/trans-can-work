import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { v4 as uuidv4 } from 'uuid';
import './OnlineProfile.css';
import PropTypes from 'prop-types';
import Loading from '../Loading/Loading';

function OnlineProfile({ jobseeker }) {
  const [profiles, setProfiles] = useState();

  useEffect(() => {
    if (jobseeker !== undefined) { setProfiles([...jobseeker.onlineProfiles]); }
  }, [jobseeker]);

  const handleChange = (event, param) => {
    event.preventDefault();
    const temp = [...profiles];
    temp[param].username = event.target.value;
    setProfiles(temp);
  };

  if (profiles === undefined) {
    return <Loading />;
  }

  return (
    <div>
      <h6 className="onlineProfile">
        Please share with us yer username fer any of
        the followin&apos; Social Media sites once ye&apos;ve set&apos; em up.
      </h6>
      <form className="textFields">
        <div className="onlineProfile-row">
          {profiles.map((profile, index) => (
            <label key={uuidv4()} htmlFor={profile.site} className="onlineProfile-row-label">
              {profile.site}
              <input
                className="profileInput"
                type="text"
                name="facebook"
                value={profile.username}
                onChange={(e) => { handleChange(e, index); }}
              />
            </label>
          ))}
        </div>
      </form>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<OnlineProfile />);

OnlineProfile.propTypes = {
  jobseeker: PropTypes.func.isRequired,
};

export default OnlineProfile;
