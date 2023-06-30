// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

const testValues = ['cookies', 'milk'];
const testLinkedList = {
  value: 'cookies',
  next: {
    value: 'milk',
    next: {
      value: null,
      next: null,
    },
  },
};

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const result = generateLinkedList(testValues);
    expect(result).toStrictEqual(testLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const result = generateLinkedList(testValues);
    expect(result).toMatchSnapshot();
  });
});
