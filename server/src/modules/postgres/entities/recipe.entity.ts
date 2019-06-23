import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import Label from './label.entity';
import { Dated } from '.';
import Chef from './chef.entity';

/**
 * Recipe is any recipe that has been initialized,
 * is currently in review by its author, or is published.
 */
@Entity({ name: 'recipes' })
class Recipe extends Dated {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The primary author of this recipe.
   */
  @ManyToOne((type) => Chef, (chef) => chef.recipes, {
    eager: true,
    nullable: false,
  })
  author: Chef;

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

  @Column('int', { nullable: true })
  readyTime;

  @Column('text', { array: true, default: {} })
  ingredients: string[];

  @Column('text', { array: true, default: {} })
  directions: string[];

  // Category labels for this recipe.
  @ManyToMany(
    (type) => Label,
    (label) => {
      label.name, label.type;
    },
    { eager: true, cascade: true, primary: true },
  )
  @JoinTable()
  labels: Label[];

  // Is the recipe published to the entire platform?
  @Column('boolean', { default: false })
  published: boolean;
}

export default Recipe;
