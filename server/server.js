const express = require('express');

const app = express();
const cors = require('cors');
const cron = require('node-cron');
const jobseekers = require('./config');

const port = 5000;
const NoProgress = require('./email/noProgress');
const CompleteMilestone = require('./email/completeMilestone');

// cors
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.send('server running');
});

const emailList = ['arwaidev@gmail.com'];

// https://www.youtube.com/watch?v=StkFajPnd7w
// https://www.youtube.com/watch?v=Q7S2SbadV6o
// node cron runs a function every week on Monday 12pm, LA time (0 12 * * 1)
cron.schedule('0 12 * * 1', () => { NoProgress({ emailList, subject: 'auto send at 12pm on Wed', message: 'jake' }); }, { timezone: 'America/Los_Angeles' });

// function pulls emails from firebase,
const getEmails = () => {
  app.get('/', async (req, res) => {
    const snapshot = await jobseekers.get();
    const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.send(list);
  });
  // const colRef = collection(db, 'jobseekers');
  // try {
  //   // https://firebase.google.com/docs/firestore/query-data/queries
  //   const docsSnap = query(colRef, where('archived', '==', false), where('approved', '==', true)); // need to add a last milestone complete date
  //   return docsSnap;
  // } catch (error) {
  //   console.log(error);
  //   return undefined;
  // }
};
// checks if jobseeker, areMilestonesComplete, last completion date
// everything that isn't MilestonesComplete gets an appropriate email sent
// MilestoneComplete gets an autoemail send trigger that isn't a part of this issue

// for testing purposes
app.post('/no-progress-email', (req, res) => {
  console.log(req.body);
  NoProgress(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

// MilestoneComplete gets an autoemail sent
app.post('/milestone-email', (req, res) => {
  console.log(req.body);
  CompleteMilestone(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
