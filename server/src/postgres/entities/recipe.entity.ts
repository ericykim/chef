import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * Recipe is any recipe that has been initialized,
 * is currently in review by its author, or is published.
 */
@Entity({ name: 'recipes' })
class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * The primary author of this recipe.
   */
  @Column('uuid', { nullable: false })
  author: string;

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

  /**
   * Category labels for this recipe.
   */
  @Column('uuid', { array: true, default: {} })
  labels: string[];

  /**
   * Is the recipe live and public?
   */
  @Column('boolean', { default: false })
  published: boolean;

  @UpdateDateColumn()
  updatedOn: Date;

  @CreateDateColumn()
  createdOn: Date;
}

export default Recipe;
