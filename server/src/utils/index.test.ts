import { tryReturn } from '.';

describe('tryReturn', () => {
  const result = 'result';
  const successfulFunc = () => result;
  const failingFunc = () => {
    throw new Error();
  };

  describe('successful', () => {
    test('returns result of given function', () => {
      expect(tryReturn(successfulFunc)).toBe(result);
    });

    test('returns success if specified', () => {
      expect(tryReturn(successfulFunc, true)).toBe(true);
    });
  });

  describe('failure', () => {
    test('returns false', () => {
      expect(tryReturn(failingFunc)).toBe(false);
    });

    test('returns false if success is specified', () => {
      expect(tryReturn(failingFunc, true)).toBe(false);
    });
  });
});
