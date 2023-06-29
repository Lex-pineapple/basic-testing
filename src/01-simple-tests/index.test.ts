// Uncomment the code below and write your tests
import { simpleCalculator } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: '+' });
    expect(result).toBe(7);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: '-' });
    expect(result).toBe(3);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: '*' });
    expect(result).toBe(10);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: '/' });
    expect(result).toBe(2.5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: '^' });
    expect(result).toBe(25);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 5, b: 2, action: '&' });
    expect(result).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    const result = simpleCalculator({ a: 'cookies', b: 'milk', action: '+' });
    expect(result).toBe(null);
  });
});
