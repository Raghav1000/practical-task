import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { generateUniqueUsername } from 'src/utils/helper';
import { User } from '../users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwt: JwtService,
  ) {}

  async register(name: string, email: string, password: string) {
    const existing = await this.usersService.findByEmail(email);
    if (existing) {
      throw new BadRequestException('Email already in use');
    }

    const user = await this.usersService.create({
      name,
      email,
      password,
      username: generateUniqueUsername(name),
    });

    const token = await this.jwt.signAsync({
      id: user.id,
      email: user.email,
    });

    const userWithoutPass: Partial<User> = {
      ...user,
    };

    delete userWithoutPass.hashPassword;

    return {
      message: 'User registered successfully',
      token,
      user: userWithoutPass,
    };
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const match = await bcrypt.compare(password, user.hashPassword);
    if (!match) throw new UnauthorizedException('Invalid credentials');

    const token = await this.jwt.signAsync({
      id: user.id,
      email: user.email,
    });

    return {
      message: 'Login successful',
      token,
      user,
    };
  }
}
