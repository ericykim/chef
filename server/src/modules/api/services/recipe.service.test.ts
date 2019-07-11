import RecipeService from './recipe.service';
import { Repository } from 'typeorm';
import Recipe from '../../postgres/entities/recipe.entity';

import { createRecipe } from '../../../../test/factories/recipe.factory';

describe('RecipeService', () => {
  let recipeService: RecipeService;
  let recipeRepository: Repository<Recipe>;

  beforeEach(() => {
    recipeRepository = new Repository<Recipe>();
    recipeService = new RecipeService(recipeRepository);
  });

  describe('createOne', () => {
    let recipe: Recipe;

    beforeEach(() => {
      recipe = createRecipe();
    });

    it('true when a recipe is created', async () => {
      jest
        .spyOn(recipeRepository, 'save')
        .mockImplementation(async () => recipe);

      const created = await recipeService.createOne(recipe);
      expect(created).toBe(true);
    });

    it('false when a recipe is not created', async () => {
      jest.spyOn(recipeRepository, 'save').mockImplementation(async () => null);

      const created = await recipeService.createOne(recipe);
      expect(created).toBe(false);
    });

    it('false when repository errors out', async () => {
      jest.spyOn(recipeRepository, 'save').mockImplementation(async () => {
        throw Error();
      });

      const created = await recipeService.createOne(recipe);
      expect(created).toBe(false);
    });
  });

  describe('findOne', () => {
    let recipe: Recipe;

    beforeEach(() => {
      recipe = createRecipe();
    });

    it('returns Recipe', async () => {
      jest
        .spyOn(recipeRepository, 'findOne')
        .mockImplementation(async () => recipe);

      const found = await recipeService.findOne({});
      expect(found).toEqual(recipe);
    });

    it('returns null if not found', async () => {
      jest
        .spyOn(recipeRepository, 'findOne')
        .mockImplementation(async () => null);

      const found = await recipeService.findOne({});
      expect(found).toBe(null);
    });
  });
});
