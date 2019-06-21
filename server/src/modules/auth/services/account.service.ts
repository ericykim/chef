import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import Account from '../../postgres/entities/account.entity';
import Chef from '../../postgres/entities/chef.entity';
import { Registration, Login } from '../interfaces';
import { hash } from '../../../utils';

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
  async register(registration: Registration): Promise<boolean> {
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
    const hashedPassword = hash(password);

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
    return { ...account, password: hash(account.password) };
  }
}

export default AccountService;
