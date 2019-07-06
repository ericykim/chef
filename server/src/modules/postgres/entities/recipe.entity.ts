import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import Label from './label.entity';
import Dated from './dated.entity';
import Chef from './chef.entity';

/**
 * Recipe is any recipe that has been initialized,
 * is currently in review by its author, or is published.
 */
@Entity({ name: 'recipes' })
class Recipe extends Dated {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // The primary author of this recipe.
  @ManyToOne((type) => Chef, (chef) => chef.recipes, {
    nullable: false,
  })
  chef: Chef;

  // Collaborators of this recipe.
  @ManyToMany((type) => Chef, (chef) => chef.contributorOf, {
    primary: true,
  })
  @JoinTable()
  sousChefs: Chef[];

  @Column({ length: 100 })
  title: string;

  @Column({ length: 500, nullable: true })
  subtitle: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('int', { nullable: true })
  preparationTime;

  @Column('int', { nullable: true })
  cookTime;

  @Column('text', { array: true, default: {} })
  ingredients: string[];

  @Column('text', { array: true, default: {} })
  directions: string[];

  // Category labels for this recipe.
  @ManyToMany((type) => Label, (label) => label.recipes, {
    eager: true,
    cascade: true,
    primary: true,
  })
  @JoinTable()
  labels: Label[];

  @Column({ type: 'text', array: true, nullable: false, default: {} })
  pictures: string[];

  // Is the recipe published to the entire platform?
  @Column('boolean', { default: false, nullable: false })
  published: boolean;

  // How many people across app have viewed this recipe?
  @Column('int', { default: 0, nullable: false })
  views: number;

  // Forked parent recipe
  @ManyToOne((type) => Recipe, (recipe) => recipe.children, {
    cascade: true,
    nullable: true,
  })
  base: Recipe;

  @OneToMany((type) => Recipe, (recipe) => recipe.base, {
    nullable: false,
  })
  children: Recipe[];
}

export default Recipe;
