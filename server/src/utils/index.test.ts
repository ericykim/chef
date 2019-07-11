import { tryReturn } from '.';

describe('tryReturn', () => {
  const result = 'result';

  const successfulFunc = () => result;
  const failingFunc = () => {
    throw new Error();
  };

  describe('successful', () => {
    test('returns result of given function', async () => {
      expect(await tryReturn(successfulFunc)).toBe(result);
    });

    test('returns success if specified', async () => {
      expect(await tryReturn(successfulFunc, true)).toBe(true);
    });
  });

  describe('failure', () => {
    test('returns false', async () => {
      expect(await tryReturn(failingFunc)).toBe(false);
    });

    test('returns false if success is specified', async () => {
      expect(await tryReturn(failingFunc, true)).toBe(false);
    });
  });
});
