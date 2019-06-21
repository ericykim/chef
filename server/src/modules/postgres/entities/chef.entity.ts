import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

import Account from './account.entity';
import { Dated } from '.';

/**
 * Chef is any user on the platform.
 */
@Entity({ name: 'chefs' })
class Chef extends Dated {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne((type) => Account, {
    eager: true,
  })
  @JoinColumn()
  account: Account;
}

export default Chef;
