// @flow

const bodyParser = require('body-parser');
const express = require('express');
const randomizer = require('./randomizer');

let app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  // todo: make static page
  res.send(`<html><head></head><body>
           <script>
           http = new XMLHttpRequest();
           http.open('POST', '/group', true);
           pairs = [['tim', 'megan'], ['scott', 'holly'], ['don', 'jenn'], ['sadman'], ['big', 'family', 'of', 'four']];
           pjson = JSON.stringify(pairs);
           http.setRequestHeader('Content-type', 'application/json');
           http.setRequestHeader('Content-length', pjson.length);
           http.setRequestHeader('Connection', 'close');
           http.onreadystatechange = () => {
             if(http.readyState == 4 && http.status == 200) {
               var r = JSON.parse(http.responseText);
               for(var k in r) { document.writeln('<div>' + k + ' ' + r[k] + '</div>'); }
             }
           }
           http.send(pjson);
           </script>
           </body></html>`);
});

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
