// @flow

const shuffle = require('shuffle-array');

const single = (names: string[]): string[] => {
  return shuffle(names.map((name) => name.trim()));
};

const group = (groups: string[][]): Map<string, string> => {
  const names = groups.map((pair) => {
    return shuffle(pair.map((s) => s.trim()));
  });

  const people = shuffle(names),
    result = new Map(),
    used = new Set();
  people.forEach((group, index) => {
    const next = new WrappingNumber(people.length, index);
    group.forEach(member => {
      let unused = [];
      // todo: will select from same group in some conditions
      while(unused.length === 0) {
        unused = people[next.next()].filter(e => !used.has(e));
      }
      result.set(member, unused[0]);
      used.add(unused[0]);
    });
  });

  return result;
}

class WrappingNumber {
  max: number;
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

module.exports = {group: group, single: single}
