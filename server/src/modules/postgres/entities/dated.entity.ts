import { UpdateDateColumn, CreateDateColumn } from 'typeorm';

class Dated {
  @UpdateDateColumn({ select: false })
  updatedOn: Date;

  @CreateDateColumn({ select: false })
  createdOn: Date;
}

export default Dated;
