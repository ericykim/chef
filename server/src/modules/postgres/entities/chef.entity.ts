import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';

import { Dated } from '.';
import Account from './account.entity';
import Recipe from './recipe.entity';

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

  @OneToMany((type) => Recipe, (recipe) => recipe.author, {
    cascade: true,
  })
  recipes: Recipe[];
}

export default Chef;
