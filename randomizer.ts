let readline = require('readline'),
    fs = require('fs'),
    shuffle = require('shuffle-array');

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let pairs = [];

rl.on('line', line => {
  let names = line.split(',');
  if(names.length !== 2) {
    console.log(`Expected 2 names, got ${names.length}`);
    return;
  }
  let trimmed = names.map((s) => s.trim())
  pairs.push(shuffle(trimmed));
});

rl.on('close', () => {
  let givers = shuffle(pairs);
  givers.forEach((pair, index) => {
    let receivers = [];
    if(index === 0) {
      receivers[0] = givers[givers.length - 1][0];
    } else if(index === givers.length - 1) {
      receivers[1] = givers[0][1];
    }
    receivers[0] = receivers[0] || givers[index - 1][0];
    receivers[1] = receivers[1] || givers[index + 1][1];

    fs.writeFile(`./${pair[0]}.txt`, receivers[0]);
    fs.writeFile(`./${pair[1]}.txt`, receivers[1]);
  });
});
