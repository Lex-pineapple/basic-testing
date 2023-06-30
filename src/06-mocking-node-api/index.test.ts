// Uncomment the code below and write your tests
import path from 'path';
import fs from 'fs';
import fsPromises from 'fs/promises';
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();

    doStuffByTimeout(cb, 200);
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(cb, 200);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const cb = jest.fn();

    expect(cb).not.toHaveBeenCalled();
    doStuffByTimeout(cb, 200);
    jest.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');

    const cb = jest.fn();

    expect(setInterval).toHaveBeenCalledTimes(0);
    doStuffByInterval(cb, 200);
    jest.advanceTimersByTime(200);
    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(setInterval).toHaveBeenLastCalledWith(cb, 200);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');

    const cb = jest.fn();

    expect(setInterval).toHaveBeenCalledTimes(0);
    doStuffByInterval(cb, 200);
    jest.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const pathSpy = jest.spyOn(path, 'join');
    expect(pathSpy).toHaveBeenCalledTimes(0);
    await readFileAsynchronously('D:\\file');
    expect(pathSpy).toHaveBeenCalledTimes(1);
    expect(pathSpy).toHaveBeenLastCalledWith(__dirname, 'D:\\file');
  });

  test('should return null if file does not exist', async () => {
    const result = await readFileAsynchronously('imNoOne');
    expect(result).toBeNull;
  });

  test('should return file content if file exists', async () => {
    const resolvedValue = "I'm working";
    fs.existsSync = jest.fn().mockReturnValue(true);
    fsPromises.readFile = jest.fn().mockResolvedValue(resolvedValue);
    const result = await readFileAsynchronously('test.ts');
    expect(result).toEqual(resolvedValue);
  });
});
