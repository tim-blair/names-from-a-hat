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
      resultKeys = new Set(result.keys()),
      keyDifference = new Set([...resultKeys].filter(x => !keys.has(x))),
      resultValues = new Set(result.keys()),
      valueDifference = new Set([...resultValues].filter(x => !keys.has(x)));
    expect(keyDifference.size).toBe(0);
    expect(valueDifference.size).toBe(0);
});
