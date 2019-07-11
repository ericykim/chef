import ChefService from './chef.service';
import { Repository } from 'typeorm';
import Chef from '../../postgres/entities/chef.entity';
import { Login, Registration } from '../interfaces';
import { hash } from '../../../utils';
import { createChef } from '../../../../test/factories/chef.factory';
import * as faker from 'faker';
import { v4 } from 'uuid';

describe('ChefService', () => {
  let chefService: ChefService;
  let chefRepository: Repository<Chef>;

  beforeEach(() => {
    chefRepository = new Repository<Chef>();
    chefService = new ChefService(chefRepository);
  });

  describe('register', () => {
    let chef: Chef;
    let findOneMock;
    let saveMock;
    let registration: Registration;

    beforeEach(() => {
      chef = createChef();

      registration = {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      saveMock = jest.fn().mockImplementation((saved) => saved);

      findOneMock = async ({ where }) => {
        const match = where.find((options) => {
          return options.username === chef.username ||
            options.email === chef.email
            ? chef
            : null;
        });

        return match ? chef : null;
      };

      jest.spyOn(chefRepository, 'findOne').mockImplementation(findOneMock);

      jest
        .spyOn(chefRepository, 'merge')
        .mockImplementation((chef: Chef, obj: Object) => ({
          ...chef,
          ...obj,
        }));

      jest.spyOn(chefRepository, 'save').mockImplementation(saveMock);
    });

    test('true and registered if there are no duplicate chefs', async () => {
      const registered = await chefService.register(registration);
      const registeredChef = {
        ...new Chef(),
        ...registration,
        password: hash(registration.password),
      };

      expect(saveMock).toHaveBeenCalledWith(registeredChef);
      expect(registered).toEqual(registeredChef);
    });

    test('false and not registered if username exists', async () => {
      const invalidRegistration: Registration = {
        ...registration,
        username: chef.username,
      };
      const registered = await chefService.register(invalidRegistration);

      expect(registered).toBe(null);
    });

    test('false and not registered if email exists', async () => {
      const invalidRegistration: Registration = {
        ...registration,
        email: chef.email,
      };
      const registered = await chefService.register(invalidRegistration);

      expect(registered).toBe(null);
    });
  });

  describe('authenticate', () => {
    let mockFindOne;
    let handle, password, hashedPassword;
    let login: Login;
    let chef: Chef;

    beforeEach(() => {
      handle = v4();
      password = v4();
      hashedPassword = hash(password);

      login = {
        handle,
        password,
      };

      chef = createChef({
        email: handle,
        password: hashedPassword,
      });

      mockFindOne = async ({ where }) => {
        const match = where.find((options) => {
          if (
            options.username === handle &&
            options.password === hashedPassword
          ) {
            return true;
          } else if (
            options.email === handle &&
            options.password === hashedPassword
          ) {
            return true;
          }

          return false;
        });

        return match ? chef : null;
      };
    });

    test('true when email and password match', async () => {
      jest.spyOn(chefRepository, 'findOne').mockImplementation(mockFindOne);
      expect(await chefService.authenticate(login)).toEqual(chef);
    });

    test('true when username and password match', async () => {
      jest.spyOn(chefRepository, 'findOne').mockImplementation(mockFindOne);
      expect(await chefService.authenticate(login)).toEqual(chef);
    });

    test('false when username/email do not match', async () => {
      jest.spyOn(chefRepository, 'findOne').mockImplementation(mockFindOne);
      expect(await chefService.authenticate({ ...login, handle: v4() })).toBe(
        null,
      );
    });

    test('false when password do not match', async () => {
      jest.spyOn(chefRepository, 'findOne').mockImplementation(mockFindOne);
      expect(await chefService.authenticate({ ...login, password: v4() })).toBe(
        null,
      );
    });

    test('false when username/email and password do not match', async () => {
      jest.spyOn(chefRepository, 'findOne').mockImplementation(mockFindOne);
      expect(
        await chefService.authenticate({ handle: v4(), password: v4() }),
      ).toBe(null);
    });
  });
});
