import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

export abstract class Dated {
  @UpdateDateColumn({ select: false })
  updatedOn: Date;

  @CreateDateColumn({ select: false })
  createdOn: Date;
}
