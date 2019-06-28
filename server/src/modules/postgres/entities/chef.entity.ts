import { Entity, OneToMany, Column, ManyToMany } from 'typeorm';

import Account from './account.entity';
import Recipe from './recipe.entity';

/**
 * Chef is any user on the platform.
 */
@Entity({ name: 'chefs' })
class Chef extends Account {
  @Column('text', { nullable: true })
  bio: string;

  @OneToMany((type) => Recipe, (recipe) => recipe.chef, {
    cascade: true,
  })
  recipes: Recipe[];

  @ManyToMany((type) => Recipe, (recipe) => recipe.sousChefs, {
    cascade: true,
  })
  contributorOf: Recipe[];
}

export default Chef;
