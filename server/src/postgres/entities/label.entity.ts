import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * Label contains the name of a label, such as 'vegetarian', 'gluten-free', or 'spicy'.
 */
@Entity()
class Label {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50 })
  name: string;

  @UpdateDateColumn()
  updatedOn: Date;

  @CreateDateColumn()
  createdOn: Date;
}

export default Label;
