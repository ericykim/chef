import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import AuthService from '../services/auth.service';
import ChefService from '../services/chef.service';
import { Registration, Login } from '../interfaces';
import { Response } from 'express';

@Controller('auth')
class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly chefService: ChefService,
  ) {}

  @Post('login')
  async login(@Res() res: Response, @Body() login: Login) {
    const chef = await this.chefService.authenticate(login);

    if (chef) {
      const token = await this.authService.tokenize(login);
      res.status(HttpStatus.OK).send(chef);
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }

  @Post('register')
  async register(@Res() res: Response, @Body() registration: Registration) {
    const chef = await this.chefService.register(registration);

    if (chef) {
      res.status(HttpStatus.CREATED).send(chef);
    } else {
      res.status(HttpStatus.CONFLICT).send();
    }
  }
}

export default AuthController;
