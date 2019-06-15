import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
class Recipe {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 500 })
  name: string;

  @Column('text')
  desription: string;
}

export default Recipe;
