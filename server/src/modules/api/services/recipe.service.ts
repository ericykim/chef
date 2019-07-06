import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findOne(options): Promise<Recipe> {
    return await this.recipeRepository.findOne(options);
    // const { base, ...recipe } = await this.recipeRepository.findOne(options);
    // const baseRecipe = await this.recipeRepository.findOne({
    //   where: { id: base },
    // });
    // return { ...recipe, base: baseRecipe && { title: baseRecipe.title } };
  }

  async createOne(attributes) {
    await this.recipeRepository.save(attributes);
  }
}

export default RecipeService;
