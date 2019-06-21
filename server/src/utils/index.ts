import { createHmac } from 'crypto';
import { hashSecret } from '../constants';

/**
 * Update values of given entity with the provided entries.
 *
 * Exclude certain keys in entries if specified.
 *
 * @param entity
 * @param entries
 * @param exclude
 */
export const update = <T>(
  entity: Object,
  entries: Object,
  exclude: string[] = [],
): T => {
  const updated = { ...entity, ...entries };
  exclude.forEach((key) => delete updated[key]);

  return updated as T;
};

/**
 * Tries given function. Return result of function call
 * if successful, unless specified, and failure otherwise.
 *
 * @param func
 * @param success
 * @param failure
 */
export const tryReturn = (func: Function, success?) => {
  try {
    const result = func();
    return success || result;
  } catch {
    return false;
  }
};

/**
 * Hash given string
 * @param string
 */
export const hash = (string: string, secret = hashSecret): string => {
  return createHmac('sha256', secret)
    .update(string)
    .digest('hex');
};
