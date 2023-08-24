import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import backButton from '../../Assets/back button.png';
import OnlineProfile from './OnlineProfile';
import Workshop from './Workshop';
import JobFair from './JobFair';
import JobPortal from './JobPortal';
import Resources from './Resources';
import Assessment from './Assessment';
import Training from './Training';
import Internship from './Internship';
import Hiring from './Hiring';
import './IslandPopup.css';
// import { fetchJobseekerData } from '../../Services/jobseeker-data-service';

function IslandPopup({
  title, isOpen, handleClose, id, status, togglePending,
}) {
  const [message, setMessage] = useState('Mark as Complete');
  useEffect(() => {
    if (status === 'pending') {
      setMessage('Pending Approval');
    } else if (status === 'complete') {
      setMessage('Complete!');
    }
  }, [status]);
  let toBeRendered;
  let markAsComplete = true;

  if (id === 'assessment') {
    markAsComplete = false;
    toBeRendered = <Assessment />;
  } else if (id === 'online-profile') {
    toBeRendered = <OnlineProfile />;
  } else if (id === 'workshop') {
    toBeRendered = <Workshop />;
  } else if (id === 'job-fair') {
    toBeRendered = <JobFair />;
  } else if (id === 'resources') {
    toBeRendered = <Resources />;
  } else if (id === 'job-portal') {
    toBeRendered = <JobPortal />;
  } else if (id === 'training-program') {
    toBeRendered = <Training />;
  } else if (id === 'internship') {
    toBeRendered = <Internship />;
  } else if (id === 'hiring-info') {
    markAsComplete = false;
    toBeRendered = <Hiring />;
  }

  // const [isPending, setPending] = useState(false);
  // // const [completeButtonText, setCompleteButtonText] = useState('Mark as Complete');
  // const store = useSelector((state) => state.auth.value);

  // useEffect(() => {
  //   const updateButton = async () => {
  //     const jobseekerData = await fetchJobseekerData(store.email);
  //     console.log(jobseekerData.data().milestones);
  //     console.log(jobseekerData.data().milestones.id);
  //     // const isMilestoneComplete = jobseekerData.data().milestones.includes(id);
  //     // const buttonText = isMilestoneComplete ? 'Completed!' : 'Mark as Complete';
  //     // setCompleteButtonText(buttonText);
  //   };
  //   updateButton();
  // }, []);
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
      >
        <Box id="popup">
          <img id="title" src={title} alt="island title" />
          <hr className="line" />
          {toBeRendered}
          {(markAsComplete) ? (
            <Button
              disableRipple
              onClick={() => togglePending()}
              id={status}
            >
              {message}
            </Button>
          ) : null}
          <Button
            disableRipple
            id="close"
            style={{ backgroundColor: 'transparent' }}
            onClick={handleClose}
          >
            <img src={backButton} alt="back button" />
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

IslandPopup.propTypes = {
  title: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.string,
  togglePending: PropTypes.func,
};

IslandPopup.defaultProps = {
  status: 'incomplete',
  togglePending: () => {},
};

export default IslandPopup;
