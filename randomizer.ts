import * as shuffle from 'shuffle-array';
import * as bodyParser from 'body-parser';
import * as express from 'express';

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
  res.send('result goes here');
});

app.post('/pair', (req, res) => {
  console.log('pairs');
  // req.body should be an array of array-2s
  // TODO: enforce with TS
  let pairs = req.body,
    names: string[][] = [];

  pairs.forEach((pair, index) => {
    if(pair.length !== 2) {
      console.log(`Expected 2 names, got ${pair.length}`);
      return; // TODO: throw/error resp?
    }
    names.push(shuffle<string>(pair.map((s) => s.trim())));
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

let group = (groups: string[][]): Map<string, string> => {
  let names = groups.map((pair) => {
    return shuffle(pair.map((s) => s.trim()));
  });

  let people = shuffle(names),
    result = new Map<string, string>(),
    used = new Set();
  people.forEach((group, index) => {
    let next = new WrappingNumber(people.length, index);
    group.forEach(member => {
      let unused: string[] = [];
      // todo: will select from same group in some conditions
      while(unused.length === 0) {
        unused = people[next.next()].filter(e => !used.has(e));
      }
      result[member] = unused[0];
      used.add(unused[0]);
    });
  });

  return result;
}

app.post('/group', (req, res) => {
  console.log('group');
  // req.body should be an array of array-2s
  res.json(group(req.body));
});

class WrappingNumber {
  readonly max: number;
  current: number;
  constructor(max, current) {
    this.max = max;
    this.current = current;
  }

  next() {
    this.current = this.current + 1;
    if(this.current == this.max) {
      this.current = 0;
    }
    return this.current;
  }
}

let wrap = (x, max) => {
  if(x < 0) {
    return x + max;
  }
  return x % max;
}

let server = app.listen(8081, () => {
  console.log(`Listening on ${server.address().address}:${server.address().port}`);
});
