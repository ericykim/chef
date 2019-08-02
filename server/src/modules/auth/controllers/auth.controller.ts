import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import AuthService from '../services/auth.service';
import ChefService from '../services/chef.service';
import { Registration, Login } from '../interfaces';
import { isType, not } from '../../../utils';

@Controller('auth')
class AuthController {
  constructor(private readonly chefService: ChefService) {}

  /**
   * Login by authenticating the "handle" and password, where
   * handle can be either the username or email address.
   *
   * @param res
   * @param login
   * @returns 400, 401, 200
   */
  @Post('login')
  async login(@Res() res: Response, @Body() login: Login) {
    if (not(isType(login, Login))) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }

    const chef = await this.chefService.authenticate(login);

    if (chef) {
      res.status(HttpStatus.OK).send(chef);
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }

  /**
   * Register given user credentials.
   *
   * @param res
   * @param login
   * @returns 400, 409, 201
   */
  @Post('register')
  async register(@Res() res: Response, @Body() registration: Registration) {
    if (not(isType(registration, Registration))) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }

    const chef = await this.chefService.register(registration);

    if (chef) {
      res.status(HttpStatus.CREATED).send(chef);
    } else {
      res.status(HttpStatus.CONFLICT).send();
    }
  }
}

export default AuthController;
