import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import PostgresModule from './postgres/postgres.module';
import Recipe from './postgres/entities/recipe.entity';

@Module({
  imports: [PostgresModule.forRoot([Recipe])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
