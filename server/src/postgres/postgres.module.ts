import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import Recipe from './entities/recipe.entity';
import { createDatabaseProviders } from './postgres.providers';

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
    TypeOrmModule.forFeature([Recipe]),
  ],
})
class PostgresModule {
  static forRoot(entities: Array<Function>): DynamicModule {
    const providers = createDatabaseProviders(entities);

    return {
      module: PostgresModule,
      providers,
      exports: providers,
    };
  }
}

export default PostgresModule;
