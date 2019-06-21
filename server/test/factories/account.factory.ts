import * as faker from 'faker';
import { v4 } from 'uuid';
import Account from 'src/modules/postgres/entities/account.entity';

export const createAccount = (options = {}): Account => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: v4(),
    chef: null,
    updatedOn: new Date(),
    createdOn: new Date(),
    ...options,
  };
};
