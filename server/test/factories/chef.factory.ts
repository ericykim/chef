import { v4 } from 'uuid';
import Chef from 'src/modules/postgres/entities/chef.entity';

export const createChef = (options): Chef => {
  return {
    id: v4(),
    account: null,
    createdOn: new Date(),
    updatedOn: new Date(),
    ...options,
  };
};
