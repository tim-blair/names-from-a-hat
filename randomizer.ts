import shuffle = require('shuffle-array');
import bodyParser = require('body-parser');
import express = require('express');

let app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  // todo: make static page
  res.send(`<html><head></head><body>
           <script>
           http = new XMLHttpRequest();
           http.open('POST', '/pairs', true);
           pairs = [['tim', 'megan'], ['scott', 'hollly'], ['don', 'jenn']];
           pjson = JSON.stringify(pairs);
           http.setRequestHeader('Content-type', 'application/json');
           http.setRequestHeader('Content-length', pjson.length);
           http.setRequestHeader('Connection', 'close');
           http.onreadystatechange = () => {
             if(http.readyState == 4 && http.status == 200) {
               alert(http.responseText);
             }
           }
           http.send(pjson);
           </script>
           </body></html>`);
});

app.post('/singles', (req, res) => {
  console.log('singles');
  res.send('result goes here');
});

app.post('/pairs', (req, res) => {
  console.log('pairs');
  // req.body should be an array of array-2s
  // TODO: enforce with TS
  let pairs = req.body,
    names= [];

  pairs.forEach((pair, index) => {
    if(pair.length !== 2) {
      console.log(`Expected 2 names, got ${pair.length}`);
      return; // TODO: throw/error resp?
    }
    names.push(shuffle(pair.map((s) => s.trim())));
  });

  let givers = shuffle(names),
    result = {};
  givers.forEach((pair, index) => {
    let receivers = [
      givers[wrap(index - 1, givers.length)][0],
      givers[wrap(index + 1, givers.length)][1]
    ];
    result[pair[0]] = receivers[0];
    result[pair[1]] = receivers[1];
  });

  res.json(result);
});

let wrap = (x, max) => {
  if(x < 0) {
    return x + max;
  }
  return x % max;
}

let server = app.listen(8081, () => {
  console.log(`Listening on ${server.address().address}:${server.address().port}`);
});
