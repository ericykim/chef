import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * Recipe contains the name, description, and content of a recipe.
 */
@Entity()
class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  description: string;

  @Column('uuid', { array: true })
  labels: string[];

  @UpdateDateColumn()
  updatedOn: Date;

  @CreateDateColumn()
  createdOn: Date;
}

export default Recipe;
