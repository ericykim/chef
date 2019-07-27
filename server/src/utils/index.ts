import { isError, attempt } from 'lodash';
import { Runtype } from 'runtypes';
import { createHmac } from 'crypto';
import { hashSecret } from '../constants';

/**
 * Tries given async function. Return result of function call
 * if successful, unless specified, and failure otherwise.
 *
 * @param func
 * @param success
 * @param failure
 */
export const asyncAttempt = async (func: Function) => {
  try {
    const result = await func();
    return result;
  } catch (error) {
    return error;
  }
};

/**
 * Validate that given value is of given runType.
 *
 * @param value
 * @param runType
 */
export const validate = (value: any, runType: Runtype): boolean => {
  return !isError(attempt(runType.check, value));
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
