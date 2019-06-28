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

  @Get(':username')
  async getChef(@Param('username') username): Promise<Chef> {
    return await this.chefService.findOne({
      where: {
        username,
      },
      relations: ['recipes', 'contributorOf'],
    });
  }
}

export default ChefController;
