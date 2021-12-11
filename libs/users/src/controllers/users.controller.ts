import { AuthService } from '@app/auth';
import {
  Body,
  Controller,
  forwardRef,
  Get,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entity/user.entity';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login({ ...req.user });
  }

  @Get()
  index(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('create')
  async create(@Body() contactData: User): Promise<any> {
    return this.usersService.create(contactData);
  }
}
