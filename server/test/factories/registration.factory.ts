import * as faker from 'faker';
import { Registration } from '../../src/modules/auth/interfaces';

export const createRegistration = async (
  options = {},
): Promise<Registration> => {
  return {
    username: faker.internet.userName(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...options,
  };
};
