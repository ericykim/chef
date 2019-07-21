import * as faker from 'faker';
import { v4 } from 'uuid';
import Label from '../../src/modules/postgres/entities/label.entity';

import factoryManager from './factory';

export const createLabel = async (options = {}): Promise<Label> => {
  return {
    id: v4(),
    name: faker.name.firstName(),
    type: [],
    recipes: [],
    updatedOn: new Date(),
    createdOn: new Date(),
    ...options,
  };
};

export const saveLabel = async (options = {}): Promise<Label> => {
  const label = await createLabel(options);
  return await factoryManager.createOne(Label, label);
};
