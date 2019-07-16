import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
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

  /**
   * Find one Recipe given query options.
   *
   * @param options
   * @returns Recipe
   */
  async findOne(options: FindOneOptions): Promise<Recipe> {
    return (await this.recipeRepository.findOne(options)) || null;
  }

  /**
   * Delete Recipe with given id.
   * @param id
   */
  async deleteOne(id: string): Promise<boolean> {
    const { affected } = await this.recipeRepository.delete({ id });
    return affected > 0;
  }

  /**
   * Create a Recipe.
   *
   * @param attributes
   * @returns true if successful
   */
  async createOne(attributes): Promise<boolean> {
    const trimmedRecipe = pickBy(attributes, (value) => !isEmpty(value));
    const recipe = await tryReturn(
      async () => await this.recipeRepository.insert(trimmedRecipe),
      false,
    );

    return !!recipe;
  }
}

export default RecipeService;
