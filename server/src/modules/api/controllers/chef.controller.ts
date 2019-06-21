import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import ChefService from '../services/chef.service';
import Chef from '../../postgres/entities/chef.entity';

@Controller('chef')
class ChefController {
  constructor(private readonly chefService: ChefService) {}

  @Get('')
  async getChefs(): Promise<Chef[]> {
    return await this.chefService.findAll();
  }

  @Get(':id')
  async getChef(@Param('id') id): Promise<Chef> {
    return await this.chefService.findOne({ id });
  }

  @Post()
  async register(@Body() body) {
    await this.chefService.createOne(body);
  }
}

export default ChefController;
