import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Recipe from './entities/recipe.entity';
import Label from './entities/label.entity';
import Chef from './entities/chef.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'chef',
      password: 'i am chef',
      database: 'chef',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      uuidExtension: 'pgcrypto',
    }),
  ],
  exports: [TypeOrmModule],
})
class PostgresModule {}

export default PostgresModule;
