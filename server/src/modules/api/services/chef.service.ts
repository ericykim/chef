import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Chef from '../../postgres/entities/chef.entity';

/**
 * Chef CRUD service.
 */
@Injectable()
class ChefService {
  constructor(
    @InjectRepository(Chef)
    private readonly chefRepository: Repository<Chef>,
  ) {}

  async findAll(): Promise<Chef[]> {
    return await this.chefRepository.find({
      relations: ['recipes'],
    });
  }

  async findOne(options): Promise<Chef> {
    return await this.chefRepository.findOne(options);
  }

  async createOne(attributes) {
    await this.chefRepository.save(attributes);
  }
}

export default ChefService;
