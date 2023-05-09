const express = require('express');

const app = express();
const cors = require('cors');

const port = 3001;
const axios = require('axios');
const NoProgress = require('./email/noProgress.js');
const CompleteMilestone = require('./email/completeMilestone.js');

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

app.post('/no-progress-email', (req, res) => {
  console.log(req.body);
  NoProgress(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.post('/milestone-email', (req, res) => {
  console.log(req.body);
  CompleteMilestone(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.put('/spreadsheetupdate', (req, res) => {
  axios.put('https://sheets.googleapis.com/v4/spreadsheets/1-Em16xvP40Z5e8yfsTeFC65YbpTFuBK-1wVlo0OHy7o/values/A1:C5?key=AIzaSyBiThiZwdEtWQJRmINwH-ADjLUHV2_Bsv4', req.data, {
    headers: {
      Authorization: `Bearer ${req.token}`,
      'Content-Type': 'application/json',
      // Accept: 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'PUT',
      // 'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token', // ?
    },
  })
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      console.log('you messed up');
      console.log(error.message);
    });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
