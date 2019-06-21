import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import RecipeService from '../services/recipe.service';
import Label from '../../postgres/entities/label.entity';
import LabelService from '../services/label.service';

@Controller('label')
class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Get()
  async getLabels(): Promise<Label[]> {
    return await this.labelService.findAll();
  }
}

export default LabelController;
