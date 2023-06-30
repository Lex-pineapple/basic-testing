// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const resolvedValue = await resolveValue(5);
    expect(resolvedValue).toEqual(5);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const errMsg = 'Error yippee!';
    expect(() => {
      throwError(errMsg);
    }).toThrow(errMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    const defMsg = 'Oops!';
    const thrown = () => throwError();
    expect(thrown).toThrow(defMsg);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    const thrown = () => throwCustomError();
    expect(thrown).toThrowError(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    const thrown = async () => await rejectCustomError();
    await expect(thrown).rejects.toThrowError(MyAwesomeError);
  });
});
