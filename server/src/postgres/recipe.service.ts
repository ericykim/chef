import { InjectRepository } from '@nestjs/typeorm';
import Recipe from './recipe.entity';
import { Repository } from 'typeorm';

/**
 * Recipe CRUD service.
 */
class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  async findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  async findOne(id): Promise<Recipe> {
    return this.recipeRepository.findOne({ id });
  }
}

export default RecipeService;
