import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB } = process.env;

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: DB_HOST,
      port: 5432,
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      uuidExtension: 'pgcrypto',
    }),
  ],
  exports: [TypeOrmModule],
})
class PostgresModule {}

export default PostgresModule;
