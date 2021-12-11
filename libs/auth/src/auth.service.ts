import { UsersService } from '@app/users/services/users.service';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import randToken from 'rand-token';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: any) {
    const payload = user;
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: await this.generateRefreshToken(user.userId),
    };
  }

  async generateRefreshToken(userId): Promise<string> {
    const refreshToken = randToken.generate(16);
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 6);
    await this.usersService.saveOrUpdateRefreshToken(
      refreshToken,
      userId,
      expiryDate,
    );
    return refreshToken;
  }
}
