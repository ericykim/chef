import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppService } from './app.service';
import PostgresModule from './postgres/postgres.module';
import Recipe from './postgres/recipe.entity';

@Module({
  imports: [PostgresModule.forRoot([Recipe])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
