import { Module } from '@nestjs/common';
import PostgresModule from './postgres/postgres.module';
import Recipe from './postgres/entities/recipe.entity';
import RecipeController from './controllers/recipe.controller';
import Label from './postgres/entities/label.entity';

@Module({
  imports: [PostgresModule.forRoot([Recipe, Label])],
  controllers: [RecipeController],
})
export class AppModule {}
