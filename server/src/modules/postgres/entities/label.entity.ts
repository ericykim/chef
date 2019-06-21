import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToMany,
} from 'typeorm';

import Recipe from './recipe.entity';
import { Dated } from '.';

export enum Type {
  Diet = 'diet',
  Restriction = 'restriction',
  Cuisine = 'cuisine',
  Flavor = 'flavor',
  Meal = 'meal',
  Technique = 'technique',
  DishType = 'dishType',
  Course = 'course',
  Popularity = 'popularity',
  Other = 'other',
}

/**
 * Label is a category label for recipes. Examples are 'vegetarian',
 * 'gluten-free', and 'spicy'.
 */
@Entity({ name: 'labels' })
class Label extends Dated {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  /**
   * Label has a categorical type.
   * Refer to the enum Type for reference.
   */
  @Column({ type: 'enum', array: true, enum: Type, default: `{${Type.Other}}` })
  type: Type[];

  @ManyToMany((type) => Recipe, { cascade: true })
  recipes: Recipe[];
}

export default Label;
