import * as faker from 'faker';
import { v4 } from 'uuid';
import Chef from '../../src/modules/postgres/entities/chef.entity';

import factoryManager from './factory';

export const createChef = async (options = {}): Promise<Chef> => {
  return {
    id: v4(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    username: faker.internet.userName(),
    password: v4(),
    profilePicture: null,
    bio: null,
    recipes: [],
    contributorOf: [],
    updatedOn: new Date(),
    createdOn: new Date(),
    ...options,
  };
};

export const saveChef = async (options = {}): Promise<Chef> => {
  const chef = await createChef(options);
  return await factoryManager.createOne(Chef, chef);
};
