import {
  Controller,
  Get,
  Res,
  Param,
  Post,
  Body,
  HttpStatus,
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

  @Post()
  async createRecipe(@Res() res: Response, @Body() body) {
    const created = await this.recipeService.createOne(body);
    res.status(created ? HttpStatus.CREATED : HttpStatus.BAD_REQUEST).send();
  }
}

export default RecipeController;
