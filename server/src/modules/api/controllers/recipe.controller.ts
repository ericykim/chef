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

import RecipeService from '../services/recipe.service';
import Recipe from '../../postgres/entities/recipe.entity';

@Controller('recipe')
class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get(':id')
  async getRecipe(@Param('id') id): Promise<Recipe> {
    return await this.recipeService.findOne({
      where: { id },
      relations: ['chef'],
    });
  }

  @Delete(':id')
  async deleteRecipe(@Res() res: Response, @Param('id') id) {
    const deleted = await this.recipeService.deleteOne(id);
    res.status(deleted ? HttpStatus.OK : HttpStatus.NOT_MODIFIED).send();
  }

  @Post()
  async createRecipe(@Res() res: Response, @Body() body) {
    const created = await this.recipeService.createOne(body);
    res.status(created ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST).send();
  }
}

export default RecipeController;
