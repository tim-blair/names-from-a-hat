// @flow

const shuffle = require('shuffle-array');
const R = require('ramda');

const trimAndShuffle = (names: string[]): string[] => {
  return shuffle(names.map(n => n.trim()));
};

const single = (names: string[]): Map<string, string> => {
  const shuffled = trimAndShuffle(names);
  const result = new Map();
  shuffled.forEach((name, index) => {
    const next = new WrappingNumber(shuffled.length, index).next();
    result.set(name, shuffled[next]);
  });
  return result;
};

// Tries to match people up so that no one draws from their own group, returns null if it fails
const mapGroups = (groups: string[][]): Map<string, string> | null => {
  const result = new Map(),
    used = new Set();

  for(const [index, group] of groups.entries()) {
    const next = new WrappingNumber(groups.length, index);
    for(const member of group) {
      let unused = [],
        loops = 0;
      while(unused.length === 0 && loops < 2) {
        const target = next.next();
        if(target === index) {
          loops++;
          continue;
        }
        unused = groups[target].filter(e => !used.has(e));
      }
      if(unused.length === 0) {
        return null;
      }
      result.set(member, unused[0]);
      used.add(unused[0]);
    }
  }
  return result;
};

const group = (groups: string[][]): Map<string, string> => {
  const people = shuffle(groups.map(trimAndShuffle)),
    result = mapGroups(people);

  if(result === null) {
    return single(R.flatten(groups));
  }

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
    this.current++;
    if(this.current === this.max) {
      this.current = 0;
    }
    return this.current;
  }
}

module.exports = {group: group, single: single}
