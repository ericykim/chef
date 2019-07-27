import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import ChefService from '../services/chef.service';
import Chef from '../../postgres/entities/chef.entity';

@Controller('chef')
class ChefController {
  constructor(private readonly chefService: ChefService) {}

  @Get(':username')
  async getChef(@Param('username') username: string): Promise<Chef | null> {
    return await this.chefService.findOne({
      where: {
        username,
      },
      relations: ['recipes', 'contributorOf', 'recipes.base'],
    });
  }
}

export default ChefController;
