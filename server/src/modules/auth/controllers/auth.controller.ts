import { Controller, Post, Body, Get, Res, HttpStatus } from '@nestjs/common';
import AuthService from '../services/auth.service';
import AccountService from '../services/chef.service';
import { Registration, Login } from '../interfaces';
import { Response } from 'express';

@Controller('auth')
class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @Post('login')
  async login(@Res() res: Response, @Body() login: Login) {
    const authenticated = await this.accountService.authenticate(login);

    if (authenticated) {
      const token = await this.authService.tokenize(login);
      res.status(HttpStatus.OK).send(token);
    } else {
      res.status(HttpStatus.UNAUTHORIZED).send();
    }
  }

  @Post('register')
  async register(@Res() res: Response, @Body() registration: Registration) {
    const registered = await this.accountService.register(registration);
    res.status(registered ? HttpStatus.CREATED : HttpStatus.CONFLICT).send();
  }
}

export default AuthController;
