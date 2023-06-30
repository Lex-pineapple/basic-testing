// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

const resolvedValue = [
  {
    name: 'Molecule Man',
    age: 29,
    secretIdentity: 'Dan Jukes',
    powers: ['Radiation resistance', 'Turning tiny', 'Radiation blast'],
  },
  {
    name: 'Madame Uppercut',
    age: 39,
    secretIdentity: 'Jane Wilson',
    powers: ['Million tonne punch', 'Damage resistance', 'Superhuman reflexes'],
  },
];

jest.mock('lodash', () => ({
  __esModule: true,
  ...jest.requireActual<typeof import('lodash')>('lodash'),
  throttle: jest.fn((fn) => fn),
}));

describe('throttledGetDataFromApi', () => {
  const axCreateArgs = {
    baseURL: 'https://jsonplaceholder.typicode.com',
  };
  test('should create instance with provided base url', async () => {
    const axCreateSpy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('posts');
    expect(axCreateSpy).toHaveBeenCalledTimes(1);
    expect(axCreateSpy).toHaveBeenCalledWith(axCreateArgs);
  });

  test('should perform request to correct provided url', async () => {
    const axGetSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: 'some data' }));
    // jest.useFakeTimers();
    await throttledGetDataFromApi('hahe');
    // jest.runAllTimers();
    expect(axGetSpy).toBeCalledTimes(1);
    expect(axGetSpy).toHaveBeenCalledWith('hahe');
  });

  test('should return response data', async () => {
    const axGetSpy = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockImplementation(async () => ({ data: resolvedValue }));
    // jest.useFakeTimers();
    const res = await throttledGetDataFromApi('hahe');
    // jest.runAllTimers();
    expect(res).toStrictEqual(resolvedValue);
    expect(axGetSpy).toBeCalledTimes(1);
  });
});
