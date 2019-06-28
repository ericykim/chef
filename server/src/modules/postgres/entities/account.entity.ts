import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Column,
  PrimaryColumn,
} from 'typeorm';

import Dated from './dated.entity';

class Account extends Dated {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  username: string;

  @Column('text', { nullable: false })
  firstName: string;

  @Column('text', { nullable: false })
  lastName: string;

  @Column('text', { nullable: false })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  profilePicture: string;
}

export default Account;
