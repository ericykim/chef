import {
  Controller,
  Get,
  Res,
  Param,
  Post,
  Body,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { Response } from 'express';

import Recipe from '../../postgres/entities/recipe.entity';
import Label from '../../postgres/entities/label.entity';
import RecipeService from '../services/recipe.service';

@Controller('recipe')
class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  /**
   * Get all labeled recipes.
   */
  @Get('labels')
  async getLabeledRecipes(): Promise<Label[]> {
    return await this.recipeService.getLabeledRecipes();
  }

  /**
   * Get Recipe with given id.
   *
   * @param id
   */
  @Get(':id')
  async getRecipe(@Param('id') id): Promise<Recipe> {
    return await this.recipeService.findOne({
      where: { id },
      relations: ['chef'],
    });
  }

  /**
   * Delete Recipe with given id.
   *
   * @param id
   */
  @Delete(':id')
  async deleteRecipe(@Res() res: Response, @Param('id') id) {
    const deleted = await this.recipeService.deleteOne(id);
    res.status(deleted ? HttpStatus.OK : HttpStatus.NOT_MODIFIED).send();
  }

  /**
   * Create a new Recipe.
   *
   * @param res
   * @param body
   */
  @Post()
  async createRecipe(@Res() res: Response, @Body() body: Recipe) {
    const created = await this.recipeService.createOne(body);
    res.status(created ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST).send();
  }
}

export default RecipeController;
