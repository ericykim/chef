import { Module } from '@nestjs/common';
import AuthService from './services/auth.service';
import PostgresModule from '../postgres/postgres.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import Account from '../postgres/entities/account.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import JwtStrategy from './strategies/jwt.strategy';
import AuthController from './controllers/auth.controller';
import AccountService from './services/account.service';

@Module({
  imports: [
    PostgresModule,
    TypeOrmModule.forFeature([Account]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secretOrPrivateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AccountService, JwtStrategy],
  exports: [PassportModule, AuthService],
})
class AuthModule {}

export default AuthModule;
