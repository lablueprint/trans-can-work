import axios from 'axios';

// call this when all milestones are complete!
export const sendCompletedMilestones = async (email, fullName) => {
  await axios
    .post('http://localhost:5000/send-email', {
      email,
      fullName,
      subject: 'TCW - Milestones Complete',
      message: 'Congratulations! You have completed all milestones at TransCanWork.',
    })
    .then(() => console.log('Completed Message Sent Successfully'))
    .catch(() => console.log('Completed Message Failed to Send'));
};

// call this to notify navigator when jobseeker milestone is complete
export const notifyNavigator = async (email, fullName) => {
  await axios
    .post('http://localhost:5000/send-email', {
      email,
      fullName,
      subject: 'TCW - Jobseeker Has Completed A Milestone',
      message: 'Your assigned jobseeker has completed a milestone and is waiting for your approval!',
    })
    .then(() => console.log('Completed Message Sent Successfully'))
    .catch(() => console.log('Completed Message Failed to Send'));
};

// call this to notify jobseeker after navigator approves
export const notifyJobseeker = async (email, fullName) => {
  await axios
    .post('http://localhost:5000/send-email', {
      email,
      fullName,
      subject: 'TCW - Milestone Completion Approved',
      message: 'Congratulations! Your assigned navigator has approved your milestone progress. Keep going!',
    })
    .then(() => console.log('Completed Message Sent Successfully'))
    .catch(() => console.log('Completed Message Failed to Send'));
};
