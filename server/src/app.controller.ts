import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import Recipe from './postgres/recipe.entity';
import RecipeService from './postgres/recipe.service';

@Controller()
export class AppController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getRecipes(): Promise<Recipe[]> {
    return await this.recipeService.findAll();
  }
}
