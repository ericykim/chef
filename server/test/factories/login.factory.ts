import * as faker from 'faker';
import { Login } from '../../src/modules/auth/interfaces';

export const createLogin = async (options = {}): Promise<Login> => {
  return {
    handle: faker.internet.userName(),
    password: faker.internet.password(),
    ...options,
  };
};
