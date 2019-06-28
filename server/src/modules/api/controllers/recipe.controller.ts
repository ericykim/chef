import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import RecipeService from '../services/recipe.service';
import Recipe from '../../postgres/entities/recipe.entity';

@Controller('recipe')
class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getRecipes(): Promise<Recipe[]> {
    return await this.recipeService.findAll({ relations: ['chef'] });
  }

  @Get(':id')
  async getRecipe(@Param('id') id): Promise<Recipe> {
    return await this.recipeService.findOne({
      where: { id },
      relations: ['chef'],
    });
  }

  @Post()
  async createRecipe(@Body() body) {
    await this.recipeService.createOne(body);
  }
}

export default RecipeController;
