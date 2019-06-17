import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  UpdateDateColumn,
  CreateDateColumn,
} from 'typeorm';

/**
 * Chef is any user on the platform.
 */
@Entity({ name: 'chefs' })
class Chef {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { nullable: false })
  firstName: string;

  @Column('text', { nullable: false })
  lastName: string;

  @Column('text', { nullable: false })
  email: string;

  @UpdateDateColumn()
  updatedOn: Date;

  @CreateDateColumn()
  createdOn: Date;
}

export default Chef;
