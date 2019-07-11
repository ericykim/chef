import * as faker from 'faker';
import { v4 } from 'uuid';
import Recipe from '../../src/modules/postgres/entities/recipe.entity';

import { createChef } from './chef.factory';

export const createRecipe = (options = {}): Recipe => {
  return {
    id: v4(),
    chef: createChef(),
    sousChefs: [],
    title: faker.name.title,
    subtitle: faker.name.title,
    description: faker.random.words,
    preparationTime: faker.random.number,
    cookTime: faker.random.number,
    ingredients: [],
    directions: [],
    labels: [],
    pictures: [],
    published: false,
    views: faker.random.number,
    base: null,
    children: [],
    updatedOn: new Date(),
    createdOn: new Date(),
    ...options,
  };
};
