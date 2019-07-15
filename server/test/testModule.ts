import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';

import Chef from '../src/modules/postgres/entities/chef.entity';
import Recipe from '../src/modules/postgres/entities/recipe.entity';
import Label from '../src/modules/postgres/entities/label.entity';

const getTestModule = async ({
  imports = [],
  providers = [],
  controllers = [],
}) => {
  return await Test.createTestingModule({
    imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'chef',
        password: 'i am chef',
        database: 'integration_test',
        entities: [Chef, Recipe, Label],
        synchronize: true,
        uuidExtension: 'pgcrypto',
      }),
      TypeOrmModule.forFeature([Chef, Recipe, Label]),
      ...imports,
    ],
    providers,
    controllers,
  }).compile();
};

export default getTestModule;
