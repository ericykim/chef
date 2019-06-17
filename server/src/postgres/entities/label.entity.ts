import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

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
class Label {
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

  @UpdateDateColumn()
  updatedOn: Date;

  @CreateDateColumn()
  createdOn: Date;
}

export default Label;
