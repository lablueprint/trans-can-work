const express = require("express");
const app = express();
const cors = require("cors");
const port = 3001;
const NoProgress = require("./email/noProgress.js");
const CompleteMilestone = require("./email/completeMilestone.js");

// cors
app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/", (req, res) => {
  res.send("server running");
});

app.post("/no-progress-email", (req, res) => {
  console.log(req.body);
  NoProgress(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => {
      res.status(500).send(error.message);
    });
});

app.post("/milestone-email", (req, res) => {
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
