import ChefService from './chef.service';
import { TestingModule } from '@nestjs/testing';
import getTestModule from '../../../../test/testModule';

import { saveChef } from '../../../../test/factories/chef.factory';

describe('ChefService', () => {
  let testModule: TestingModule;
  let chefService: ChefService;

  beforeEach(async () => {
    testModule = await getTestModule({
      providers: [ChefService],
    });

    chefService = testModule.get<ChefService>(ChefService);
  });

  afterEach(async () => await testModule.close());

  describe('findOne', () => {
    it('returns null if not found', async () => {
      const found = await chefService.findOne({
        where: { username: 'gvjacob' },
      });

      expect(found).toBe(null);
    });

    it('returns chef if found', async () => {
      const chef = await saveChef();
      const found = await chefService.findOne({
        where: { username: chef.username },
      });

      expect(found).not.toBe(null);
    });
  });
});
