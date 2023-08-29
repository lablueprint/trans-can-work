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
  NoProgress({ emailList: emailList[0], fullName: emailList[1] });
};

// node cron runs a function every week on Monday 12pm, LA time (0 12 * * 1)
cron.schedule('0 12 * * 1', () => { sendEmails(); }, { timezone: 'America/Los_Angeles' });

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
