import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  BeforeInsert,
  BeforeUpdate,
  PrimaryColumn,
} from 'typeorm';

import Chef from './chef.entity';
import { Dated } from '.';

@Entity({ name: 'accounts' })
class Account extends Dated {
  @PrimaryColumn({ type: 'text' })
  username: string;

  @Column('text', { nullable: false })
  firstName: string;

  @Column('text', { nullable: false })
  lastName: string;

  @Column('text', { nullable: false })
  email: string;

  @Column('text', { select: false })
  password: string;

  @OneToOne((type) => Chef, (chef) => chef.account, { cascade: true })
  chef: Chef;
}

export default Account;
