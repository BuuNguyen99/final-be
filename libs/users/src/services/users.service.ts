import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  async findOne(email: string): Promise<User | undefined> {
    return this.userRepo.findOne({ email });
  }

  async saveOrUpdateRefreshToken(
    refreshToken: string,
    id: string,
    refreshTokenExpires,
  ) {
    await this.userRepo.update(id, {
      refreshToken: refreshToken,
      refreshTokenExpires,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async create(user: User): Promise<User> {
    return await this.userRepo.save(user);
  }
}
