test('Everyone should be a giver and a receiver', () => {
    const randomizer = require('../randomizer');
    const R = require('ramda');
    const groups = [
      ['a', 'b', 'c'],
      ['1', '2', '3'],
      ['there', 'are', 'more', 'in', 'this', 'one']
    ];
    const result = randomizer.group(groups);

    const keys = new Set(R.flatten(groups)),
      resultKeys = new Set(),
      resultValues = new Set();
    for(let [key, value] of result) {
      resultKeys.add(key);
      resultValues.add(value);
    }
    expect(result.size).toBe(keys.size);
    expect(resultKeys.size).toBe(keys.size);
    expect(resultValues.size).toBe(keys.size);
});

test('Single: Everyone should be a giver and a receiver', () => {
    const randomizer = require('../randomizer');
    const names = ['a', 'b', 'c', '1', '2', '3'];
    const result = randomizer.single(names);

    const keys = new Set(names),
      resultKeys = new Set(),
      resultValues = new Set();
    for(let [key, value] of result) {
      resultKeys.add(key);
      resultValues.add(value);
    }
    expect(result.size).toBe(keys.size);
    expect(resultKeys.size).toBe(keys.size);
    expect(resultValues.size).toBe(keys.size);
});

test('No one should ever draw themselves', () => {
    const randomizer = require('../randomizer');
    const R = require('ramda');
    const groups = [
      ['a', 'b'],
      ['1', '2']
    ];
    const result = randomizer.group(groups);

    for(let [key, value] of result) {
      expect(key).not.toBe(result.get(key))
    }
});