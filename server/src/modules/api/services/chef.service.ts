import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Chef from '../../postgres/entities/chef.entity';

import { FindOneOptions } from 'typeorm';

/**
 * Chef CRUD service.
 */
@Injectable()
class ChefService {
  constructor(
    @InjectRepository(Chef)
    private readonly chefRepository: Repository<Chef>,
  ) {}

  /**
   * Find a Chef with given query options.
   *
   * @param options
   * @returns Chef
   */
  async findOne(options: FindOneOptions<Chef>): Promise<Chef> {
    return (await this.chefRepository.findOne(options)) || null;
  }
}

export default ChefService;
