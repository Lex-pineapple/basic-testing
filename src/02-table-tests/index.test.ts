// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 3, b: 'k', action: Action.Add, expected: null },
  { a: 3, b: '6', action: Action.Add, expected: null },
  { a: 3, b: '6', action: 'gh', expected: null },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 3, b: 3, action: Action.Subtract, expected: 0 },
  { a: 10, b: 3, action: Action.Subtract, expected: 7 },
  { a: 10, b: '3', action: Action.Subtract, expected: null },
  { a: 10, b: '3', action: 'Action.Subtract', expected: null },
  { a: 500, b: 125, action: Action.Subtract, expected: 375 },
  { a: 500, b: 125, action: Action.Divide, expected: 4 },
  { a: 10, b: 5, action: Action.Divide, expected: 2 },
  { a: 125, b: 5, action: Action.Divide, expected: 25 },
  { a: 125, b: 5, action: 'n', expected: null },
  { a: 2121, b: 5, action: Action.Multiply, expected: 10605 },
  { a: 112, b: 57, action: Action.Multiply, expected: 6384 },
  { a: 3, b: 2, action: Action.Multiply, expected: 6 },
  { a: 3, b: 2, action: '*', expected: 6 },
  { a: 3, b: '2', action: '*', expected: null },
  { a: 3, b: 5, action: Action.Exponentiate, expected: 243 },
  { a: 112, b: 2, action: Action.Exponentiate, expected: 12544 },
  { a: 13, b: 7, action: Action.Exponentiate, expected: 62748517 },
  { a: 13, b: 7, action: '**', expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('simpleCalculator', ({ a, b, action, expected }) => {
    expect(simpleCalculator({ a, b, action })).toStrictEqual(expected);
  });
});
