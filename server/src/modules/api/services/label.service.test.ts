import LabelService from './label.service';
import { TestingModule } from '@nestjs/testing';
import getTestModule from '../../../../test/testModule';

import { saveLabel } from '../../../../test/factories/label.factory';

describe('LabelService', () => {
  let testModule: TestingModule;
  let labelService: LabelService;

  beforeEach(async () => {
    testModule = await getTestModule({
      providers: [LabelService],
    });

    labelService = testModule.get<LabelService>(LabelService);
  });

  afterEach(async () => await testModule.close());

  describe('findAll', () => {
    it('returns empty array if there are no labels', async () => {
      const found = await labelService.findAll();
      expect(found.length).toBe(0);
    });

    it('returns all labels', async () => {
      const labels = [await saveLabel(), await saveLabel()];
      const found = await labelService.findAll();
      expect(found.length).toBe(2);

      found.forEach(({ id }) =>
        expect(labels.find((label) => label.id === id)),
      );
    });

    it('returns all labels with FindManyOptions', async () => {
      const labels = [await saveLabel(), await saveLabel()];
      const found = await labelService.findAll({ where: { id: labels[0].id } });
      expect(found.length).toBe(1);

      expect(found[0].id).toBe(labels[0].id);
    });
  });
});
