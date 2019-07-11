import ChefService from './chef.service';
import { Repository } from 'typeorm';
import Chef from '../../postgres/entities/chef.entity';

import { createChef } from '../../../../test/factories/chef.factory';

describe('ChefService', () => {
  let chefService: ChefService;
  let chefRepository: Repository<Chef>;

  beforeEach(() => {
    chefRepository = new Repository<Chef>();
    chefService = new ChefService(chefRepository);
  });

  describe('findOne', () => {
    let chef;

    beforeEach(() => {
      chef = createChef();
    });

    it('returns chef if found', async () => {
      jest.spyOn(chefRepository, 'findOne').mockImplementation(() => chef);

      const found = await chefService.findOne({});
      expect(found).toEqual(chef);
    });

    it('returns null if not found', async () => {
      jest.spyOn(chefRepository, 'findOne').mockImplementation(() => null);

      const found = await chefService.findOne({});
      expect(found).toEqual(null);
    });
  });

  describe('createOne', () => {
    let chef;

    beforeEach(() => {
      chef = createChef();
    });
  });
});
