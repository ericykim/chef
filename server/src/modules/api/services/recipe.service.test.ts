import RecipeService from './recipe.service';
import { TestingModule } from '@nestjs/testing';
import { v4 } from 'uuid';
import getTestModule from '../../../../test/testModule';

import {
  createRecipe,
  saveRecipe,
} from '../../../../test/factories/recipe.factory';

describe('RecipeService', () => {
  let testModule: TestingModule;
  let recipeService: RecipeService;

  beforeEach(async () => {
    testModule = await getTestModule({
      providers: [RecipeService],
    });

    recipeService = testModule.get<RecipeService>(RecipeService);
  });

  afterEach(async () => await testModule.close());

  describe('findOne', () => {
    it('returns recipe if found', async () => {
      const recipe = await saveRecipe();
      const found = await recipeService.findOne({ where: { id: recipe.id } });
      expect(found.id).toBe(recipe.id);
    });

    it('returns null if not found', async () => {
      const found = await recipeService.findOne({ where: { id: v4() } });
      expect(found).toBeNull();
    });
  });

  describe('createOne', () => {
    it('creates given recipe and returns true', async () => {
      const recipe = await createRecipe();
      const created = await recipeService.createOne(recipe);
      const found = await recipeService.findOne({ where: { id: recipe.id } });

      expect(found.id).toBe(recipe.id);
      expect(created).toBe(true);
    });

    it('returns false if recipe already exists', async () => {
      const recipe = await saveRecipe();
      const created = await recipeService.createOne(recipe);

      expect(created).toBe(false);
    });

    it('returns false if recipe does not have title', async () => {
      const recipe = await createRecipe();
      const created = await recipeService.createOne({ ...recipe, title: null });

      expect(created).toBe(false);
    });
  });
});
