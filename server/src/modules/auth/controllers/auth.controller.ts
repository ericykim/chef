import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';

import AuthService from '../services/auth.service';
import ChefService from '../services/chef.service';
import { Registration, Login } from '../interfaces';
import { validate } from '../../../utils';

@Controller('auth')
class AuthController {
  constructor(private readonly chefService: ChefService) {}

  @Post('login')
  async login(@Res() res: Response, @Body() login: Login) {
    if (!validate(login, Login)) {
      return res.status(HttpStatus.BAD_REQUEST).send();
    }

    const chef = await this.chefService.authenticate(login);

    if (chef) {
      res.status(HttpStatus.OK).send(chef);
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }

  @Post('register')
  async register(@Res() res: Response, @Body() registration: Registration) {
    if (!validate(registration, Registration)) {
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
