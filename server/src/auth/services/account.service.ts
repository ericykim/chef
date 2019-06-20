import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { createHmac } from 'crypto';
import { get } from 'lodash';

import Account from '../../postgres/entities/account.entity';
import Chef from '../../postgres/entities/chef.entity';
import { Registration, Login } from '../interfaces';

import { tryReturn } from '../../utils';
import { hashSecret } from '../../constants';

@Injectable()
class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  /**
   * Register the given user.
   * @param registration
   */
  async createOne(registration: Registration): Promise<boolean> {
    if (await this.accountExists(registration)) {
      return false;
    }

    const account = this.accountRepository.merge(new Account(), {
      ...registration,
      chef: new Chef(),
    });

    await this.accountRepository.save(this.hashPassword(account));
    return true;
  }

  /**
   * Authenticate given login credentials.
   * @param login
   */
  async authenticate(login: Login): Promise<boolean> {
    const { handle, password } = login;
    const hashedPassword = this.hash(password);

    const account = await this.accountRepository.findOne({
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
    const account = await this.accountRepository.findOne({
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
  private hashPassword(account: Account): Account {
    return { ...account, password: this.hash(account.password) };
  }

  /**
   * Hash given password
   * @param password
   */
  private hash(password: string): string {
    return createHmac('sha256', hashSecret)
      .update(password)
      .digest('hex');
  }
}

export default AccountService;
