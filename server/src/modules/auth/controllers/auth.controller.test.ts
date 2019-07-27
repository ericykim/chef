import AuthController from './auth.controller';
import { TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import getTestModule from '../../../../test/testModule';
import ChefService from '../services/chef.service';

import { saveChef, createChef } from '../../../../test/factories/chef.factory';

describe('AuthController', () => {
  let testModule: TestingModule;
  let server;

  beforeEach(async () => {
    testModule = await getTestModule({
      providers: [ChefService],
      controllers: [AuthController],
    });

    const app = testModule.createNestApplication();
    await app.init();
    server = app.getHttpServer();
  });

  afterEach(async () => await testModule.close());

  describe('POST auth/login', () => {
    test('returns 200 if correct username and password', async () => {
      const chef = await saveChef();

      return request(server)
        .post('/auth/login')
        .send({ handle: chef.username, password: chef.password })
        .expect(200)
        .expect((res) => {
          res.body.id = chef.id;
        });
    });

    test('returns 200 if correct email and password', async () => {
      const chef = await saveChef();

      return request(server)
        .post('/auth/login')
        .send({ handle: chef.email, password: chef.password })
        .expect(200)
        .expect((res) => {
          res.body.id = chef.id;
        });
    });

    test('returns 401 if not authenticated', async () => {
      return request(server)
        .post('/auth/login')
        .send({ handle: 'username', password: '123' })
        .expect(401);
    });

    test('returns 400 if login body is invalid', async () => {
      return request(server)
        .post('/auth/login')
        .send({ email: 'email', password: '123' })
        .expect(400);
    });
  });

  describe('POST /auth/register', () => {
    test('returns 201 if registration body is complete', async () => {
      const chef = await createChef();
      const registration = {
        email: chef.email,
        password: chef.password,
        username: chef.username,
        firstName: chef.firstName,
        lastName: chef.lastName,
      };

      return request(server)
        .post('/auth/register')
        .send(registration)
        .expect(201)
        .expect((res) => {
          res.body.id = chef.id;
        });
    });

    test('returns 201 if registration body is complete', async () => {
      const chef = await saveChef();
      const registration = {
        email: chef.email,
        password: chef.password,
        username: chef.username,
        firstName: chef.firstName,
        lastName: chef.lastName,
      };

      return request(server)
        .post('/auth/register')
        .send(registration)
        .expect(409);
    });

    test('returns 400 if registration body is invalid', async () => {
      const chef = await createChef();
      const registration = {
        email: chef.email,
        lastName: chef.lastName,
      };

      return request(server)
        .post('/auth/register')
        .send(registration)
        .expect(400);
    });
  });
});
