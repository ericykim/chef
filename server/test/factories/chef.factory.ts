import * as faker from 'faker';
import { v4 } from 'uuid';
import Chef from 'src/modules/postgres/entities/chef.entity';

export const createChef = (options = {}): Chef => {
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
