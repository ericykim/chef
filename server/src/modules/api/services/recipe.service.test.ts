import RecipeService from './recipe.service';
import { TestingModule } from '@nestjs/testing';
import { v4 } from 'uuid';
import getTestModule from '../../../../test/testModule';

import {
  createRecipe,
  saveRecipe,
} from '../../../../test/factories/recipe.factory';

import { saveLabel } from '../../../../test/factories/label.factory';
import LabelService from './label.service';

describe('RecipeService', () => {
  let testModule: TestingModule;
  let recipeService: RecipeService;

  beforeEach(async () => {
    testModule = await getTestModule({
      providers: [RecipeService, LabelService],
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

  describe('getLabeledRecipes', () => {
    it('returns empty if not found', async () => {
      const labeledRecipes = await recipeService.getLabeledRecipes();
      expect(labeledRecipes.length).toBe(0);
    });

    it('returns labels with empty recipes if there are no relations', async () => {
      await saveLabel();
      const labeledRecipes = await recipeService.getLabeledRecipes();

      expect(labeledRecipes.length).toBe(1);
      expect(labeledRecipes[0].recipes.length).toBe(0);
    });

    it('returns labels with recipes if there are relations', async () => {
      const recipe = await saveRecipe();
      await saveLabel({ recipes: [recipe] });
      const labeledRecipes = await recipeService.getLabeledRecipes();

      const first = labeledRecipes[0];
      expect(labeledRecipes.length).toBe(1);
      expect(first.recipes.length).toBe(1);
      expect(first.recipes[0].id).toBe(recipe.id);
    });

    it('returns only selected labels', async () => {
      const recipeOne = await saveRecipe();
      const recipeTwo = await saveRecipe();
      const labelOne = await saveLabel({ recipes: [recipeOne] });
      await saveLabel({ recipes: [recipeTwo] });
      const labeledRecipes = await recipeService.getLabeledRecipes(
        labelOne.name,
      );

      const first = labeledRecipes[0];
      expect(labeledRecipes.length).toBe(1);
      expect(first.recipes.length).toBe(1);
      expect(first.recipes[0].id).toBe(recipeOne.id);
    });
  });

  describe('deleteOne', () => {
    it('returns true if deleted recipe', async () => {
      const recipe = await saveRecipe();
      expect(
        await recipeService.findOne({ where: { id: recipe.id } }),
      ).not.toBeNull();

      const deleted = await recipeService.deleteOne(recipe.id);
      expect(
        await recipeService.findOne({ where: { id: recipe.id } }),
      ).toBeNull();
      expect(deleted).toBe(true);
    });

    it('returns false if not deleted', async () => {
      expect(await recipeService.deleteOne(v4())).toBe(false);
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
