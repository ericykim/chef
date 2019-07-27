import ChefService from './chef.service';
import { TestingModule } from '@nestjs/testing';
import getTestModule from '../../../../test/testModule';

import { createRegistration } from '../../../../test/factories/registration.factory';
import { createLogin } from '../../../../test/factories/login.factory';
import { saveChef } from '../../../../test/factories/chef.factory';
import { hash } from '../../../utils';

describe('ChefService', () => {
  let testModule: TestingModule;
  let chefService: ChefService;

  beforeEach(async () => {
    testModule = await getTestModule({
      providers: [ChefService],
    });

    chefService = testModule.get<ChefService>(ChefService);
  });

  afterEach(async () => await testModule.close());

  describe('register', () => {
    it('registers and returns given chef', async () => {
      const registration = await createRegistration();
      const chef = await chefService.register(registration);

      expect(
        await chefService.findOne({
          where: { username: registration.username },
        }),
      ).not.toBeNull();
      expect(chef.username).toBe(registration.username);
    });

    it('returns null if duplicate chef with same username exists', async () => {
      const chef = await saveChef();
      const registration = await createRegistration();
      const registeredChef = await chefService.register({
        ...registration,
        username: chef.username,
      });

      expect(registeredChef).toBeNull();
    });

    it('returns null if duplicate chef with same email exists', async () => {
      const chef = await saveChef();
      const registration = await createRegistration();
      const registeredChef = await chefService.register({
        ...registration,
        email: chef.email,
      });

      expect(registeredChef).toBeNull();
    });
  });

  describe('authenticate', () => {
    it('returns authenticated chef', async () => {
      const chef = await saveChef();
      const login = await createLogin({
        handle: chef.username,
        password: chef.password,
      });
      const authenticatedChef = await chefService.authenticate(login);

      expect(authenticatedChef).not.toBeNull();
      expect(authenticatedChef.username).toBe(chef.username);
    });

    it('returns null if chef does not exist', async () => {
      const login = await createLogin();
      const chef = await chefService.authenticate(login);

      expect(chef).toBeNull();
    });

    it('returns null if invalid password', async () => {
      const chef = await saveChef();
      const login = await createLogin({ handle: chef.username });
      const authenticatedChef = await chefService.authenticate(login);

      expect(authenticatedChef).toBeNull();
    });
  });
});
