import { createConnection } from 'typeorm';

import Chef from '../../src/modules/postgres/entities/chef.entity';
import Recipe from '../../src/modules/postgres/entities/recipe.entity';
import Label from '../../src/modules/postgres/entities/label.entity';

const getConnection = async () => {
  return await createConnection({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'chef',
    password: 'i am chef',
    database: 'integration_test',
    entities: [Chef, Recipe, Label],
    synchronize: true,
    uuidExtension: 'pgcrypto',
  });
};

/**
 * FactoryManager manages all entity factories by creating
 * the payloads in the integration_test database, and cleaning
 * all of the tables after each test.
 */
class FactoryManager {
  entities;
  connection;
  initialized;

  constructor() {
    this.entities = [Recipe, Chef, Label];
    this.connection = getConnection();
    this.initialized = false;
  }

  /**
   * Client of the manager needs to wait
   * for connection to database to be resolved
   * before creating payloads.
   */
  async waitForConnection() {
    if (this.initialized) {
      return;
    }

    this.connection = await this.connection;
    this.initialized = true;
  }

  /**
   * Create an entity record in the database.
   *
   * @param entity
   * @param payload
   */
  async createOne(entity, payload) {
    await this.waitForConnection();

    const created = await this.connection.getRepository(entity).save(payload);
    return created;
  }

  /**
   * Clean up all tables in the database.
   */
  async cleanUp() {
    await this.waitForConnection();

    const promises = this.entities.map(
      async (entity) =>
        await this.connection.query(
          `TRUNCATE ${this.getTableName(entity)} CASCADE`,
        ),
    );

    await Promise.all(promises);
  }

  private getTableName(entity): string {
    return this.connection.getMetadata(entity).givenTableName;
  }
}

const instance = new FactoryManager();
export default instance;
