const express = require('express');

const app = express();
const cors = require('cors');
const cron = require('node-cron');
const getEmails = require('./config');

const port = 5000;
const NoProgress = require('./email/noProgress');
const SendEmail = require('./email/sendEmail');

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

const sendEmails = async () => {
  const emailList = await getEmails();
  console.log(emailList);
  return emailList;
};

// node cron runs a function every week on Monday 12pm, LA time (0 12 * * 1)
cron.schedule('0 12 * * 1', () => { sendEmails(); }, { timezone: 'America/Los_Angeles' });

// checks if jobseeker, areMilestonesComplete, last completion date
// everything that isn't MilestonesComplete gets an appropriate email sent
// MilestoneComplete gets an autoemail send trigger that isn't a part of this issue

// last edit date and aremilestonescomplete
// if jobseeker or navigator makes any changes
// check if firebase keeps track of specific record change dates
// where would the app trigger the field?
// NoProgress({
//   emailList: ['arwaidev@gmail.com'], fullName: 'jackie',
// });

// notifies navigator + notifies jobseeker upon approval + all milestones complete
app.post('/send-email', (req, res) => {
  console.log(req.body);
  SendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
