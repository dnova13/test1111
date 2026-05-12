import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { JwtPayload } from './strategies/jwt.strategy';

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    if (!user || !user.isActive) {
      return null;
    }

    const isValid = await user.validatePassword(password);
    if (!isValid) {
      return null;
    }

    return user;
  }

  async login(user: User): Promise<TokenPair> {
    return this.generateTokens(user);
  }

  async refresh(userId: number): Promise<TokenPair> {
    const user = await this.usersService.findOne(userId);
    if (!user || !user.isActive) {
      throw new UnauthorizedException('User not found or inactive');
    }
    return this.generateTokens(user);
  }

  async getMe(userId: number): Promise<User> {
    return this.usersService.findOne(userId);
  }

  private generateTokens(user: User): TokenPair {
    const basePayload = {
      sub: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    };

    const accessPayload: JwtPayload = { ...basePayload, type: 'access' };
    const refreshPayload: JwtPayload = { ...basePayload, type: 'refresh' };

    const accessToken = this.jwtService.sign(accessPayload, {
      secret: this.configService.get<string>('jwt.accessSecret'),
      expiresIn: this.configService.get<string>('jwt.accessExpiration'),
    });

    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: this.configService.get<string>('jwt.refreshExpiration'),
    });

    return { accessToken, refreshToken };
  }
}
