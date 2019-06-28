import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Chef from '../../postgres/entities/chef.entity';
import { Registration, Login } from '../interfaces';
import { hash } from '../../../utils';

@Injectable()
class ChefService {
  constructor(
    @InjectRepository(Chef)
    private readonly chefRepository: Repository<Chef>,
  ) {}

  /**
   * Register the given user.
   * @param registration
   */
  async register(registration: Registration): Promise<boolean> {
    if (await this.accountExists(registration)) {
      return false;
    }

    const chef = this.chefRepository.merge(new Chef(), {
      ...registration,
    });

    await this.chefRepository.save(this.hashPassword(chef));
    return true;
  }

  /**
   * Authenticate given login credentials.
   * @param login
   */
  async authenticate(login: Login): Promise<boolean> {
    const { handle, password } = login;
    const hashedPassword = hash(password);

    const account = await this.chefRepository.findOne({
      where: [
        { email: handle, password: hashedPassword },
        { username: handle, password: hashedPassword },
      ],
    });

    return !!account;
  }

  /**
   * Does given registration include exisitng username or email?
   * @param registration
   */
  private async accountExists(registration: Registration): Promise<boolean> {
    const account = await this.chefRepository.findOne({
      where: [
        { username: registration.username },
        { email: registration.email },
      ],
    });

    return !!account;
  }

  /**
   * Hash password field.
   * @param account
   */
  private hashPassword(chef: Chef): Chef {
    return { ...chef, password: hash(chef.password) };
  }
}

export default ChefService;
