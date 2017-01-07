// @flow

const bodyParser = require('body-parser');
const express = require('express');
const randomizer = require('./randomizer');

let app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.post('/single', (req, res) => {
  console.log('singles');
  // req.body should be an array of names
  res.json(randomizer.single(req.body));
});

app.post('/group', (req, res) => {
  console.log('group');
  // req.body should be an array of arrays
  res.json(randomizer.group(req.body));
});

let server = app.listen(8081, () => {
  console.log(`Listening on ${server.address().address}:${server.address().port}`);
});
