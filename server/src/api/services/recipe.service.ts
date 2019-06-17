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

  async findAll(): Promise<Recipe[]> {
    return await this.recipeRepository.find();
  }

  async findOne(options): Promise<Recipe> {
    return await this.recipeRepository.findOne(options);
  }

  async createOne(attributes) {
    await this.recipeRepository.save(attributes);
  }
}

export default RecipeService;
