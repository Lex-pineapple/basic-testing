// Uncomment the code below and write your tests
import lodash from 'lodash';
import {
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
  getBankAccount,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const acc = getBankAccount(200);
    expect(acc.getBalance()).toEqual(200);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const acc = getBankAccount(200);
    const thrown = () => acc.withdraw(500);
    expect(thrown).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const acc = getBankAccount(200);
    const transfAcc = getBankAccount(99999);
    const thrown = () => acc.transfer(500, transfAcc);
    expect(thrown).toThrowError(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const acc = getBankAccount(200);
    const thrown = () => acc.transfer(500, acc);
    expect(thrown).toThrowError(TransferFailedError);
  });

  test('should deposit money', () => {
    const acc = getBankAccount(200);
    acc.deposit(200);
    expect(acc.getBalance()).toEqual(400);
  });

  test('should withdraw money', () => {
    const acc = getBankAccount(200);
    acc.withdraw(150);
    expect(acc.getBalance()).toEqual(50);
  });

  test('should transfer money', () => {
    const acc = getBankAccount(200);
    const transfAcc = getBankAccount(300);
    acc.transfer(150, transfAcc);
    expect(acc.getBalance()).toEqual(50);
    expect(transfAcc.getBalance()).toEqual(450);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(1);
    const acc = getBankAccount(200);
    const balance = await acc.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(100);
    const acc = getBankAccount(200);
    await acc.synchronizeBalance();
    expect(acc.getBalance()).toEqual(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    jest.spyOn(lodash, 'random').mockReturnValue(0);
    const acc = getBankAccount(200);
    expect(acc.synchronizeBalance()).rejects.toThrowError(
      SynchronizationFailedError,
    );
  });
});
