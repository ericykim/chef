import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { pickBy, isEmpty } from 'lodash';

import { tryReturn } from '../../../utils';
import Recipe from '../../postgres/entities/recipe.entity';

/**
 * Recipe CRUD service.
 */
@Injectable()
class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async findAll(options): Promise<Recipe[]> {
    return await this.recipeRepository.find(options);
  }

  /**
   * Find one Recipe given the conditions
   *
   * @param options
   * @returns Recipe
   */
  async findOne(options): Promise<Recipe> {
    return await this.recipeRepository.findOne(options);
  }

  /**
   * Create a Recipe.
   * @param attributes
   * @returns true if successful
   */
  async createOne(attributes): Promise<boolean> {
    const trimmedRecipe = pickBy(attributes, (value) => !isEmpty(value));
    const recipe = await tryReturn(
      async () => await this.recipeRepository.save(trimmedRecipe),
      false,
    );

    return !!recipe;
  }
}

export default RecipeService;
