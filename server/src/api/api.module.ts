import { Module } from '@nestjs/common';
import PostgresModule from '../postgres/postgres.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import RecipeController from './controllers/recipe.controller';
import LabelController from './controllers/label.controller';
import ChefController from './controllers/chef.controller';

import RecipeService from './services/recipe.service';
import LabelService from './services/label.service';
import ChefService from './services/chef.service';

import Recipe from '../postgres/entities/recipe.entity';
import Label from '../postgres/entities/label.entity';
import Chef from '../postgres/entities/chef.entity';

@Module({
  imports: [PostgresModule, TypeOrmModule.forFeature([Recipe, Label, Chef])],
  controllers: [RecipeController, LabelController, ChefController],
  providers: [RecipeService, LabelService, ChefService],
})
class ApiModule {}

export default ApiModule;
