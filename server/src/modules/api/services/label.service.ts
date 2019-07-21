import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import Label from '../../postgres/entities/label.entity';

/**
 * Label CRUD service.
 */
@Injectable()
class LabelService {
  constructor(
    @InjectRepository(Label)
    private readonly labelRepository: Repository<Label>,
  ) {}

  /**
   * Find all labels given query options.
   *
   * @param options
   */
  async findAll(options: FindManyOptions = {}): Promise<Label[]> {
    return await this.labelRepository.find(options);
  }
}

export default LabelService;
