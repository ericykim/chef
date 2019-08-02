import { Record, String } from 'runtypes';
import { isError } from 'lodash';
import { asyncAttempt, isType, not } from '.';

describe('isType', () => {
  const Message = Record({
    text: String,
  });

  test('returns true if value matches runType', () => {
    const message = { text: 'this is a message' };
    expect(isType(message, Message)).toBe(true);
  });

  test('returns false if value does not match runType', () => {
    const notAMessage = { notAText: 1 };
    expect(isType(notAMessage, Message)).toBe(false);
  });
});

describe('not', () => {
  test('true to false', () => {
    expect(not(true)).toBe(false);
  });

  test('false to true', () => {
    expect(not(false)).toBe(true);
  });
});

describe('asyncAttempt', () => {
  const result = 'result';

  const successfulFunc = () => result;
  const failingFunc = () => {
    throw new Error();
  };

  describe('successful', () => {
    test('returns result of given function', async () => {
      expect(await asyncAttempt(successfulFunc)).toBe(result);
    });
  });

  describe('failure', () => {
    test('returns error', async () => {
      expect(isError(await asyncAttempt(failingFunc))).toBe(true);
    });
  });
});
