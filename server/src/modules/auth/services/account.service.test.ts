import AccountService from './account.service';
import { Repository } from 'typeorm';
import Account from '../../postgres/entities/account.entity';
import Chef from '../../postgres/entities/chef.entity';
import { Login, Registration } from '../interfaces';
import { hash } from '../../../utils';
import { createAccount } from '../../../../test/factories/account.factory';
import * as faker from 'faker';
import { v4 } from 'uuid';

describe('AccountService', () => {
  let accountService: AccountService;
  let accountRepository: Repository<Account>;

  beforeEach(() => {
    accountRepository = new Repository<Account>();
    accountService = new AccountService(accountRepository);
  });

  describe('register', () => {
    let account: Account;
    let findOneMock;
    let saveMock;
    let registration: Registration;

    beforeEach(() => {
      account = createAccount();

      registration = {
        username: faker.internet.userName(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      };

      saveMock = jest.fn();

      findOneMock = async ({ where }) => {
        const match = where.find((options) => {
          return options.username === account.username ||
            options.email === account.email
            ? account
            : null;
        });

        return match ? account : null;
      };

      jest.spyOn(accountRepository, 'findOne').mockImplementation(findOneMock);

      jest
        .spyOn(accountRepository, 'merge')
        .mockImplementation((account: Account, obj: Object) => ({
          ...account,
          ...obj,
        }));

      jest.spyOn(accountRepository, 'save').mockImplementation(saveMock);
    });

    test('true and registered if there are no duplicate accounts', async () => {
      const registered = await accountService.register(registration);

      expect(saveMock).toHaveBeenCalledWith({
        ...new Account(),
        ...registration,
        chef: new Chef(),
        password: hash(registration.password),
      });

      expect(registered).toBe(true);
    });

    test('false and not registered if username exists', async () => {
      const invalidRegistration: Registration = {
        ...registration,
        username: account.username,
      };
      const registered = await accountService.register(invalidRegistration);

      expect(registered).toBe(false);
    });

    test('false and not registered if email exists', async () => {
      const invalidRegistration: Registration = {
        ...registration,
        email: account.email,
      };
      const registered = await accountService.register(invalidRegistration);

      expect(registered).toBe(false);
    });
  });

  describe('authenticate', () => {
    let mockFindOne;
    let handle, password, hashedPassword;
    let login: Login;
    let account: Account;

    beforeEach(() => {
      handle = v4();
      password = v4();
      hashedPassword = hash(password);

      login = {
        handle,
        password,
      };

      account = createAccount({
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

        return match ? account : null;
      };
    });

    test('true when email and password match', async () => {
      jest.spyOn(accountRepository, 'findOne').mockImplementation(mockFindOne);
      expect(await accountService.authenticate(login)).toBe(true);
    });

    test('true when username and password match', async () => {
      jest.spyOn(accountRepository, 'findOne').mockImplementation(mockFindOne);
      expect(await accountService.authenticate(login)).toBe(true);
    });

    test('false when username/email do not match', async () => {
      jest.spyOn(accountRepository, 'findOne').mockImplementation(mockFindOne);
      expect(
        await accountService.authenticate({ ...login, handle: v4() }),
      ).toBe(false);
    });

    test('false when password do not match', async () => {
      jest.spyOn(accountRepository, 'findOne').mockImplementation(mockFindOne);
      expect(
        await accountService.authenticate({ ...login, password: v4() }),
      ).toBe(false);
    });

    test('false when username/email and password do not match', async () => {
      jest.spyOn(accountRepository, 'findOne').mockImplementation(mockFindOne);
      expect(
        await accountService.authenticate({ handle: v4(), password: v4() }),
      ).toBe(false);
    });
  });
});
