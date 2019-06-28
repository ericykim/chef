import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import ChefService from './chef.service';
import { JwtPayload, Login } from '../interfaces';

@Injectable()
class AuthService {
  constructor(
    private readonly chefService: ChefService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Sign user with credentials in.
   * @param email
   * @param password
   * @returns Jwt key
   */
  async tokenize({ handle }: Login): Promise<string> {
    return this.jwtService.sign({ handle });
  }
}

export default AuthService;
